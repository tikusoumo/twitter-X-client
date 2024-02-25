import UserProfilePage from "@/components/Userprofile";
import React, { use } from "react";
import { graphqlClient } from "../../../clients/api";
import { getUserByIdQuery } from "../../../graphql/query/user";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "../../../gql/graphql";
import { NextPage } from "next";

interface ServerProps {
  userInfo?: User;
}
interface PageProps {
  params: { id: string };
}

const UserProfile: NextPage<PageProps> = async ({params}) => {
  
  const userInfo = await GetServerComponent(params);



  return (
    <div>
      <UserProfilePage userInfo={userInfo.userInfo}/>
    </div>
  );
};

const GetServerComponent = async (params:{id:string}) => {
  // Fetch some data
  const id = params.id;


  if (!id) return { notFound: true };

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo.getUserById) return { notFound: true };
  // Pass the data to your component as props
  return { userInfo: userInfo.getUserById as User };
};
export default UserProfile;
