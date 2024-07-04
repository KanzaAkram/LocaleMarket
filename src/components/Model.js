import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal, updateQuantity } from "../redux/cartSlice";
import { PiMinus, PiPlus } from "react-icons/pi";


const reviews = [
  { name: "John Doe", comment: "Great product! Really satisfied with the quality." },
  { name: "Jane Smith", comment: "Excellent value for money. Will definitely buy again." },
  { name: "Alice Johnson", comment: "Fast shipping and the product exceeded my expectations." },
];

const Dropdown = ({ isOpen, handleClose }) => (
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
        {reviews.map((review, index) => (
          <div key={index} className="review-item mb-4">
            <p className="text-xl font-semibold">{review.name}</p>
            <p>"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  )
);

export const Model = ({ isModalOpen, data, handleClose }) => {
  const [qty, setQty] = useState(1);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);


  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      setQty(1);
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

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

  if (!data) return null;

  const handleReviewsToggle = () => {
    setIsReviewsOpen(!isReviewsOpen);
  };

  return (
    <>
      <div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content w-2/3 relative">
              <span
                onClick={() => handleClose()}
                className="absolute top-0  right-0 p-4"
              >
                <FaTimes />
              </span>
              <div className="flex">
                <div className="relative">
                  <div className="modal-poster">
                    <img
                       src={`http://localhost:5000/uploads/${data.image}`}
                      alt={data.name}
                      className="max-w-none"
                    />
                  </div>
                  <div className="tag absolute top-0 right-0 z-10">
                    <p className="bg-green-600 m-2 rounded-full w-15 h-12 grid place-items-center text-white">
                      {data.category_name}
                    </p>
                  </div>
                </div>
                <div className="modal-info ml-6">
                  <h2 className="text-4xl">{data.name}</h2>
                  <p className="mt-4 text-2xl">{data.description}</p>

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
                    <Dropdown isOpen={isReviewsOpen} handleClose={handleReviewsToggle} />
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
                  <p className="text-green-700">
                    In Stock {data.total_stock} Items
                  </p>
                  <div className="flex items-center">
                    <div className="flex mr-3">
                      <button
                        className="border mt-4  pt-3 pb-3 pr-6 pl-6"
                        onClick={() => increaseQuantity(data.id, qty)}
                      >
                        <PiPlus />
                      </button>
                      <span className=" border mt-4  pt-3 pb-3 pr-6 pl-6 count">
                        {qty || 1}
                      </span>
                      <button
                        className="border mt-4  pt-3 pb-3 pr-6 pl-6"
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
