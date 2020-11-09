import React from 'react';
import styles from './Spinner.module.css';

export const Spinner: React.FunctionComponent = () => {
    return (
        <div className={styles.spinner}>Loading...</div>
    );
}
