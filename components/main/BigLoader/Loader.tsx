import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
    onDone: () => void;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ onDone }) => (
    <div onAnimationEnd={onDone} className={styles.textWrapper}>
        <div onAnimationEnd={(e) => e.stopPropagation()}>
            <span className={styles.text}>Josh Brown</span>
            <span className={styles.bar} />
        </div>
    </div>
);
export default Loader;
