import React from 'react';
import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/main/Layout';

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Home | Josh Brown</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.imageWrapper}>
                        <img
                            className={styles.image}
                            src={'/assets/images/me/profile.png'}
                            alt={'Profile Picture'}
                        />
                    </div>
                    <span className={styles.subText}>
                        Hello. I'm Josh, a student interested in cryptography.
                    </span>
                </div>
            </div>
        </Layout>
    );
}
