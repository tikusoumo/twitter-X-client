import Image from "next/image";
import React from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LuBarChart2 } from "react-icons/lu";
import { PiUploadSimpleBold } from "react-icons/pi";

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
  {
    icon: <LuBarChart2 />,
    label: "analytics",
  },
  {
    icon: <PiUploadSimpleBold />,
    label: "Upload",
  },
]

interface TwitterFeedButton {
  icon: React.ReactNode;
  label: string;
}


const Feedcard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4 border-r-0 border-l-0 border-t-0 border p-4 ">
      <div className="col-span-1">
        <Image
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/71843974?v=4"
          alt="profile-image"
          height={50}
          width={50}
        />
      </div>
      <div className="col-span-11  ">
        <h5 className="font-bold">Soumojit Datta</h5>
        <p className="semi-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          excepturi neque placeat.
        </p>
      </div>
      <div className="col-span-12 flex justify-around text-xl mt-2 cursor-pointer">
        {TwitterFeedButtons.map((button, index) => (
          <div key={index} className="p-4 hover:bg-gray-800 rounded-full hover:text-sky-500 transition-all">

          <div  className="flex items-center  ">
            {button.icon}
            
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedcard;
