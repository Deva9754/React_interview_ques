import {gql} from '@apollo/client';

export const GET_POSTS = gql`
query GetPosts($limit:Int!, $after:String){
 Posts( limit:$limit,after:$after){
    edges {
       id
       title
       content
       author
       CreatedAt     
    }
       PageInfo {
       
       endCursor
       hasNextPage
       }
 }
}
`;