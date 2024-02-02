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
import jwt from 'jsonwebtoken';
import { useCurrentUser } from "../../hooks/user";



interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const TwitterSidebarButtons: TwitterSidebarButton[] = [
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


    const {user} = useCurrentUser();
    console.log(user);
    

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googletoken = cred.credential;
      if (!googletoken) return toast.error("Google login failed!");

      

      const { verifyGoogleToken }: { verifyGoogleToken: string } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googletoken }
      );

      toast.success("Google login success!");
      if (verifyGoogleToken)
        window.localStorage.setItem("_twitter_token", verifyGoogleToken);
    },
    []
  );
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
        <div className="col-span-6 border">
          <Feedcard />
          <Feedcard />
          <Feedcard />
          <Feedcard />
          <Feedcard />
          <Feedcard />
        </div>
        {!user && <div className="col-span-3">
          <h1>New to Twitter?</h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>}
      </div>
    </>
  );
}
