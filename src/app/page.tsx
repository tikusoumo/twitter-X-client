"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { RiHome7Fill } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import React, { useCallback } from "react";
import Feedcard from "@/components/Feedcard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import { useCurrentUser } from "../../hooks/user";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { useCreateTweet, useGetAllTweetsQuery } from "../../hooks/tweet";
import { Tweet } from "../../gql/graphql";
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

const TwitterSidebarButtons: TwitterButton[] = [
  {
    title: "Home",
    icon: <RiHome7Fill />,
  },
  {
    title: "Explore",
    icon: <FaHashtag />,
  },
  {
    title: "Notifications",
    icon: <GrNotification />,
  },
  {
    title: "Messages",
    icon: <FaRegEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <FaRegBookmark />,
  },
  {
    title: "Profile",
    icon: <BsPerson />,
  },
  {
    title: "More",
    icon: <BsThreeDots />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweetsQuery();
  const { mutate } = useCreateTweet();
  const [content, setContent] = React.useState("");

  const handleClickTweet = useCallback(() => {
    mutate({ content });
  }, [content,mutate]);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googletoken = cred.credential;
      if (!googletoken) return toast.error("Google login failed!");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googletoken }
      );

      toast.success("Google login success!");
      if (verifyGoogleToken)
        window.localStorage.setItem("_twitter_token", verifyGoogleToken);
    },
    []
  );

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
      <div className="grid grid-cols-12 gap-2 pt-12 px-56 h-screen w-screen">
        <div className="col-span-3  ">
          <div className=" text-3xl hover:bg-gray-900 rounded-full w-fit p-4 transition-all">
            <FaXTwitter />
          </div>
          <ul>
            {TwitterSidebarButtons.map((button, index) => (
              <li
                key={index}
                className="text-xl flex items-center hover:bg-gray-900 rounded-full w-fit p-4 transition-all font-bold cursor-pointer"
              >
                <span className="mr-4 text-2xl">{button.icon}</span>{" "}
                {button.title}
              </li>
            ))}
          </ul>
          <button className="p-4 w-full text-xl bg-[#1b8eeb] hover:bg-[#1b8debec] rounded-full  transition-all font-bold cursor-pointer">
            Tweet
          </button>
        </div>
        <div className="col-span-6 ">
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
            <div className="col-span-11">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4  bg-transparent text-white  focus:outline-none border-b-2 border-gray-600"
                rows={4}
                placeholder={"What is happening?"}
              ></textarea>
              <div className="mt-2 flex items-center  justify-between">
                <div className="flex gap-4">
                  {TwitterHomeButtons.map((button, index) => (
                    <div
                      key={index}
                      onClick={() => handleItemClick(button.title)}
                      className={`${index !== 0 ? "text-2xl" : "text-xl"} ${
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
                      } text-[#1b8eeb] hover:bg-blue-900 rounded-full w-fit p-2 transition-all font-bold cursor-pointer`}
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
        </div>
        {!user && (
          <div className="col-span-3">
            <h1>New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        )}
      </div>
    </>
  );
}
