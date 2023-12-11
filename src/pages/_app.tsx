import Footer from "@/components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between w-screen h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>bitly clone</title>
      </Head>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
