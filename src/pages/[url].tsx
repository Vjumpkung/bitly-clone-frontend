import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import client from "@/module/fetch_client";

const post = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="mb-auto mt-auto">
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url: string = context.params?.url?.toString()
    ? context.params?.url?.toString()
    : "";

  const res = await client.GET("/url/{shorturl}", {
    params: { path: { shorturl: url } },
  });

  if (res.response.status !== 200) {
    return { props: { url: null } };
  }

  const data = res.data;

  return {
    props: { data },
    redirect: {
      destination:
        data?.url.includes("http://") || data?.url.includes("https://")
          ? data?.url
          : "https://" + data?.url,
      permanent: false,
    },
  };
};

export default post;
