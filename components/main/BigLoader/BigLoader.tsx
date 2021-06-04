import React, { useEffect, useState } from 'react';
import Loader from './Loader';

let globalLoaded = false;

const BigLoader: React.FunctionComponent = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const [fontsReady, setFontReady] = useState(false);

    useEffect(() => {
        if (globalLoaded) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!document.fonts) {
            setFontReady(true);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.fonts.ready.then(() => setFontReady(true));
            setTimeout(() => {
                if (!fontsReady) {
                    setFontReady(true);
                }
            }, 1000);
        }
    }, []);

    if (globalLoaded) {
        return <>{children}</>;
    }

    if (!fontsReady) {
        return <>{null}</>;
    }

    if (!loaded) {
        return (
            <Loader
                onDone={() => {
                    globalLoaded = true;
                    setLoaded(true);
                }}
            />
        );
    }

    return <>{children}</>;
};
export default BigLoader;
