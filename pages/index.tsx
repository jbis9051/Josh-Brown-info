import React from "react";
import styles from './index.module.css';
import {Layout} from "../components/main/Layout";
import Head from "next/head";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Home | Josh Brown</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.imageWrapper}>
                        <img className={styles.image} src={"/assets/images/me/profile.png"} alt={"Profile Picture"}/>
                    </div>
                    <span className={styles.subText}>Hello. I'm Josh, a student interested in cybersecurity.</span>
                </div>
            </div>
        </Layout>
    )
}