import React, {useEffect} from 'react';
import {useAuth} from "../../hoc/useAuth";
import {useRouter} from "next/router";

export default function Index() {
    const authed = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authed) {
            return;
        }
        router.push("/admin/contact");
    }, [authed, router]);

    return null;
}
