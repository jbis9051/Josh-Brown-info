import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from './contact.module.css';
import Layout from '../components/main/Layout';
import FormError from '../components/main/FormError';
import Spinner from '../components/main/Spinner';

interface IFormError {
    name: null | string;
    email: null | string;
    message: null | string;
    genericError: null | string;
}

enum State {
    READY,
    LOADING,
    SUBMITTED,
}

export default function Contact() {
    const [state, setState] = useState<State>(State.READY);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<IFormError>({
        name: null,
        email: null,
        message: null,
        genericError: null,
    });

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        const errorsObj: IFormError = {
            name: null,
            email: null,
            message: null,
            genericError: null,
        };
        if (name.trim().length === 0) {
            errorsObj.name = 'Please enter a name';
        }
        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            errorsObj.email = 'Please enter a valid email';
        }
        if (message.trim().length === 0) {
            errorsObj.message = 'Please enter a message';
        }
        setErrors(errorsObj);
        if (Object.values(errorsObj).some((value) => !!value)) {
            return;
        }
        setState(State.LOADING);
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        }).then(async (res) => {
            if (!res.ok) {
                setState(State.READY);
                setErrors({
                    email: null,
                    message: null,
                    name: null,
                    genericError: 'Unknown Error Occurred',
                });
                return;
            }
            setState(State.SUBMITTED);
        });
    }

    return (
        <Layout>
            <Head>
                <title>Contact | Josh Brown</title>
            </Head>
            <div className={styles.contactWrapper}>
                {(() => {
                    switch (state) {
                        case State.SUBMITTED:
                            return (
                                <div>
                                    <span className={styles.successText}>
                                        Success! Thanks for contacting me.
                                    </span>
                                </div>
                            );
                        case State.LOADING:
                            return <Spinner />;
                        case State.READY:
                            return (
                                <form onSubmit={onSubmit}>
                                    <h1 className={styles.header}>
                                        Contact Me
                                    </h1>
                                    <FormError
                                        className={styles.formError}
                                        error={errors.genericError}
                                    />
                                    <FormError
                                        className={styles.formError}
                                        error={errors.name}
                                    />
                                    <input
                                        className={styles.input}
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Name"
                                    />
                                    <FormError
                                        className={styles.formError}
                                        error={errors.email}
                                    />
                                    <input
                                        className={styles.input}
                                        type="text"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Email Address"
                                    />
                                    <FormError
                                        className={styles.formError}
                                        error={errors.message}
                                    />
                                    <textarea
                                        className={styles.textarea}
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        placeholder="Message"
                                        name="message"
                                    />
                                    <button
                                        className={styles.submitButton}
                                        type={'submit'}
                                    >
                                        Send
                                    </button>
                                </form>
                            );
                        default:
                            throw new Error('Unknown State');
                    }
                })()}
            </div>
        </Layout>
    );
}
