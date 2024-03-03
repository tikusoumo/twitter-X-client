
import {GraphQLClient} from 'graphql-request';

const isClient  = typeof window !== "undefined" && typeof window.localStorage.getItem("_twitter_token") === "string";    

export const graphqlClient = new GraphQLClient('http://localhost:5000/graphql'
,{
    headers: ()=> ({
        Authorization: isClient ? `Bearer ${window.localStorage.getItem("_twitter_token")}`: ""
    })
}
)





