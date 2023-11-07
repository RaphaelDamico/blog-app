import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';
import Link from 'next/link';

export function Header() {
    return (
        <header className={styles.headerContainer}>
           <div className={styles.headerContent}>
                <a>
                    <Image src={logo} alt="Sujeito Programador Logo"/>
                </a>

                <nav>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/posts">
                        Conteúdos
                    </Link>
                    <Link href="/sobre">
                        Quem somos?
                    </Link>
                </nav>

                <a className={styles.readyButton} type="button" href="https://sujeitoprogramador.com">COMEÇAR</a>
           </div>
        </header>
    );
}