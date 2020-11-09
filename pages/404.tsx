import React from "react";
import styles from './404.module.css';

export default function page404() {
    return (
        <div className={styles.container}>
            <img alt="logo" className={styles.navLogo} src="/assets/images/thiswebsite/JB%20Logo.svg"/>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.errorDescription}>Ooops doopsy! There's no page here.</h2>
            <a href="/">
                <button className={styles.button}>Go Home</button>
            </a>
        </div>
    )
}
