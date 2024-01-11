import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { RiHome7Fill } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import React from "react";
import Feedcard from "@/components/Feedcard";

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
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
}
