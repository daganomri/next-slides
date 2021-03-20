import { AppProps } from "next/app";
import Head from "next/head";

import Header from "@/layout/Header";
import siteConfig from "@/site.config";
import GlobalStyle from "@/styles/globalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>
          {siteConfig.name} - {siteConfig.title}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        name={siteConfig.name}
        title={siteConfig.title}
        url={siteConfig.author.twitter_url}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
