"use client";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { FaArrowLeft } from "react-icons/fa";
import type { NextPage } from "next";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "../../../hooks/user";
import Feedcard from "@/components/Feedcard";
import { Tweet } from "../../../gql/graphql";

const UserProfilePage: NextPage = () => {
  const { user } = useCurrentUser();
  return (
    <TwitterLayout>
      <div className=" ">
        <nav className="flex items-center gap-4 p-4">
          <FaArrowLeft />
          <div className="">
            <h1 className="text-2xl">Soumojit Datta</h1>
            <h1 className="text-xl text-gray-400 ">20 tweets</h1>
          </div>
        </nav>
        <div className=" relative w-full h-56 object-cover ">
          <Image
            className=""
            src={
              "https://images.unsplash.com/photo-1707132296769-c72a4d7d4e60?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            objectFit="cover"
            objectPosition="center"
            fill
            alt=""
          />
        </div>
        <div className="relative ">
          <Avatar className="w-24 h-24 absolute left-[50%] -translate-x-[50%] -top-10  md:translate-x-10 md:-translate-y-10 md:left-0 md:top-0 transition-all ease-in-out border-4 border-black">
            <AvatarImage src={user?.profileImageUrl as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-40">
          {user?.tweets?.map((tweet) => (
            <Feedcard key={tweet?.id} data={tweet as Tweet} />
          ))}
        </div>
      </div>
    </TwitterLayout>
  );
};

export default UserProfilePage;