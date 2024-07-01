import React from "react";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";

const SellerDashboard = () => {
  // Example recent product data with images
  const recentProductData = [
    {
      id: '1',
      name: 'Lawn suit',
      category: 'clothes',
      price: '$199.99',
      description: '3 piece lawn suit',
      image: '/images/i.jpeg', // Relative path to image in public/images folder
    },
    {
      id: '2',
      name: 'Lawn suit',
      category: 'clothes',
      price: '$39.99',
      description: '3 piece lawn suit.',
      image: '/images/e.jpeg', // Relative path to image in public/images folder
    },
    
  ];

  return (
    <div className="px-4 py-8">
      <PageHeading home="Home" pagename="SellerDashboard">
        <Link to="/add-product" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
          Add Product
        </Link>
        <Link to="/upload-product" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
          Upload Product
        </Link>
      </PageHeading>
      <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
          Seller Dashboard
        </h2>
        
        <div className="bg-white px-4 py-3 rounded-sm border border-gray-200">
          <strong className="block text-gray-700 font-medium mb-3 text-left pl-2">Recent Products</strong>
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
                {recentProductData.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{product.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <img src={process.env.PUBLIC_URL + product.image} alt={product.name} className="h-24 w-24 object-cover rounded-md" />
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.category}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.price}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{product.description}</td>
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






