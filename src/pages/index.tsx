import { Clipboard, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import copy from "copy-to-clipboard";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [notification, setNotification] = useState<string>("");

  async function submitUrl() {
    setIsLoading(true);
    const url = document.querySelector("input[type=url]") as HTMLInputElement;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.value }),
      });
      const data = await res.json();
      setShortUrl(window.location.href + data.shorturl);
    } catch {
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyShortenedUrl() {
    copy(shortUrl);
    setNotification("Copied!");
    setTimeout(() => {
      setNotification("");
    }, 1000);
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900">
      <h1 className="text-5xl font-mono py-5">bitly-clone</h1>
      <div className="px-5 mb-5 max-w-xl w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your very long URL
        </label>
        <input
          type="url"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <center>
          <button
            className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={submitUrl}
            disabled={isLoading}
          >
            Shorten
          </button>
        </center>
        <div className="mt-5 flex">
          <div className="pr-2">
            <span className="block text-md font-medium text-white">
              Your short URL : {shortUrl}
            </span>
          </div>
          <div className="pl-2">
            <button
              className="disabled:cursor-not-allowed"
              onClick={copyShortenedUrl}
              disabled={shortUrl === ""}
            >
              <Clipboard color="#FFFFFF" size={32} />
            </button>
          </div>
          <div className="pr-2">
            <span className="pl-2 block text-md font-medium text-white">
              {notification}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
