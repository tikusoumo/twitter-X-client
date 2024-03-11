"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useCallback } from "react";
import {
  FaHashtag,
  FaRegBookmark,
  FaRegEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
import { BsPerson, BsThreeDots } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";
import { RiHome7Fill } from "react-icons/ri";
import { useCurrentUser } from "../../../hooks/user";
import { toast } from "sonner";
import { graphqlClient } from "../../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../../graphql/query/user";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}
interface TwitterButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();

  const TwitterSidebarButtons: TwitterButton[] = [
    {
      title: "Home",
      icon: <RiHome7Fill />,
      link: "/",
    },
    {
      title: "Explore",
      icon: <FaHashtag />,
      link: "/",
    },
    {
      title: "Notifications",
      icon: <GrNotification />,
      link: "/",
    },
    {
      title: "Messages",
      icon: <FaRegEnvelope />,
      link: "/",
    },
    {
      title: "Bookmarks",
      icon: <FaRegBookmark />,
      link: "/",
    },
    {
      title: "Profile",
      icon: <BsPerson />,
      link: `/${user?.id}`,
    },
    {
      title: "More",
      icon: <BsThreeDots />,
      link: "/",
    },
  ];

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

  return (
    <>
      <div className="grid grid-cols-12  h-screen w-screen overflow-x-hidden  ">
        <div className="col-span-2 sm:col-span-3 flex sm:justify-end  ">
          <div className="pr-4 ">
            <div className=" text-3xl hover:bg-gray-900 rounded-full w-fit  p-4 transition-all">
              <FaXTwitter />
            </div>
            <ul className="my-1">
              {TwitterSidebarButtons.map((button) => (
                <li key={button.title}>
                  <Link
                    className="text-xl flex items-center hover:bg-gray-900 rounded-full w-14 lg:w-fit p-4 transition-all font-bold cursor-pointer"
                    href={button.link}
                  >
                    <span className="mr-4 text-2xl">{button.icon}</span>
                    <span className="hidden  lg:inline"> {button.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button className="p-4 w-full text-xl hidden lg:inline-block bg-[#1b8eeb] hover:bg-[#1b8debec] rounded-full  transition-all font-bold cursor-pointer">
              Tweet
            </button>
            <button className="p-4  text-xl lg:hidden  bg-[#1b8eeb] hover:bg-[#1b8debec] rounded-full  transition-all font-bold cursor-pointer">
              <FaXTwitter />
            </button>
            {user && (
              <div className="p-0   lg:p-1 lg:pr-4  lg:bg-gray-900 rounded-full my-4 flex  justify-between items-center">
                <AnimatedTooltip
                  items={[
                    {
                      id: 1,
                      name: `${user?.firstName + " " + user?.lastName}`,
                      designation: "User",
                      image: user?.profileImageUrl as string,
                    },
                  ]}
                />

                <h1 className=" font-semibold hidden lg:inline-block">
                  {user?.firstName + " " + user?.lastName}
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className=" col-span-10 sm:col-span-6 overflow-y-scroll no-scrollbar">
          {props.children}
          </div>
        {!user && (
          <div className="col-span-0 sm:col-span-3">
            <h1>New to Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        )}
      </div>
    </>
  );
};

export default TwitterLayout;
