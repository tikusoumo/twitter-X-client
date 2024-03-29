
import React from "react";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { Toaster } from "sonner";
import Tweets from "@/components/Tweets";



export default function Home() {


  return (
    <>
      <TwitterLayout  >
        <Tweets  />
      </TwitterLayout>
      <Toaster richColors position="bottom-center" />
    </>
  );
}
