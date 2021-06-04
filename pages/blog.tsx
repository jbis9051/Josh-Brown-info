import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './blog.module.css';
import Layout from '../components/main/Layout';
import ArticleItem from '../components/main/ArticleItem';

export default function Blog() {
    const [articles, setArticles] = useState<any[]>();
    const [page] = useState(1);

    useEffect(() => {
        fetch(`/api/blog?page=${page}`)
            .then((res) => res.json())
            .then((articleArr) => setArticles(articleArr));
    }, [page]);

    return (
        <Layout>
            <Head>
                <title>Blog | Josh Brown</title>
            </Head>
            <h1 className={styles.header}>Blog</h1>
            {articles ? (
                <div className={styles.articleWrapper}>
                    {articles.map((article) => (
                        <ArticleItem key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <span className={styles.loading}>Loading...</span>
            )}
        </Layout>
    );
}
