import { graphql } from "../../gql";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageUrl
      author {
        id
        firstName
        lastName
        profileImageUrl
      }
    }
  }
`);

export const getSignedURLForTweetImageQuery = graphql(` 
  #graphql
  query GetSignedURLForTweetImage($imageName: String!, $imageType: String!) {
    getSignedURLForTweetImage(imageName: $imageName, imageType: $imageType)
  }
`);