import Image from "next/image";
import React, { Fragment, use } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LuBarChart2 } from "react-icons/lu";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Tweet } from "../../../gql/graphql";
import Link from "next/link";
import { FiMoreHorizontal } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { FaHeart } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useDeleteTweet } from "../../../hooks/tweet";
import { useCurrentUser } from "../../../hooks/user";


interface TwitterFeedButton {
  icon: React.ReactNode;
  label: string;
}
interface FeedCardProps {
  data: Tweet;
}
const Feedcard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  const { mutateAsync } = useDeleteTweet();
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCommentOpen, setIsCommentOpen] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const TwitterFeedButtons: TwitterFeedButton[] = [
    {
      icon: <BiMessageRoundedDots />,
      label: "Tweet",
    },
    {
      icon: <FaRetweet />,
      label: "Retweet",
    },
    {
      icon: <FaRegHeart />,
      label: "Like",
    },
    // {
    //   icon: <LuBarChart2 />,
    //   label: "analytics",
    // },
    {
      icon: <PiUploadSimpleBold />,
      label: "Share",
    },
  ];
  function closeDeleteModal() {
    setIsOpen(false);
  }

  function openDeleteModal() {
    setIsOpen(true);
  }
  function opemCommentModal() {
    setIsCommentOpen(true);
  }
  function closeCommentModal() {
    setIsCommentOpen(false);
  }
  const handlePostDelete = () => {
    closeDeleteModal();
    mutateAsync(data.id);

    console.log("delete");
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const handleComment = () => {
    
  };

  let heartLike = isLiked ? (
    <FaHeart className="text-red-600" />
  ) : (
    <FaRegHeart className="text-gray-100" />
  );

  return (
    <>
      <div className="grid grid-cols-12 gap-4 border-t-0 border border-gray-700 p-4 hover:bg-gray-900 ">
        <div className="col-span-1">
          <Link href={`/${data.author?.id}`}>
            {data.author.profileImageUrl && (
              <Image
                className="rounded-full"
                src={data.author.profileImageUrl}
                alt="profile-image"
                height={50}
                width={50}
              />
            )}
          </Link>
        </div>
        <div className="col-span-11  ">
          <h5 className="font-bold flex justify-between ">
            <Link href={`/${data.author?.id}`}>
              {data.author.firstName} {data.author.lastName}
            </Link>
            <div className="hover:bg-gray-800 hover:text-sky-600 transition-all ease-in duration-100 px-1 rounded-full flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FiMoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {user?.id === data?.author.id && (
                    <DropdownMenuItem onClick={openDeleteModal}>
                      <h1 className="text-red-600">Delete</h1>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <h1 className="">Edit</h1>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </h5>
          <p className="semi-bold">{data.content}</p>
          {data.imageUrl && (
            <div className="relative h-80 w-full">
              <Image
                src={data.imageUrl}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                alt="tweet-image"
              />
            </div>
          )}
        </div>
        <div className="col-span-12 flex justify-around text-sm sm:text-xl mt-2 cursor-pointer">
          {TwitterFeedButtons.map((button, index) => (
            <div
              key={index}
              className={`p-2 sm:p-4 ${
                index !== 2
                  ? "hover:bg-gray-800 hover:text-sky-500"
                  : "hover:bg-red-500 hover:bg-opacity-20 hover:text-red-600"
              } hover:scale-105 rounded-full  transition-all ease-in-out duration-300`}
              onClick={() => {
                index === 2
                  ? handleLike()
                  : index === 0
                  ? opemCommentModal()
                  : index === 1
                  ? toast("Retweet")
                  : index === 3
                  ? toast("Share")
                  : toast("Analytics");
              }}
            >
              <div className="flex items-center ">
                {index === 2 ? heartLike : button.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* delete modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-opacity-80 bg-black">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are You Sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      It will permanently deleted
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handlePostDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* comment modal */}
      <Transition appear show={isCommentOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeCommentModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-opacity-80 bg-black">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Post Your reply
                  </Dialog.Title>
                  <div className="mt-2">
                   
                    <textarea className="text-black border rounded-lg w-full p-1 px-2"></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      onClick={handleComment}
                    >
                      Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
    </>
  );
};

export default Feedcard;
