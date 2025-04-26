import React from 'react'
import { Link } from 'react-router-dom';

// Format date
const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getTypeColor = (type) => {
    switch (type) {
      case "Entertainment":
        return "text-red-500";
      case "Environment":
        return "text-green-500";
      case "Design":
        return "text-pink-500"; // Tailwind doesn’t have magenta, use pink
      case "Tech":
        return "text-blue-500";
      default:
        return "text-green-500"; // Default color for "Daily" or others
    }
  };

const PostCard = (props) => {

  return (
    <div key={props.post._id} className="bg-white hover:shadow-xl  transition-all cursor-pointer  rounded-lg shadow-md overflow-hidden">
        <Link to={`/posts/${props.post._id}`}>
    <div className="p-6 flex flex-col h-full justify-between ">
        <div className=' '>
      <h2 className="text-xl font-bold  ">{props.post.title}</h2>
      <p className={`font-medium text-xs mb-2 mt-0.5 ${getTypeColor(props.post.type)}`}>{props.post.type ? props.post.type : "Daily" }</p>
      </div>
     
      <p className="text-gray-700 text-sm mb-4">
        {props.post.content.length > 150
          ? props.post.content.substring(0, 150) + '...'
          : props.post.content}
      </p>
      <div className=' overflow-hidden flex  items-center'>
        <img src="./public/avatar.svg" className=' h-8 w-8' alt="" />
        <div className='flex justify-between w-full text-sm ml-2'>
        <p>{props.post.author.name}</p>
        <p className ='text-gray-500 text-xs'>{formatDate(props.post.createdAt)}</p>
        </div>
   
      </div>
    </div>
    </Link>
  </div>
  )
}

export default PostCard