import Image from "next/image";
import React from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LuBarChart2 } from "react-icons/lu";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Tweet } from "../../../gql/graphql";

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
];

interface TwitterFeedButton {
  icon: React.ReactNode;
  label: string;
}
interface FeedCardProps{
  data: Tweet;

}
const Feedcard: React.FC<FeedCardProps> = (props) => {
  const {data} = props;
  return (
    <div className="grid grid-cols-12 gap-4 border-t-0 border border-gray-700 p-4 hover:bg-gray-900 cursor-pointer ">
      <div className="col-span-1">
        {data.author.profileImageUrl && <Image
          className="rounded-full"
          src={data.author.profileImageUrl}
          alt="profile-image"
          height={50}
          width={50}
        />}
      </div>
      <div className="col-span-11  ">
        <h5 className="font-bold">{data.author.firstName} {data.author.lastName}</h5>
        <p className="semi-bold">
          {data.content}
        </p>
      </div>
      <div className="col-span-12 flex justify-around text-xl mt-2 cursor-pointer">
        {TwitterFeedButtons.map((button, index) => (
          <div
            key={index}
            className={`p-4 ${
              index !== 2
                ? "hover:bg-gray-800 hover:text-sky-500"
                : "hover:bg-red-500 hover:bg-opacity-20 hover:text-red-600"
            } rounded-full  transition-all`}
          >
            <div className="flex items-center  ">{button.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedcard;
