
import React from "react";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { Toaster } from "sonner";
import Tweets from "@/components/Tweets";
import { getAllTweetsQuery } from "../../graphql/query/tweet";
import { graphqlClient } from "../../clients/api";
import { Tweet } from "../../gql/graphql";
import Feedcard from "@/components/Feedcard";


export default function Home() {


  return (
    <>
      <TwitterLayout >
        <Tweets  />
      </TwitterLayout>
      <Toaster richColors position="bottom-center" />
    </>
  );
}
