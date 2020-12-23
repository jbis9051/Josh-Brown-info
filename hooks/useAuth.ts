import {useEffect, useState} from "react";
import router from "next/router";
import User from "../server/models/User";

class Auth {
    token: string;
    user: User;

    constructor(token: string, user: User) {
        this.token = token;
        this.user = user;
    }

    fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        return fetch(input, {
            ...init,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                ...init?.headers,
            }
        })
    }

    logout() {
        return this.fetch('/api/admin/logout').then(() => {
            window.localStorage.removeItem("token");
            return router.push("/admin/login");
        });
    }
}

export function useAuth(redirect = true) {
    const [authed, setAuthed] = useState<null | Auth>(null);

    useEffect(() => {
        fetch('/api/admin/auth', {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
        }).then(async res => {
            if (!res.ok) {
                if (redirect) {
                    router.push("/admin/login?redirect=" + window.location.pathname);
                }
                return;
            }
            const json = await res.json();
            setAuthed(new Auth(window.localStorage.getItem("token")!, json.user));
        });
    }, []);

    return authed;
}
