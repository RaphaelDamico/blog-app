import { GetStaticProps } from 'next';
import Head from 'next/head';
import Styles from './styles.module.scss';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Content = {
    title: string;
    description: string;
    banner: string;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
}

interface ContentProps {
    content: Content
}

export default function Sobre({ content }: ContentProps) {
    return(
        <div>
            <h1>Sujeito Programador</h1>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'about')
    ]);

    const {
        title,
        description,
        banner,
        facebook,
        instagram,
        youtube,
        linkedin
    } = response.results[0].data;

    const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        banner: banner.url,
        facebook: facebook.url,
        instagram: instagram.url,
        youtube: youtube.url,
        linkedin: linkedin.url
    };


    return {
        props: {

        }
    }
}