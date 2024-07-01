import React from "react";
import PageHeading from "../components/PageHeading";

const AddReview = () => {
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
        <form action="#" className="space-y-4">
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

