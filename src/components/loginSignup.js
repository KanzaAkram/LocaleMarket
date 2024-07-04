// import React, { useState } from 'react';
// import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { decode as jwt_decode } from 'jwt-decode';


// const LoginSignup = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!isLogin && (!name || !email || !password || !role)) {
//       toast.error('All fields are required');
//       console.error('All fields are required');
//       return;
//     }

//     const url = isLogin ? 'http://localhost:5000/user/login' : 'http://localhost:5000/user/register';
//     const body = isLogin
//       ? { email, password }
//       : { name, email, password, role };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(isLogin ? 'Login successful' : 'Registration successful');
//         console.log(isLogin ? 'Login successful' : 'Registration successful');
//         localStorage.setItem('token', data.token);

//         // Decode the token to extract the user ID
//         const decodedToken = jwt_decode(data.token);
//         const userId = decodedToken.userId; // Adjust based on your token structure
//         localStorage.setItem('userId', userId);
        
//         if (isLogin) {
//           // Navigate based on the role
//           if (data.role === 'seller') {
//             navigate('/sellerdashboard');
//           } else {
//             navigate('/');
//           }
//         } else {
//           // If registration is successful, switch to login form
//           setIsLogin(true);
//         }

//         // Clear the form
//         setName('');
//         setEmail('');
//         setPassword('');
//         setRole('');
//       } else {
//         toast.error(data.message || 'An error occurred');
//         if (data.message === 'Email does not exist. Please register.') {
//           setIsLogin(false); // Switch to registration form
//         }
//         console.error(data.message || 'An error occurred');
//       }
//     } catch (error) {
//       toast.error('An error occurred');
//       console.error('An error occurred', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-5 border-4 border-gray-900 rounded-lg mt-10 mb-10 bg-white shadow-lg">
//       <ToastContainer />
//       <h1 className="text-center text-4xl mb-6">{isLogin ? 'Login' : 'Register'}</h1>
//       <form className="flex flex-col" onSubmit={handleSubmit}>
//         {!isLogin && (
//           <div className="mb-4">
//             <label className="font-bold text-xl flex items-center">
//               <MdPerson className="mr-2" /> Name:
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="p-2 mt-2 border border-gray-700 rounded w-full"
//             />
//           </div>
//         )}
//         <div className="mb-4">
//           <label className="font-bold text-xl flex items-center">
//             <MdEmail className="mr-2" /> Email:
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="p-2 mt-2 border border-gray-700 rounded w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="font-bold text-xl flex items-center">
//             <MdLock className="mr-2" /> Password:
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="p-2 mt-2 border border-gray-700 rounded w-full"
//           />
//         </div>
//         {!isLogin && (
//           <div className="mb-4">
//             <label className="font-bold text-xl">User Type:</label>
//             <div className="flex items-center mt-2">
//               <input
//                 type="radio"
//                 value="buyer"
//                 checked={role === 'buyer'}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="mr-2"
//               />
//               <label className="mr-4">Buyer</label>
//               <input
//                 type="radio"
//                 value="seller"
//                 checked={role === 'seller'}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="mr-2"
//               />
//               <label>Seller</label>
//             </div>
//           </div>
//         )}
//         <button
//           type="submit"
//           className="p-3 bg-red-700 text-white font-bold rounded mt-4 hover:bg-red-800"
//         >
//           {isLogin ? 'Login' : 'Register'}
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
//         <button
//           onClick={() => setIsLogin(!isLogin)}
//           className="text-blue-500 hover:underline"
//         >
//           {isLogin ? 'Register' : 'Login'} here
//         </button>
//       </p>
//     </div>
//   );
// };

// export default LoginSignup;


import React, { useState } from 'react';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLogin && (!name || !email || !password || !role)) {
      toast.error('All fields are required');
      console.error('All fields are required');
      return;
    }

    const url = isLogin ? 'http://localhost:5000/user/login' : 'http://localhost:5000/user/register';
    const body = isLogin
      ? { email, password }
      : { name, email, password, role };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isLogin ? 'Login successful' : 'Registration successful');
        console.log(isLogin ? 'Login successful' : 'Registration successful');
        // localStorage.setItem('token', data.token);

        
        if (isLogin) {
          
          // Navigate based on the role
          if (data.role === 'seller') {
            localStorage.setItem('sellertoken', data.token);
            localStorage.setItem('role', 'seller');
            navigate('/sellerdashboard');
          } else {
            localStorage.setItem('buyertoken', data.token);
            localStorage.setItem('role', 'buyer');
            navigate('/');
          }
        } else {
          // If registration is successful, switch to login form
          setIsLogin(true);
        }

        // Clear the form
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
      } else {
        toast.error(data.message || 'An error occurred');
        if (data.message === 'Email does not exist. Please register.') {
          setIsLogin(false); // Switch to registration form
        }
        console.error(data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('An error occurred', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 border-4 border-gray-900 rounded-lg mt-10 mb-10 bg-white shadow-lg">
      <ToastContainer />
      <h1 className="text-center text-4xl mb-6">{isLogin ? 'Login' : 'Register'}</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label className="font-bold text-xl flex items-center">
              <MdPerson className="mr-2" /> Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 mt-2 border border-gray-700 rounded w-full"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="font-bold text-xl flex items-center">
            <MdEmail className="mr-2" /> Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 mt-2 border border-gray-700 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold text-xl flex items-center">
            <MdLock className="mr-2" /> Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 mt-2 border border-gray-700 rounded w-full"
          />
        </div>
        {!isLogin && (
          <div className="mb-4">
            <label className="font-bold text-xl">User Type:</label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                value="buyer"
                checked={role === 'buyer'}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label className="mr-4">Buyer</label>
              <input
                type="radio"
                value="seller"
                checked={role === 'seller'}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              <label>Seller</label>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="p-3 bg-red-700 text-white font-bold rounded mt-4 hover:bg-red-800"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? 'Register' : 'Login'} here
        </button>
      </p>
    </div>
  );
};

export default LoginSignup;
