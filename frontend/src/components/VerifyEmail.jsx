import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const userId = queryParams.get('userId');
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/auth/verify/${userId}/${token}`);
        setVerified(true);
      } catch (err) {
        setError(err.response?.data?.msg || 'Verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [userId, token]);

  if (loading) {
    return <div>Verifying your email...</div>;
  }

  return ( 
    <div className=" w-full h-56 mt-24 flex flex-col items-center space-y-4 justify-center">
      {verified ? (
        <div className=' w-full flex flex-col justify-between h-full '>
          <h1 className=' text-2xl text-green-500'>Email Verified!</h1>
          <p>Your email has been successfully verified.</p>
          <Link to="/login" className=" px-6 py-4 border border-green-500 ">
            Login to your account
          </Link>
        </div>
      ) : (
        <div  className='  flex flex-col space-y-6 h-full '> 
          <h1 className=' text-xl text-red-500'>Verification Failed</h1>
          <p>{error}</p>
          <Link to="/" className="px-6 py-4 border border-red-500 hover:bg-red-500 hover:text-white transition-all rounded-md ">
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;