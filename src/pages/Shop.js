import React, { useState, useEffect } from "react";
import { BiCart, BiGitCompare, BiHeart, BiSearch } from "react-icons/bi";
import { Model } from "../components/Model";
import PageHeading from "../components/PageHeading";
import { Link } from "react-router-dom";
import { feateures } from "../data/Data";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter features based on the selected category
  const filteredFeatures = selectedCategory === "All"
    ? feateures
    : feateures.filter((feature) => feature.category === selectedCategory);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/all");
        const data = await response.json();
        console.log(data)
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory === "All") {
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/product/category/${selectedCategory}`);
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);



  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };

  const handleClose = () => {
    setIsModalOpen(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div>
        <PageHeading home={"Home"} pagename={"Shop"} />
        <div className="w-10/12 m-auto mt-8">
          <p>No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <PageHeading home={"Home"} pagename={"Shop"} /> */}

      {/* Category Dropdown */}
      <div className="w-10/12 m-auto mt-8 mb-4 flex items-center">
        <label htmlFor="category" className="mr-4 text-lg font-semibold">
          Search by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="1">Handicrafts</option>
          <option value="2">Food Items</option>
          <option value="3">Clothes</option>
          <option value="4">Cosmetics</option>
        </select>
      </div>


      <div className="w-10/12 m-auto">
        <div className="grid grid-cols-4 gap-8">
          {products.map((product) => (
            <div className="features flex gap-8 mt-8" key={product.id}>
              <div className="overflow-hidden relative m-2">
                <div className="image-container relative">
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full"
                    style={{height: '250px', width: '300px'}}
                  />
                  <div className="hidden absolute bottom-0 bg-red-700 opacity-65 hover:opacity-100 w-full text-center text-white pt-4 pb-4 transition-all">
                    <div className="flex justify-center align-middle">
                      <button className="text-2xl">
                        <BiCart />
                      </button>
                      <button
                        type="button"
                        className="whitespace-nowrap uppercase"
                        onClick={() => handleOpen(product.id)}
                      >
                        {product.name}
                      </button>
                    </div>
                  </div>
                  <div className="tag absolute top-0 z-10">
                    <p className="bg-green-600 m-2 rounded-full w-20 h-12 grid place-items-center text-white">
                      {product.category_name}
                    </p>
                  </div>
                  <div className="hidden absolute bg-white top-0 right-0 p-4 m-4">
                    <div className="mb-4">
                      <BiGitCompare />
                    </div>
                    <div className="mb-4">
                      <BiSearch />
                    </div>
                    <div>
                      <BiHeart />
                    </div>
                  </div>
                </div>
                <div className="product-details text-center mt-2">
                  {/* <p className="mb-2">{product.description}</p> */}
                  <p className="mb-2">{product.name}</p>
                  <p className="text-red-600">${product.price}</p>
                </div>
                <Link
                        to="/AddReview"
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          textAlign: 'center',
                          display: 'inline-block',
                          marginLeft: '4.8rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        Add Review
                      </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Model
        isModalOpen={isModalOpen !== null}
        data={products.find((product) => product.id === isModalOpen)}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Shop;
