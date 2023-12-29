import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-10 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>bitly clone</title>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
