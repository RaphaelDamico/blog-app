import { ReactElement, cloneElement } from "react";
import { useRouter} from 'next/router';
import Link, { LinkProps } from "next/link"

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
    const { asPath } = useRouter(); // Se ele estiver na página de conteúdos ele vai pegar que ele está no /posts
    const className = asPath === rest.href ? activeClassName  : ''; //Se a rota/pagina for igual ao link que o usuário clicou, então ativamos o className

    return(
        <Link {...rest}>
            {cloneElement(children, {
                className
            })}
        </Link>
    )
}