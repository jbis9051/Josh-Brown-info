import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './[message].module.css';
import AdminLayout from '../../../components/admin/AdminLayout';
import useAuth from '../../../hooks/useAuth';
import Message from '../../../server/models/Message';

export default function message() {
    const auth = useAuth();
    const router = useRouter();
    const [item, setItem] = useState<Message | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!auth) {
            return;
        }
        auth.fetch(
            `/api/admin/contact_message?id=${router.query.message}`
        ).then(async (resp) => {
            if (!resp.ok) {
                setFailed(true);
                return;
            }
            const json = await resp.json();
            setItem(json.contactMessage);
        });
    }, [auth]);

    return (
        <AdminLayout>
            {auth && (
                <div className={styles.container}>
                    {item && (
                        <div className={styles.itemWrapper}>
                            <span className={styles.from}>
                                <span className={styles.fromLabel}>From: </span>
                                <a
                                    href={`mailto:${item.email}`}
                                    className={styles.fromContent}
                                >{`${item.name} <${item.email}>`}</a>
                            </span>
                            <p className={styles.message}>{item.message}</p>
                        </div>
                    )}
                    {failed && <span>Error Occurred While Fetching Item</span>}
                    <Link href={'/admin/contact'}>
                        <a className={styles.backButton}>Back</a>
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}
