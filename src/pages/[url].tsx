import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

const post = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900">
      <div>
        {data == null ? (
          <div>
            <h1 className="text-5xl font-mono py-5">Invalid link</h1>
            <Link href="/">
              <center>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed">
                  Go back home
                </button>
              </center>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Redirecting.......</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}url/${context.query.url}/`
    );
    const data = await res.json();
    if (!(data.url.includes("http://") || data.url.includes("https://"))) {
      data.url = "http://" + data.url;
    }
    return {
      props: { url: data.url },
      redirect: {
        destination: data !== "null" ? data.url : "",
        permanent: false,
      },
    };
  } catch {
    return { props: { url: null } };
  }
};

export default post;
