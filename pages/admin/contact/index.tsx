import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import styles from './index.module.css';
import AdminLayout from '../../../components/admin/AdminLayout';
import Message from '../../../server/models/Message';

const ContactMessageItem: React.FunctionComponent<{ message: Message }> = ({
    message,
}) => (
    <tr className={styles.item}>
        <td>{message.id}</td>
        <td className={styles.itemTitle}>
            <Link href={`/admin/contact/${message.id}`}>
                <a>{message.name}</a>
            </Link>
        </td>
        <td className={styles.date}>{message.created.toLocaleString()}</td>
    </tr>
);

export default function indexContact() {
    const auth = useAuth();
    const [contactMessages, setContactMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!auth) {
            return;
        }
        auth.fetch('/api/admin/contact')
            .then((resp) => resp.json())
            .then((json) => {
                setContactMessages(json.contactMessages);
            });
    }, [auth]);

    return (
        <AdminLayout>
            {auth && (
                <>
                    <h1 className={styles.header}>Contact Form Data</h1>
                    <div className={styles.tableWrapper}>
                        <button
                            className={styles.logoutButton}
                            onClick={() => auth.logout()}
                        >
                            Logout
                        </button>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.idHeader}>id</th>
                                    <th className={styles.titleHeader}>From</th>
                                    <th className={styles.dateHeader}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactMessages.map((message) => (
                                    <ContactMessageItem
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}
