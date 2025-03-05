"use client";

import axios from "axios";
import { useState } from "react";
import urlHistory from "@/utils/url-history.json";

const urlShortener = async (url: string) => {
  await axios
    .post(
      `https://cleanuri.com/api/v1/shorten`,
      new URLSearchParams({
        url: url,
      })
    )
    .then((response) => {
      return response.data.result_url;
    })
    .catch((error) => {
      console.log(error);
    });
};

const Home = () => {
  const [urlValue, setUrlValue] = useState("");
  const [history, setHistory] = useState<
    {
      original: string;
      shortened: string;
      date: string;
    }[]
  >(urlHistory);

  const historyElementStyle =
    "max-w-[90%] text-xl font-bold overflow-hidden whitespace-nowrap text-ellipsis";

  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      <div className="max-w-[1400px] w-full flex justify-between items-center p-6 bg-gray-500/50 rounded-b-xl">
        <h1 className="flex flex-row justify-center items-center gap-4 rounded-xl text-4xl font-bold text-white tracking-widest">
          <i className="w-10 h-10 bg-blue-600 rounded-full"></i>
          JiffyLink
        </h1>
        <a
          href="#urlInput"
          className="px-6 py-3 border-2 border-blue-600 rounded-xl text-xl font-bold text-white cursor-pointer hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Get Started
        </a>
      </div>
      <div className="max-w-[1400px] w-full h-full flex flex-col gap-24 items-center p-6 pt-24">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="w-full text-6xl font-bold text-white tracking-widest text-center">
            Shorten your <span className="text-blue-600">loooooong</span> URLs
            like never before!
          </h1>
          <h3 className="w-full text-2xl text-white font-bold">
            Copy your long boring URL | Paste it below | Then 💥 You got it,
            right?
          </h3>
        </div>
        <form className="flex flex-row items-center gap-8 px-6 py-6 rounded-xl bg-gray-500/50">
          <input
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            required
            type="text"
            id="urlInput"
            placeholder="https://www.yourwebsite.com/this-is-your-very-long-boring-url"
            className="w-[500px] p-4 rounded-xl text-xl font-bold bg-gray-500/50 focus-visible:outline-none"
          />
          <button
            onClick={() => {
              urlShortener(urlValue);
              setHistory([
                ...history,
                {
                  original: urlValue,
                  shortened: urlValue,
                  date: new Date().toLocaleDateString(),
                },
              ]);
            }}
            type="button"
            className="p-4 rounded-xl text-xl font-bold bg-blue-600 cursor-pointer"
          >
            Shorten URL
          </button>
        </form>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <h1 className="text-4xl text-blue-600 font-bold">URLs History</h1>
          <h3 className="text-2xl text-white font-bold">
            Here are your shortened URLs! Now start rick-roling your friends!
          </h3>
          <div className="w-full grid grid-cols-3 gap-4">
            {history.map((url, index) => {
              return (
                <div
                  key={`url-history-element-${index}`}
                  className="w-full flex flex-col justify-center gap-4 p-4 rounded-xl bg-gray-500/50"
                >
                  <a
                    href={url.shortened}
                    target="_blank"
                    className="flex flex-row items-center gap-4 text-blue-400 cursor-pointer hover:underline"
                  >
                    <span className={`${historyElementStyle}`}>
                      {url.shortened}
                    </span>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 16 16"
                      fill="oklch(0.707 0.165 254.624)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z"></path>
                        <path d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z"></path>
                        <path d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z"></path>
                      </g>
                    </svg>
                  </a>
                  <span className={`${historyElementStyle}`}>
                    {url.original}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
