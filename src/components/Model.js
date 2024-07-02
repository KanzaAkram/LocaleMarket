import React, { useEffect, useState } from "react";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal, updateQuantity } from "../redux/cartSlice";
import { PiMinus, PiPlus } from "react-icons/pi";

const Dropdown = ({ isOpen, handleClose, productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/${productId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen, productId]);

  return (
    isOpen && (
      <div className="reviews-dropdown bg-white p-4 absolute z-50 rounded-lg shadow-lg w-full mt-2">
        <span
          onClick={handleClose}
          className="absolute top-0 right-0 p-4 cursor-pointer"
        >
          <FaTimes />
        </span>
        <div className="reviews-content p-4">
          <h2 className="text-2xl mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.review_id} className="review-item mb-4">
                <p className="text-xl font-semibold">{review.buyer_name}</p>
                <p>"{review.message}"</p>
              </div>
            ))
          ) : (
            <p>No reviews found for this product</p>
          )}
        </div>
      </div>
    )
  );
};

export const Model = ({ isModalOpen, data, handleClose }) => {
  const [qty, setQty] = useState(1);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    let totalPrice = qty * item.price;

    const tempProduct = {
      ...item,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
  };

  const increaseQuantity = (itemId, currentQuantity) => {
    const newQty = currentQuantity + 1;
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };

  const decreaseQuantity = (itemId, currentQuantity) => {
    const newQty = Math.max(currentQuantity - 1, 1);
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };

  const handleReviewsToggle = () => {
    setIsReviewsOpen(!isReviewsOpen);
  };

  return (
    <>
      <div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content w-2/3 relative z-40">
              <span
                onClick={handleClose}
                className="absolute top-0 right-0 p-4 cursor-pointer"
              >
                <FaTimes />
              </span>
              <div className="flex">
                <div className="relative">
                  <div className="modal-poster">
                    <img
                      src={data.img}
                      alt={data.title}
                      className="max-w-none"
                    />
                  </div>
                  <div className="tag absolute top-0 right-0 z-10">
                    <p className="bg-green-600 m-2 rounded-full w-12 h-12 grid place-items-center text-white">
                      {data.tag}
                    </p>
                  </div>
                </div>
                <div className="modal-info ml-6">
                  <h2 className="text-4xl">{data.title}</h2>
                  <p className="mt-4 text-2xl">{data.short_description}</p>
                  <div className="relative">
                    <button
                      className="mt-4 text-green-600 font-bold italic flex items-center"
                      onClick={handleReviewsToggle}
                    >
                      See Reviews
                      {isReviewsOpen ? (
                        <FaChevronUp className="ml-2" />
                      ) : (
                        <FaChevronDown className="ml-2" />
                      )}
                    </button>
                    <Dropdown
                      isOpen={isReviewsOpen}
                      handleClose={handleReviewsToggle}
                      productId={data.id} // Pass product_id or identifier to fetch reviews
                    />
                  </div>
                  <p className="text-red-600 text-2xl">${data.price}</p>
                  <p className="mt-2">{data.description}</p>
                  <div className="flex items-center">
                    <p className="font-semibold">Size: </p>
                    <div className="size-btn mt-4 mb-4">
                      <button className="ml-2 btn pt-1 pb-1 pr-3 pl-3">
                        Small
                      </button>
                      <button className="ml-2 btn pt-1 pb-1 pr-3 pl-3">
                        Medium
                      </button>
                      <button className="ml-2 btn pt-1 pb-1 pr-3 pl-3">
                        Large
                      </button>
                      <button className="ml-2 btn pt-1 pb-1 pr-3 pl-3">
                        Extra Large
                      </button>
                    </div>
                  </div>
                  <p className="text-green-700">In Stock 300 Items</p>
                  <div className="flex items-center">
                    <div className="flex mr-3">
                      <button
                        className="border mt-4 pt-3 pb-3 pr-6 pl-6"
                        onClick={() => increaseQuantity(data.id, qty)}
                      >
                        <PiPlus />
                      </button>
                      <span className="border mt-4 pt-3 pb-3 pr-6 pl-6 count">
                        {qty || 1}
                      </span>
                      <button
                        className="border mt-4 pt-3 pb-3 pr-6 pl-6"
                        onClick={() => decreaseQuantity(data.id, qty)}
                      >
                        <PiMinus />
                      </button>
                    </div>
                    <div className="addtocart mr-3">
                      <button
                        className="mt-4 btn pt-3 pb-3 pr-6 pl-6"
                        onClick={() => addItemToCart(data)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Model;
