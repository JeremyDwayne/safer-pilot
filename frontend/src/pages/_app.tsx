import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/layout";
import Head from "next/head";
import { type User } from "~/types/user";
import { useState, useEffect } from "react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [user, setUser] = useState<User>();
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        credentials: "include",
      });
      const user = (await response.json()) as User;
      setUser(user);
      setAuth(true);
    };
    fetchData().catch((e) => {
      console.log(e);
      setAuth(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Safer Pilot</title>
        <meta name="description" content="Stay proficient, stay safe!" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Layout auth={auth}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
