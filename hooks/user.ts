import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../clients/api";
import { getCurrentUserQuery } from "../graphql/query/user";


export const useCurrentUser = () => {
    const {data} = useQuery(
        {
            queryKey: ["current-user"],
          
         
            queryFn: () => graphqlClient.request(getCurrentUserQuery)
        }
    );
   
    return {user: data?.getCurrentUser};
}
;

 