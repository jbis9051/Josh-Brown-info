import React, { useEffect } from 'react';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FunctionComponent = ({ children }) => {
    useEffect(() => {
        // document.querySelector('body')!.style.backgroundColor = "#f1f1f1";
    }, []);

    return <div className={styles.container}>{children}</div>;
};
export default AdminLayout;
