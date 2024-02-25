"use client";
import React, { useCallback } from "react";
import { Tweet } from "../../../gql/graphql";
import Feedcard from "../Feedcard";
import { useCurrentUser } from "../../../hooks/user";
import { useCreateTweet, useGetAllTweetsQuery } from "../../../hooks/tweet";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaFileImage } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineGifBox } from "react-icons/md";
import Image from "next/image";
import { graphql } from "../../../gql";
import { graphqlClient } from "../../../clients/api";
import { getSignedURLForTweetImageQuery } from "../../../graphql/query/tweet";
import axios, { Axios } from "axios";
import { toast } from "sonner";

export default function Tweets() {
  interface TwitterButton {
    title: string;
    icon: React.ReactNode;
  }

  const TwitterHomeButtons: TwitterButton[] = [
    {
      title: "Media",
      icon: <FaFileImage />,
    },
    {
      title: "GIF",
      icon: <MdOutlineGifBox />,
    },
    {
      title: "Poll",
      icon: <LuLayoutList />,
    },
    {
      title: "Emoji",
      icon: <HiOutlineEmojiHappy />,
    },
    {
      title: "Schedule",
      icon: <AiOutlineSchedule />,
    },
  ];

  const [content, setContent] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweetsQuery();
  const { mutate } = useCreateTweet();

  const handleClickTweet = useCallback(() => {
    mutate({ content});
  }, [content, mutate]);
  const handleImageUpload = useCallback((input: HTMLInputElement) => {
    
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.[0];
      if (!file) return;
      const { getSignedURLForTweetImage } = await graphqlClient.request(
        getSignedURLForTweetImageQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );
      if (getSignedURLForTweetImage) {
        toast.loading("Uploading Image", { id: 1 });
        await axios.put(getSignedURLForTweetImage, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Image Uploaded Successfully", { id: 1 });
        const url = new URL(getSignedURLForTweetImage);
        const imageUrl = `${url.origin}${url.pathname}`;
        setImageURL(imageUrl);
      }
    };
  }, []);

  const handleItemClick = useCallback(
    (title: string) => {
      if (title === "Media") {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        const handleImageFn = handleImageUpload(input);
        input.addEventListener("change", handleImageFn);
        input.click();
      } else {
        console.log("clicked " + title);
      }
    },
    [handleImageUpload]
  );
  return (
    <div>
      <div className="grid grid-cols-12 gap-4  border border-gray-600 p-4 hover:bg-slate-900 cursor-pointer">
        <div className="col-span-1">
          {user?.profileImageUrl && (
            <Image
              className="rounded-full"
              src={user?.profileImageUrl}
              alt="profile-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11 ">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4  bg-transparent text-white  focus:outline-none border-b-2 border-gray-600"
            rows={4}
            placeholder={"What is happening?"}
          ></textarea>
          {imageURL && (
            <div className="relative h-40 w-full">
              <Image
                src={imageURL}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                alt="tweet-image"
              />
            </div>
          )}
          <div className="mt-2 flex items-center  justify-between">
            <div className="flex flex-row ">
              {TwitterHomeButtons.map((button, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(button.title)}
                  className={`${
                    index !== 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  } ${
                    index === 0
                      ? "hover:text-green-500"
                      : index === 1
                      ? "hover:text-[#a48be9]"
                      : index === 2
                      ? "hover:text-orange-500"
                      : index === 3
                      ? "hover:text-yellow-500"
                      : index === 4
                      ? "hover:text-white"
                      : ""
                  } text-[#1b8eeb] hover:bg-blue-900 rounded-full  p-2 transition-all font-bold cursor-pointer`}
                >
                  {button.icon}
                </div>
              ))}
            </div>

            <button
              onClick={handleClickTweet}
              className="py-2 px-4  text-sm bg-[#1b8eeb] hover:bg-[#1b8debec] rounded-full  transition-all font-bold cursor-pointer"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
      {
        // @ts-ignore
        tweets.map((tweet) =>
          tweet ? <Feedcard key={tweet.id} data={tweet as Tweet} /> : null
        )
      }
    </div>
  );
}
