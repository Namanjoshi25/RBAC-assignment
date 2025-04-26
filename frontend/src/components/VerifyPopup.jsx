import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function VerifyPopup({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const {preverify}= useContext(AuthContext)
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault()
   preverify({email,password})
   setMessage("Please check your email")
  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white shadow-2xl bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Verify Your Account</h2>

        {message && (
          <p className=' my-2 text-blue-500'>{message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={(e)=>handleVerify(e)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
        >
          Verify
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-500 hover:underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
