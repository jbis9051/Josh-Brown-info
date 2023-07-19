import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDev,
    faGithub,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Social.module.css';

const Social: React.FunctionComponent = () => (
    <div className={styles.socialWrapper}>
        <a
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={styles.social}
            href={'https://github.com/jbis9051'}
        >
            <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={styles.social}
            href={'https://twitter.com/jbis9051'}
        >
            <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
            target={'_blank'}
            rel={'noopener noreferrer'}
            className={styles.social}
            href={'https://www.linkedin.com/in/josh-b-89305916b/'}
        >
            <FontAwesomeIcon icon={faLinkedin} />
        </a>
    </div>
);
export default Social;
