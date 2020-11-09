import React, {useState} from 'react';
import Link from "next/link";
import cn from 'classnames';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './NavBar.module.css';
import {useRouter} from "next/router";


interface NavItemProps {
    page: string
}

const NavItem: React.FunctionComponent<NavItemProps> = ({children, page}) => {
    const router = useRouter();
    return (
        <li><Link href={page}><a
            className={cn({[styles.navItemActive]: page === router.pathname})}>{children}</a></Link></li>
    );
}

export const NavBar: React.FunctionComponent = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.navBarWrapper}>
            <div onClick={() => setOpen(!open)} className={styles.hamburgerButton}><FontAwesomeIcon icon={faBars}/>
            </div>
            <a href="/" className={styles.navLogoWrapper}>
                <img alt="logo" className={styles.navLogo} src="/assets/images/thiswebsite/JB%20Logo.svg"/>
            </a>
            <nav className={cn(styles.navBar, {[styles.navActive]: open})}>
                <ul>
                    <NavItem page={"/"}>About Me</NavItem>
                    <li><a href="/assets/files/resume.pdf" target="_blank">Professional Resume</a></li>
                    <NavItem page={"/contact"}>Contact</NavItem>
                </ul>
            </nav>
        </div>
    );
}
