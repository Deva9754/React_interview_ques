import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../graphql/queries';


const PostList = () => {
    const [variables,setVariable]=useState({limit:5,after:null});
    
    const {data,loading,error,fetchMore}=useQuery(GET_POSTS,{
        variables,
        notifyOnNetworkStatusChange:true,
    })

    if(loading && !data)return <p>Loading POsts...</p>
    if(error)return <p>Error:{error.message}</p>

 const {edges,pageInfo}=data.posts;
 const loadMorePosts=()=>{
    fetchMore({
        variables:{
            limit:5,
            after: pageInfo.endCursor,
        },
        updateQuery:(prevResult,{fetchMoreResult })=>{
            if(!fetchMoreResult) return prevResult;
            return{
                posts:{
                    edges:[...prevResult.posts.edges, ...fetchMoreResult.posts.edges],
                    pageInfo:fetchMoreResult.posts.pageInfo,
                },
            };
        },
    });

 };
    return (
<div>

    {edges.map((post)=>(
        <div 
        key={post.id}
        style={{border:'1px solid #ccc',padding:'1rem',margin:'1rem 0'}}

        >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
                <strong>
                    Author:
                </strong>
                {post.author}
            </p>
            <p>
                <small>
                    {new Date(post.createdAt).toLocaleDateString()}
                </small>
            </p>
        </div>
    ))}

    {pageInfo.hasNextPage && (
        <button
        onClick={loadMorePosts}
        style={{marginTop:'1rem'}}
        >
            Load More
        </button>
    )}
</div>


    )
}

export default PostList