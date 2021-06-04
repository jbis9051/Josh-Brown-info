import React from 'react';
import styles from './ArticleItem.module.css';

interface ArticleItemProps {
    article: any;
}

const ArticleItem: React.FunctionComponent<ArticleItemProps> = ({
    article,
}) => (
    <a
        href={article.url}
        rel={'noopener noreferrer nofollow'}
        target={'_blank'}
        className={styles.articleWrapper}
    >
        <div className={styles.metaWrapper}>
            <a
                className={styles.userImageWrapper}
                href={`https://dev.to/${article.user.username}`}
                rel={'noopener noreferrer nofollow'}
                target={'_blank'}
            >
                <img
                    className={styles.userImage}
                    src={article.user.profile_image}
                    alt={'Josh Brown'}
                />
            </a>
            <div className={styles.metaContent}>
                <a
                    className={styles.userName}
                    href={`https://dev.to/${article.user.username}`}
                    rel={'noopener noreferrer nofollow'}
                    target={'_blank'}
                >
                    {article.user.name}
                </a>
                <span className={styles.articleDate}>
                    {new Date(article.published_at).toLocaleString()}
                </span>
            </div>
        </div>
        <div className={styles.articleContent}>
            <h2 className={styles.articleTitle}>{article.title}</h2>
            <span className={styles.articleDescription}>
                {article.description}
            </span>
        </div>
    </a>
);
export default ArticleItem;
