import React, { useState } from "react";
import axios from "axios";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [clothesSize, setClothesSize] = useState("");
  const [small, setSmall] = useState("0");
  const [medium, setMedium] = useState("0");
  const [large, setLarge] = useState("0");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to handle category change and reset clothes size if category changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "clothes") {
      if (e.target.value !== "clothes") {
        setSmall(null);
        setMedium(null);
        setLarge(null);
      }
    }
  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send as multipart/form-data
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("total_stock", totalStock);
    formData.append("category_id", category);
    formData.append("small", small || null); // Ensure null if empty string
    formData.append("medium", medium || null); // Ensure null if empty string
    formData.append("large", large || null); // Ensure null if empty string
    formData.append("image", image);

    try {
      // Get token from local storage
      const token = localStorage.getItem("sellertoken");

      // Send POST request to upload product
      const response = await axios.post(
        "http://localhost:5000/product/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle successful response
      setSuccess(response.data.message);
      setError(null);
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess(null);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block mb-1 text-sm font-medium text-gray-900">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Product Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageUpload" className="block mb-1 text-sm font-medium text-gray-900">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              onChange={handleImageUpload}
              required
            />
            {image && (
              <div className="mt-4">
                <img src={URL.createObjectURL(image)} alt="Product Preview" className="w-full h-auto" />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              id="category"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              <option value="1">Food Items</option>
              <option value="2">Handicrafts</option>
              <option value="3">Clothes</option>
              <option value="4">Cosmetics</option>
            </select>
          </div>

          {/* Clothes Size (conditional based on category) */}
          {/* {category === "3" && ( */}
            <div>
              <label htmlFor="clothesSize" className="block mb-1 text-sm font-medium text-gray-900">
                Sizes Available
              </label>
              <div className="flex space-x-4">
                <div>
                  <label htmlFor="small" className="block mb-1 text-sm font-medium text-gray-900">Small</label>
                  <input
                    type="number"
                    id="small"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
                    placeholder="Quantity for Small"
                    value={small}
                    onChange={(e) => setSmall(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="medium" className="block mb-1 text-sm font-medium text-gray-900">Medium</label>
                  <input
                    type="number"
                    id="medium"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
                    placeholder="Quantity for Medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="large" className="block mb-1 text-sm font-medium text-gray-900">Large</label>
                  <input
                    type="number"
                    id="large"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
                    placeholder="Quantity for Large"
                    value={large}
                    onChange={(e) => setLarge(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          {/* )} */}

          {/* Price */}
          <div>
            <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Total Stock */}
          <div>
            <label htmlFor="totalStock" className="block mb-1 text-sm font-medium text-gray-900">
              Total Stock
            </label>
            <input
              type="text"
              id="totalStock"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Enter Total Stock"
              value={totalStock}
              onChange={(e) => setTotalStock(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ width: "200px" }}
            >
              Add Product
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

























// import React, { useState } from "react";
// import axios from "axios";

// const AddProducts = () => {
//   const [productName, setProductName] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [totalStock, setTotalStock] = useState("");
//   const [clothesSize, setClothesSize] = useState("");
//   const [small, setSmall] = useState("");
//   const [medium, setMedium] = useState("");
//   const [large, setLarge] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     if (e.target.value !== "clothes") {
//       setClothesSize("");
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", productName);
//     formData.append("price", price);
//     formData.append("description", description);
//     formData.append("total_stock", totalStock);
//     formData.append("category_id", category);
//     formData.append("small", small);
//     formData.append("medium", medium);
//     formData.append("large", large);
//     formData.append("image", image);

//     try {
//       const token = localStorage.getItem("sellertoken");
//       const response = await axios.post(
//         "http://localhost:5000/product/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Authorization": `Bearer ${token}`
//           }
//         }
//       );
//       setSuccess(response.data.message);
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className="px-4 py-8">
//       <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
//           Add Product
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="productName"
//               className="block mb-1 text-sm font-medium text-gray-900"
//             >
//               Product Name
//             </label>
//             <input
//               type="text"
//               id="productName"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//               placeholder="Enter Product Name"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="description"
//               className="block mb-1 text-sm font-medium text-gray-900"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               rows="4"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//               placeholder="Product Description..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div>
//             <label
//               htmlFor="imageUpload"
//               className="block mb-1 text-sm font-medium text-gray-900"
//             >
//               Upload Image
//             </label>
//             <input
//               type="file"
//               id="imageUpload"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//               onChange={handleImageUpload}
//               required
//             />
//             {image && (
//               <div className="mt-4">
//                 <img src={URL.createObjectURL(image)} alt="Product Preview" className="w-full h-auto" />
//               </div>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="category"
//               className="block mb-1 text-sm font-medium text-gray-900"
//             >
//               Category
//             </label>
//             <select
//               id="category"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//               value={category}
//               onChange={handleCategoryChange}
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="fooditems">Food Items</option>
//               <option value="handicrafts">Handicrafts</option>
//               <option value="clothes">Clothes</option>
//               <option value="cosmetic">Cosmetics</option>
//             </select>
//           </div>
//           {category === "clothes" && (
//             <div>
//               <label
//                 htmlFor="clothesSize"
//                 className="block mb-1 text-sm font-medium text-gray-900"
//               >
//                 Size
//               </label>
//               <select
//                 id="clothesSize"
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//                 value={clothesSize}
//                 onChange={(e) => setClothesSize(e.target.value)}
//                 required
//               >
//                 <option value="">Select Size</option>
//                 <option value="S">S</option>
//                 <option value="M">M</option>
//                 <option value="L">L</option>
//                 <option value="XL">XL</option>
//               </select>
//             </div>
//           )}
//           <div>
//             <label
//               htmlFor="price"
//               className="block mb-1 text-sm font-medium text-gray-900"
//             >
//               Price
//             </label>
//             <input
//               type="text"
//               id="price"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//               placeholder="Enter Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="totalStock"
//               className="block mb-1 text-sm font-medium text-gray-900"
//             >
//               Total Stock
//             </label>
//             <input
//               type="text"
//               id="totalStock"
//               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
//               placeholder="Enter Total Stock"
//               value={totalStock}
//               onChange={(e) => setTotalStock(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               style={{ width: "200px" }}
//             >
//               Add Product
//             </button>
//           </div>
//           {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//           {success && <p className="text-green-500 text-center mt-4">{success}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProducts;
