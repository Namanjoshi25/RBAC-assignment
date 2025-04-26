
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx';
import axios from 'axios';
import PrivateRoute from './components/routing/PrivateRoute.jsx';
import AdminRoute from './components/routing/AdminRoute'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
 import UserManagement from './components/UserManagement';
import SingleBlog from './components/SingleBlog.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
/* import NotFound from './components/pages/NotFound'; */

function App() {
  axios.defaults.baseURL = 'http://localhost:5000/';
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container  ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route 
              path="/admin/posts/create" 
              element={
                <AdminRoute>
                  <CreatePost />
                </AdminRoute>
              }
            />
            <Route 
              path="/admin/posts/edit/:id" 
              element={
                <AdminRoute>
                {  <EditPost /> }
                </AdminRoute>
              }
            />
            <Route
            path='/posts/:id'
            element={<SingleBlog/>}
            />
            <Route
            path='/verifyemail'
            element={<VerifyEmail/>}
            />
            <Route 
              path="/admin/users" 
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />
         {/*    <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;