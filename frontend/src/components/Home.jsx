import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      if(!user) navigate("/login")
      try {
        const res = await axios.get('/api/posts');
        
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-10  mb-10">
      <div className=' text-center mb-8'>
      <h1 className="text-3xl font-bold mb-1">Our B<span className=' text-blue-500'>l</span>ogs</h1>
      <p className=' text-sm text-gray-400 '>A center for all our resources & Insights</p>
      </div>
      
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center py-10">No posts available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {posts.length >0 &&  posts.map(post => (
           <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;