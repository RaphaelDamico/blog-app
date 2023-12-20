import { GetServerSideProps } from 'next';
import styles from './post.module.scss';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

interface PostProps {
    post: {
        slug: string;
        title: string;
        description: string;
        cover: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return(
        <div>
            <h1>DETALHE DOS POST</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const { slug } = params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('post', String(slug), {});

    if(!response) {
        return {
            redirect: {
                destination: '/posts',
                permanent: false
            }
        }
    }

    const post = {
        slug: slug,
        tltle: RichText.asText(response.data.title),
        description: RichText.asHtml(response.data.description),
        cover: response.data.cover.url,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };

    return {
        props: {
            post
        }
    }
}