import { useState } from "react";
import copy from "copy-to-clipboard";
import Swal from "sweetalert2";
import Spinner from "@/components/spinner";
import validator from "validator";
import client from "@/module/fetch_client";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function submitUrl() {
    const url = document.getElementById("url_input") as HTMLInputElement;
    if (!validator.isURL(url.value)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid URL",
      });
      return;
    }

    setIsLoading(true);
    const res = await client.POST("/url", { body: { url: url.value } });

    const data = await res.data;
    if (res.response.status !== 201) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Your URL has been shortened",
        text: window.location.href + data?.shorturl,
        confirmButtonText: "Copy",
        confirmButtonColor: "#10b018",
      }).then((result) => {
        if (result.isConfirmed) {
          copy(window.location.href + data?.shorturl);
          Swal.fire({
            title: "Copied!",
            text: "Your shortened URL has been copied to clipboard",
          });
        }
      });
    }
    setIsLoading(false);
  }

  return (
    <main className="my-auto w-full max-w-xl">
      <div className="px-5 mb-5">
        <div className="mx-auto">
          <h1 className="text-5xl font-mono py-5 text-center">bitly-clone</h1>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your very very long URL.
          </label>
          <input
            type="url"
            id="url_input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </div>
        <div className="w-12 h-12 mx-auto py-3">
          {isLoading ? (
            <div className="mt-5">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-row justify-center">
              <button
                className="px-4 m-auto text-center mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
                onClick={() => submitUrl()}
                disabled={isLoading}
              >
                Shorten
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
