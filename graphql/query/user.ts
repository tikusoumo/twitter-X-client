import { graphql } from "@/../gql";

export const verifyUserGoogleTokenQuery = graphql(/*graphql*/ `
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`
)
export const getCurrentUserQuery = graphql(/*graphql*/ `
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      firstName
      lastName
      profileImageUrl
      tweets {
        id
        content
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }
`)
export const getUserByIdQuery = graphql(/*graphql*/ `
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      id
      email
      firstName
      lastName
      profileImageUrl
      tweets {
        id
        content
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }
`)