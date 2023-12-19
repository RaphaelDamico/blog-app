import Head from 'next/head';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'; 
import { RichText } from 'prismic-dom';

type Post = {
    slug: string;
    title: string;
    cover: string;
    description: string;
    updatedAt: string
}

interface PostsProps {
    posts: Post[];
    page: string;
    totalPage: string;
}

export default function Posts({ posts: postsBlog, page, totalPage }: PostsProps) {
    
    const [currentPage, setCurrentPage] = useState(Number(page));
    const [posts, setPosts] = useState(postsBlog || []);
    
    return( 
        <>
            <Head>
                <title>Blog | Sujeito Programador</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map( post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>

                            <Image 
                                src={post.cover}
                                alt={post.title} 
                                width={720} 
                                height={410} 
                                quality={100}
                                placeholder= "blur"
                                blurDataURL= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0rQcAAQ8AxteRdbQAAAAASUVORK5CYII=+"
                            />
                            <strong>{post.title}</strong>
                            <time>{post.updatedAt}</time>
                            <p>{post.description}</p>

                        </Link>
                    ))}

                    <div className={styles.buttonNavigate}>
                        <div>
                            <button>
                                <FiChevronsLeft size={25} color="#FFF"/>
                            </button>
                            <button>
                                <FiChevronLeft size={25} color="#FFF"/>
                            </button>
                        </div>
                        
                        <div>
                            <button>
                                <FiChevronRight size={25} color="#FFF"/>
                            </button>
                            <button>
                                <FiChevronsRight size={25} color="#FFF"/>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        
        </>
    );    
         
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
        fetch: ['post.title', 'post.description', 'post.cover'],
        pageSize: 3
    })

    //console.log(JSON.stringify(response, null, 2));

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
            cover: post.data.cover.url,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })
    
    return {
        props: {
            posts,
            page: response.page,
            totalPage: response.total_pages
        },
        revalidate: 60 * 30 //Atualiza a cada 30 minutos.
    }
}