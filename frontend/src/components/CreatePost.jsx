import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    type:'',
    content: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { title, content,type } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    
    try {
      await axios.post('/api/posts', formData);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label 
              htmlFor="title" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label 
              htmlFor="title" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Type
            </label>
            <select name="type" className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <option value={type}>Entertainment</option>
              <option value={type}>Design</option>
              <option value={type}>Tech</option>
              <option value={type}>Enviroment</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="content" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={onChange}
              rows="10"
              className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;