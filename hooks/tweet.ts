import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../clients/api";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import { CreateTweetInput } from "../gql/graphql";
import { createTweetMutation, deleteTweetMutation } from "../graphql/mutation/tweet";
import { toast } from "sonner";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetInput) =>
      // @ts-ignore
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: (payload) => toast.loading("Creating tweet...", { id: "1" }),
    onSuccess: async (payload) => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Tweet created successfully", { id: "1" });
    },
  },

  
  );
  return mutation;
};

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) =>
      // @ts-ignore
      graphqlClient.request(deleteTweetMutation, { deleteTweetId: id}),
    onMutate: (id) => toast.loading("Deleting tweet...", { id: "2" }),
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Tweet deleted successfully", { id: "2" });
    },
  });
  return mutation;

}

export const useGetAllTweetsQuery = () => {
  const { data } = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });
  return { tweets: data?.getAllTweets };
};
