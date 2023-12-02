import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/layout";

import "~/styles/globals.css";

export const metadata = {
  title: "Safer Pilot",
  description: "Stay proficient, stay safe!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
