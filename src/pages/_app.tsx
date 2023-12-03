import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';

import 'feather-icons/dist/feather';
import '../styles/global.css';
import Layout from './layout';
import { NextPage } from 'next';
import Head from 'next/head';

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

// This default export is required in a new `pages/_app.js` file.
export default function Intellect({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="%PUBLIC_URL%/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <meta
                    name="description"
                    content="Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, займаються навчальною, методичною і організаційною роботою."
                />
                <meta
                    name="keywords"
                    content="система Інтелект, НТУУ КПІ, Київський політехнічний інститут, викладачі КПІ, Intellect"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0277bd" />

                <meta property="og:title" content="Інтелект | КПІ ім. Ігоря Сікорського" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://intellect.kpi.ua/images/fb-image.png?v=20200608105700" />
                <meta
                    property="og:description"
                    content="Проект об′єднує вчених, викладачів, інженерів та аспірантів університету, які займаються інтелектуальною творчою діяльністю, проводять фундаментальні та прикладні наукові дослідження, впроваджують отримані результати в виробництво, займаються навчальною, методичною і організаційною роботою."
                />
                <meta property="fb:app_id" content="1214335051921931" />
            </Head>
            <main>{getLayout(<Component {...pageProps} />)};</main>
        </>
    );
}
