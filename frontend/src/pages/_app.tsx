import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/layout";
import Head from "next/head";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Safer Pilot</title>
        <meta name="description" content="Stay proficient, stay safe!" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
