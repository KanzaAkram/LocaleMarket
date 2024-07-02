import React, { useState } from "react";
import PageHeading from "../components/PageHeading";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [clothesSize, setClothesSize] = useState(""); // For clothes category

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // Reset clothes size when category changes
    if (e.target.value !== "clothes") {
      setClothesSize("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("category_id", category);
    formData.append("price", price);
    formData.append("total_stock", totalStock);
    formData.append("image", image);

    // For clothes category
    if (category === "clothes") {
      formData.append("small", clothesSize === "S" ? 1 : 0);
      formData.append("medium", clothesSize === "M" ? 1 : 0);
      formData.append("large", clothesSize === "L" ? 1 : 0);
    } else {
      formData.append("small", 0);
      formData.append("medium", 0);
      formData.append("large", 0);
    }

    try {
      const response = await fetch("/upload", {
        method: "POST",
        headers: {
          // No need to set Content-Type when sending FormData
          // 'Content-Type': 'multipart/form-data'
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you use token-based authentication
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product uploaded successfully");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading product");
    }
  };

  return (
    <div className="px-4 py-8">
      <PageHeading home="Home" pagename="Add Product" />
      <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="productName"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
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
          <br></br>
          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
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
          <br></br>
          <div>
            <label
              htmlFor="image"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Enter Image URL"
              value={image ? URL.createObjectURL(image) : ""}
              readOnly
            />
          </div>
          <br></br>
          <div>
            <label
              htmlFor="imageUpload"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Or Upload Image
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
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
          <br></br>
          <div>
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
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
              <option value="fooditems">Food Items</option>
              <option value="handicrafts">Handicrafts</option>
              <option value="clothes">Clothes</option>
              <option value="cosmetic">Cosmetics</option>
            </select>
          </div>

          {category === "clothes" && (
            <div>
              <label
                htmlFor="clothesSize"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Size
              </label>
              <select
                id="clothesSize"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
                value={clothesSize}
                onChange={(e) => setClothesSize(e.target.value)}
                required
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
          )}
          <br></br>
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
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
          <br></br>
          <div>
            <label
              htmlFor="totalStock"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
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
          <br></br>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ width: "200px" }}
            >
              Add Product
            </button>
            <br></br>
            <br></br>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
