import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    type:'',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setFormData({
            title: res.data.title,
            content: res.data.content,
            type: res.data.type
          });
        } catch (err) {
          setError('Failed to load post');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPost();
    }, [id]);
    
    const { title, content,type } = formData;
  
    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = async e => {
      e.preventDefault();
      setError('');
      
      try {
        await axios.put(`/api/posts/${id}`, formData);
        navigate('/admin');
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to update post');
      }
    };
  
    if (loading) {
      return <div>Loading post...</div>;
    }
  
    return (
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center sm:px-6 lg:px-8 mt-24 space-y-8">
        <h1 className=' text-4xl font-bold '>Edit Blog Post</h1>
        <form onSubmit={onSubmit} className=' w-full space-y-4 flex flex-col items-center justify-center '>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="w-full">
            <label htmlFor="title" className=' font-semibold'>Title:</label>
         <div>
            <input
              className=' w-full border-2 border-gray-300 p-2 rounded-sm mt-2'
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
            </div>
          
          </div>
          <div className="mb-4 w-full">
            <label 
              htmlFor="title" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Type
            </label>
            <select name="type" onChange={onChange} value={type} className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
              <option value="Entertainment">Entertainment</option>
              <option value="Design">Design</option>
              <option value="Tech">Tech</option>
              <option value="Enviroment">Enviroment</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="content" className=' font-semibold'>Content:</label>
            <textarea 
            className=' w-full border-2 border-gray-300 p-3 rounded-sm'
              id="content"
              name="content"
              value={content}
              onChange={onChange}
              rows="10"
              required
            ></textarea>
          </div>
          <button type="submit" className=" p-3 bg-blue-500 rounded-md text-white">Update Post</button>
        </form>
      </div>
    );
  };
  
  export default EditPost;