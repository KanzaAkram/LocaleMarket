import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const token = localStorage.getItem('sellertoken');
        if (!token) {
          setError('No token found. Please login again.');
          return;
        }
        
        const response = await axios.get('http://localhost:5000/product/seller', { 
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data)
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching seller products:', err);
        setError('Failed to fetch seller products. Please try again later.');
      }
    };
  
    fetchSellerProducts();
  }, []);
  

  return (
    <div className="px-4 py-8">
      <Link to="/addproducts" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
          Add Product
        </Link>
        <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
          Seller Dashboard
        </h2>
        <div className="bg-white px-4 py-3 rounded-sm border border-gray-200">
          <strong className="block text-gray-700 font-medium mb-3 text-left pl-2">Recent Products</strong>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{product.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="h-24 w-24 object-cover rounded-md" />
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.category}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.price}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-left">{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
