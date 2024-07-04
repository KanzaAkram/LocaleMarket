import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const location = useLocation();
  const { cartProducts, totalAmount } = location.state || { cartProducts: [], totalAmount: 0 };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    // const orderDetails = {
    //   items: cartProducts,
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   phone_number: phoneNumber,
    //   address: address,
    //   payment_method: paymentMethod
    // };

    const orderDetails = {
      items: cartProducts.map(item => ({
        product_id: item.id,
        category_id: item.category_id, // Make sure to have category_id if your items don't include it
        quantity: item.quantity,
        price: item.price
      })),
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      phone_number: phoneNumber,
      address: address,
      payment_method: paymentMethod,
      // buyer_id: localStorage.getItem('buyerid') // Fetch buyer_id from localStorage
    };

    console.log('Order Details:', orderDetails);

    try {
      const token = localStorage.getItem('buyertoken');
      if (!token) {
        toast.error('You need to log in first');
        return;
      }

      const response = await axios.post('http://localhost:5000/orders/', orderDetails,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Order placed successfully');
        console.log('Order placed successfully:', response.data);
      } else {
        toast.error('Error placing order');
        console.error('Error placing order:', response.data);
      }
    } catch (error) {
      toast.error('Error placing order');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
        <ToastContainer />
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">Checkout</h2>

        {/* Cart Items */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Your Cart Items</h3>
          {cartProducts.map((item, key) => (
            <div key={key} className="flex justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.title}
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="font-bold">${item.price}</p>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl">
            Sub Total: ${totalAmount}
          </div>
        </div>

        {/* Personal Details */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
            </div>
            <div className="md:col-span-2">
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                    >
                      <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-12 space-x-4">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;





// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PageHeading from "../components/PageHeading";

// const Checkout = () => {

//   const location = useLocation();
//   const { cartProducts, totalAmount } = location.state || { cartProducts: [], totalAmount: 0 };


//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

//   const handlePlaceOrder = async (event) => {
//     event.preventDefault();

//     const orderDetails = {
//       items: cartProducts,
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       phone_number: phoneNumber,
//       address: address,
//       payment_method: paymentMethod
//     };

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('You need to log in first');
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/orders/', orderDetails, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 201) {
//         toast.success('Order placed successfully');
//         console.log('Order placed successfully:', response.data);
//       } else {
//         toast.error('Error placing order');
//         console.error('Error placing order:', response.data);
//       }
//     } catch (error) {
//       toast.error('Error placing order');
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div className="px-4 py-8">
//       {/* <PageHeading home="Home" pagename="Checkout" /> */}
//       <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
//       <ToastContainer />
//         <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
//           Checkout
//         </h2>

//         {/* Cart Items */}
//         <div className="mb-8">
//           <h3 className="text-2xl font-bold mb-4">Your Cart Items</h3>
//           {cartProducts.map((item, key) => (
//             <div key={key} className="flex justify-between mb-4">
//               <div className="flex items-center">
//                 <img
//                   src={`http://localhost:5000/uploads/${item.image}`}
//                   alt={item.title}
//                   className="w-16 h-16 mr-4"
//                 />
//                 <div>
//                   <p className="font-bold">{item.title}</p>
//                   <p>Qty: {item.quantity}</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <p className="font-bold">${item.price}</p>
//               </div>
//             </div>
//           ))}
//           <div className="text-right font-bold text-xl">
//             Sub Total: ${totalAmount}
//           </div>
//         </div>

//         {/* Personal Details */}
//         <div className="mt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-300"></h3>
//               <h3 className="text-xl font-bold text-gray-800 mt-1">
//                 Personal Details
//               </h3>
//             </div>
//             <div className="md:col-span-2">
//               <form>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your first name"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your last name"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="Enter your email address"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Phone Number
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your phone number"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Address
//                       </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your address"
//                       className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Shipping Address */}
//         {/* <div className="mt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-300">02</h3>
//               <h3 className="text-xl font-bold text-gray-800 mt-1">
//                 Shipping Address
//               </h3>
//             </div>
//             <div className="md:col-span-2">
//               <form>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                       Street Address
//                     </label>
//                   <input
//                     type="text"
//                     placeholder="Street address"
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                   />
//                   <label className="block text-sm font-medium text-gray-700">
//                       City
//                     </label>
//                   <input
//                     type="text"
//                     placeholder="City"
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                   />
//                   <label className="block text-sm font-medium text-gray-700">
//                       State
//                     </label>
//                   <input
//                     type="text"
//                     placeholder="State"
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                   />
//                   <label className="block text-sm font-medium text-gray-700">
//                       Zip code
//                     </label>
//                   <input
//                     type="text"
//                     placeholder="Zip Code"
//                     className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div> */}

//         {/* Payment Method */}
//         <div className="mt-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <h3 className="text-3xl font-bold text-gray-300"></h3>
//               <h3 className="text-xl font-bold text-gray-800 mt-1">
//                 {/* Payment Method */}
//               </h3>
//             </div>
//             <div className="md:col-span-2">
//               <div className="grid gap-4 sm:grid-cols-2">
//                 {/* <div className="flex items-center">
                
//                   <input
//                     type="radio"
//                     className="w-5 h-5 cursor-pointer"
//                     id="card"
//                     checked
//                   />
//                   <label
//                     htmlFor="card"
//                     className="ml-4 flex gap-2 cursor-pointer"
//                   >
//                     <img
//                       src="https://readymadeui.com/images/visa.webp"
//                       className="w-12 h-auto"
//                       alt="card1"
//                     />
//                     <img
//                       src="https://readymadeui.com/images/american-express.webp"
//                       className="w-12 h-auto"
//                       alt="card2"
//                     />
//                     <img
//                       src="https://readymadeui.com/images/master.webp"
//                       className="w-12 h-auto"
//                       alt="card3"
//                     />
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     className="w-5 h-5 cursor-pointer"
//                     id="paypal"
//                   />
//                   <label
//                     htmlFor="paypal"
//                     className="ml-4 flex gap-2 cursor-pointer"
//                   >
//                     <img
//                       src="https://readymadeui.com/images/paypal.webp"
//                       className="w-12 h-auto"
//                       alt="paypalCard"
//                     />
//                   </label>
//                 </div> */}
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     className="w-5 h-5 cursor-pointer"
//                     id="cash"
//                   />
//                   <label
//                     htmlFor="cash"
//                     className="ml-4 cursor-pointer"
//                   >
//                     Cash on Delivery
//                   </label>
//                 </div>
//               </div>

//               {/* <div className="grid sm:grid-cols-4 gap-4 mt-4">
//               <label className="block text-sm font-medium text-gray-700">
//                       Enter your card number:
//                     </label>
//                 <input
//                   type="text"
//                   placeholder="Card number"
//                   className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none col-span-2"
//                 />
//                 <label className="block text-sm font-medium text-gray-700">
//                       Enter your card EXP:
//                     </label>
//                 <input
//                   type="text"
//                   placeholder="EXP."
//                   className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                 />
//                 <label className="block text-sm font-medium text-gray-700">
//                       Enter your card CVV:
//                     </label>
//                 <input
//                   type="text"
//                   placeholder="CVV"
//                   className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-blue-500 outline-none"
//                 />
//               </div> */}
//             </div>
//           </div>
//         </div>

//         {/* Payment Buttons */}
//         {/* <div className="flex justify-end mt-12 space-x-4">
//           <button
//             type="button"
//             className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 border-gray-800 text-gray-800 rounded-md hover:bg-blue-100"
//           >
//             Pay Later
//           </button>
//           <button
//             type="button"
//             className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Pay Now
//           </button>
//         </div> */}

//         <div className="flex justify-end mt-12 space-x-4">
//           <button
//             type="button"
//             onClick={handlePlaceOrder}
//             className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

