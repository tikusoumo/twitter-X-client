"use client";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { FaArrowLeft } from "react-icons/fa";
import type { NextPage } from "next";
import Image from "next/image";
import Feedcard from "@/components/Feedcard";
import { Tweet, User } from "../../../gql/graphql";
import { useCurrentUser } from "../../../hooks/user";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { graphqlClient } from "../../../clients/api";
import {
  followUserMutation,
  unfollowUserMutation,
} from "../../../graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const userInfo = props.userInfo;
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const amIFollowing = useMemo(() => {
    if (!userInfo) return false;
    return (
      (currentUser?.user?.following?.findIndex(
        (ele) => ele?.id === userInfo?.id
      ) ?? -1) >= 0
    );
  }, [userInfo, currentUser.user?.following]);

  const handleFollowUser = useCallback(async () => {
    if (!userInfo?.id) return;
    await graphqlClient.request(followUserMutation, { to: userInfo.id });
    //@ts-ignore
    queryClient.invalidateQueries(["current-user"]);
  }, [userInfo?.id, queryClient]);
  const handleUnFollowUser = useCallback(async () => {
    if (!userInfo?.id) return;
    await graphqlClient.request(unfollowUserMutation, { to: userInfo.id });
    //@ts-ignore
    queryClient.invalidateQueries(["current-user"]);
  }, [userInfo?.id, queryClient]);

  return (
    <TwitterLayout>
      <div className=" ">
        <nav className="flex items-center gap-4 p-4">
          <Link
            href={"/"}
            className="p-4 hover:bg-gray-800 transition-all ease-in-out rounded-full "
          >
            <FaArrowLeft />
          </Link>
          <div className="">
            <h1 className="text-2xl">
              {userInfo?.firstName + " " + userInfo?.lastName}
            </h1>
            <h1 className="text-xl text-gray-400 ">
              {userInfo?.tweets?.length}
            </h1>
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
        <div className="relative w-24 h-24  left-[50%] -translate-x-[50%] -top-10  md:translate-x-10 md:-translate-y-10 md:left-0 md:top-0 transition-all ease-in-out border-4 border-black rounded-full overflow-hidden">
          <Image
            className=" absolute"
            alt={"Profile"}
            src={userInfo?.profileImageUrl as string}
            fill
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-gray-400  p-0 lg:p-4 ">
            <span>{userInfo?.followers?.length} followers</span>
            <span>{userInfo?.following?.length} followings</span>
          </div>
          {currentUser.user?.id !== userInfo?.id && (
            <>
              {amIFollowing ? (
                <button
                  className="px-4 py-2 bg-gray-200 rounded-full text-gray-900  text-sm font-semibold"
                  onClick={handleUnFollowUser}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 rounded-full text-white text-sm font-semibold"
                  onClick={handleFollowUser}
                >
                  Follow
                </button>
              )}
            </>
          )}
        </div>
        <div className="mt-40">
          {userInfo?.tweets?.map((tweet) => (
            <Feedcard key={tweet?.id} data={tweet as Tweet} />
          ))}
        </div>
      </div>
    </TwitterLayout>
  );
};

export default UserProfilePage;
