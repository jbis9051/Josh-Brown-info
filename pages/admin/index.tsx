import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

export default function Index() {
    const authed = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authed) {
            return;
        }
        router.push('/admin/contact');
    }, [authed, router]);

    return null;
}
