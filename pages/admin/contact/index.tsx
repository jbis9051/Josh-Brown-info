import {useAuth} from "../../../hooks/useAuth";
import React, {useEffect, useState} from "react";
import {ContactMessage} from "../../../server/model/ContactMessage";
import styles from './index.module.css';
import Link from "next/link";
import {AdminLayout} from "../../../components/admin/AdminLayout";

const ContactMessageItem: React.FunctionComponent<{ message: ContactMessage }> = ({message}) => {
    return (
        <tr className={styles.item}>
            <td>{message.id}</td>
            <td className={styles.itemTitle}><Link href={"/admin/contact/" + message.id}><a>{message.name}</a></Link>
            </td>
            <td className={styles.date}>{message.date.toLocaleString()}</td>
        </tr>
    )
}

export default function indexContact() {
    const auth = useAuth();
    const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

    useEffect(() => {
        if (!auth) {
            return;
        }
        auth.fetch('/api/admin/contact').then(resp => resp.json()).then(json => {
            setContactMessages(json.contactMessages);
        });
    }, [auth])

    return (
        <AdminLayout>
            {auth && (
                <>
                    <h1 className={styles.header}>Contact Form Data</h1>
                    <div className={styles.tableWrapper}>
                        <button className={styles.logoutButton} onClick={() => auth.logout()}>Logout</button>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th className={styles.idHeader}>id</th>
                                <th className={styles.titleHeader}>From</th>
                                <th className={styles.dateHeader}>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contactMessages.map(message => <ContactMessageItem key={message.id} message={message}/>)}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </AdminLayout>
    );

}
