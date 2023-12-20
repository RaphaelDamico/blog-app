import { GetServerSideProps } from 'next';
import styles from './post.module.scss';

export default function Post() {
    return(
        <div>
            <h1>DETALHE DOS POST</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    
    return {
        props: {
            
        }
    }
}