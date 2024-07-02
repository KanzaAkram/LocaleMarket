import React, { useState } from "react";
import PageHeading from "../components/PageHeading";

const AddReview = () => {
  const [name, setName] = useState(""); // State for the reviewer's name
  const [review, setReview] = useState(""); // State for the review message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have the product_id stored somewhere or passed as a prop
    const product_id = "your_product_id_here"; // Replace with actual product_id logic

    const data = {
      message: review,
      product_id: product_id,
    };

    try {
      const response = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      alert("Review added successfully");
      // Optionally, you can redirect or update state after successful submission
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review");
    }
  };

  return (
    <div className="px-4 py-8">
      <PageHeading home="Home" pagename="Add Review" />
      <div className="mx-auto max-w-screen-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
          Add Review
        </h2>
        <p className="mb-6 text-lg text-center text-gray-600">
          Share your thoughts and feedback on the product.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="review"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Your Review
            </label>
            <textarea
              id="review"
              rows="6"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              style={{ width: "200px", height: "50px", marginLeft: "34rem" }}
              className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
