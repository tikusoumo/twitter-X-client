"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Feedcard from "@/components/Feedcard";
import { useCurrentUser } from "../../hooks/user";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { useCreateTweet, useGetAllTweetsQuery } from "../../hooks/tweet";
import { Tweet } from "../../gql/graphql";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import {Toaster} from 'sonner'
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


export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweetsQuery();
  const { mutate } = useCreateTweet();
  const [content, setContent] = React.useState("");

  const handleClickTweet = useCallback(() => {
    mutate({ content });
  }, [content, mutate]);

  

  const handleItemClick = useCallback((title: string) => {
    if (title === "Media") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
    } else {
      console.log("clicked " + title);
    }
  }, []);

  return (
    <>
      <TwitterLayout>
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
            <div className="mt-2 flex items-center  justify-between">
              <div className="flex flex-row ">
                {TwitterHomeButtons.map((button, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick(button.title)}
                    className={`${index !== 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} ${
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
          tweets?.map((tweet) =>
            tweet ? <Feedcard key={tweet.id} data={tweet as Tweet} /> : null
          )
        }
      </TwitterLayout>
      <Toaster richColors position="bottom-center"/>
    </>
  );
}
