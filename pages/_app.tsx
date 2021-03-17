import { AppProps } from "next/app";
import siteConfig from "../site.config";
import GlobalStyle from "../styles/globalStyle";
import Header from "../components/Header";
import Head from "next/head";

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
        date={siteConfig.date}
        url={siteConfig.author.twitter_url}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
