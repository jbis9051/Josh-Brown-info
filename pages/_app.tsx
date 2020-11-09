import type {AppProps} from 'next/app'
import Head from "next/head";
import './global.css';
import NextNprogress from 'nextjs-progressbar';
import '@fortawesome/fontawesome-svg-core/styles.css';

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta property="og:title" content="Josh Brown's Portfolio"/>
                <meta property="og:image" content="/assets/images/thiswebsite/code_small.png"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://joshbrown.info"/>
                <meta name="description"
                      content="Josh Brown's portfolio and resume site containing many of the past project he has been involved in.  The website also contains information on Josh Brown and how you can contact him."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="https://fonts.googleapis.com/css?family=Lato:400,500,700,800,900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Hind|Nunito:400,600,700,800,900&display=swap"
                      rel="stylesheet"/>
                {/* Favicon */}
                <link rel="apple-touch-icon" sizes="180x180"
                      href="/assets/images/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32"
                      href="/assets/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href="/assets/images/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="/assets/images/favicon/site.webmanifest"/>
                <link rel="mask-icon" href="/assets/images/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#00aba9"/>
                <meta name="theme-color" content="#ffffff"/>
                {/* End Favicon */}
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <noscript className="nojs">Why no JavaScript?</noscript>
            </Head>
            <NextNprogress color={"#d1d1d1"} options={{showSpinner: false}} stopDelayMs={200}
                           height={3}/>
            <Component {...pageProps}/>
        </>
    );
}

export default App
