import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const [post, setPost] = useState();
    const {id} = useParams()

    useEffect(()=>{
      async  function fetchData(){
        const res = await axios.get(`/api/posts/${id}`);
        if(res){
            setPost(res.data)
        }

        }
        fetchData()

    },[])
  return (
    <>
   { post && 
    <div className='max-w-7xl flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-3'>
      <h1 className=' text-4xl mt-3 font-bold'>{ post.title }</h1>  
      <p className=' w-3/4  mt-4'>{post.content}</p>
      <div className="flex w-3/4 items-center justify-between border-t border-gray-300 pt-6 mt-10">
      
      {/* Left: Author Info */}
      <div className="flex justify-between items-center space-x-4">
    
        <img
          src="/public/avatar.svg"
          alt="Author Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-gray-500 text-sm">Written by</p>
          <p className="font-semibold">{post.author.name}</p> {/* Replace with dynamic author name */}
        </div>
       
      </div>
    

      {/* Right: Share Section */}
      <div className="flex  items-center space-x-2 text-gray-500">
        <span className="text-sm mr-2">Share this blog:</span>
        <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
        <FaTwitter className="hover:text-blue-400 cursor-pointer" />
      </div>

    </div>
        </div>
}
    </>
  )
}

export default SingleBlog