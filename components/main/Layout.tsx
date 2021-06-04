import React from 'react';
import styles from './Layout.module.css';
import NavBar from './NavBar';
import BigLoader from './BigLoader/BigLoader';

const Layout: React.FunctionComponent = ({ children }) => (
    <BigLoader>
        <div className={styles.container}>
            <div className={styles.navWrapper}>
                <NavBar />
            </div>
            <div className={styles.pageWrapper}>{children}</div>
        </div>
    </BigLoader>
);
export default Layout;
