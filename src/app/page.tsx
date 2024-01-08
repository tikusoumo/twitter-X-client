import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { RiHome7Fill } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 pt-12 px-56 h-screen w-screen">
        <div className="col-span-3  ">
          <div className=" text-3xl hover:bg-gray-900 rounded-full w-fit p-4 transition-all">
            <FaXTwitter  />
          </div>
          <ul>
            <li className="pb-4 flex items-center"><RiHome7Fill/>Home</li>
            <li className="pb-4 flex items-center"><FaHashtag/>Explore</li>
            <li className="pb-4 flex items-center"><GrNotification/>Notification</li>
            <li className="pb-4 flex items-center"><FaRegEnvelope/>Messages</li>
            <li className="pb-4 flex items-center">Bookmarks</li>
            <li className="pb-4 flex items-center">Twitter Blue</li>
            <li className="pb-4 flex items-center">Profile</li>
            <li className="pb-4 flex items-center">More</li>
          </ul>
        </div>
        <div className="col-span-6"></div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
}
