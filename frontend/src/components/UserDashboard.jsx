import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
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
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      
      {isAdmin && (
        <div className="admin-actions">
          <Link to="/admin" className="btn btn-primary">
            Go to Admin Dashboard
          </Link>
        </div>
      )}
      
      <h2>Recent Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        <div className="posts-list">
          {posts.slice(0, 5).map(post => (
            <div key={post._id} className="dashboard-post">
              <h3>{post.title}</h3>
              <p>
                By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/posts/${post._id}`}>Read more</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;