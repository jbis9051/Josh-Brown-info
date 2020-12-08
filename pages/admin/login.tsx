import {useAuth} from "../../hooks/useAuth";
import React, {FormEvent, useEffect, useState} from "react";
import styles from './login.module.css';
import {FormError} from "../../components/main/FormError";

interface IFormError {
    genericError: null | string
}

enum State {
    READY,
    LOADING,
}

export default function login() {
    const authed = useAuth(false);
    const [state, setState] = useState<State>(State.READY);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<IFormError>({genericError: null});


    useEffect(() => {
        if (authed) {
            window.location.href = "/admin/contact";
        }
    }, [authed]);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        const errors: IFormError = {genericError: null};
        setState(State.LOADING);
        fetch('/api/admin/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        }).then(async (res) => {
            const json = await res.json();
            if (!res.ok) {
                setState(State.READY);
                setErrors({genericError: json.error});
                return;
            }
            window.localStorage.setItem("token", json.token);
            window.location.href = "/admin/contact";
        })
    }

    return (
        <div className={styles.bgContainer}>
            <div className={styles.container}>
                <img className={styles.logo} src={"/assets/images/thiswebsite/JB%20Logo%20Dark.svg"}/>
                <form onSubmit={onSubmit}>
                    <FormError className={styles.formError} error={errors.genericError}/>
                    <label>Username
                        <input className={styles.input} type="text" value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </label>
                    <label>Password
                        <input className={styles.input} type="password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <button className={styles.submitButton} type={"submit"}>Login</button>
                </form>
            </div>
        </div>
    );
}

