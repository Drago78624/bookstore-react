import React from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa6";

const BookCard = () => {
  return (
    <div class="card w-full max-w-72 shadow-md rounded-lg overflow-hidden mx-auto my-4">
      <img
        src="https://www.wavy.com/wp-content/uploads/sites/3/2019/10/AP19277543454386.jpg?w=1280"
        alt="Book cover" class="w-full h-auto object-contain rounded-t-lg" />
      <div class="card-body p-4 flex flex-col justify-between">
        <div>
          <h5 class="card-title font-bold text-lg">Book Title</h5>
          <p class=" mb-2">Author Name</p>
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button class="btn btn-accent btn-sm">
            <FaCartPlus />
            Add to cart
          </button>
          <button class="btn btn-outline btn-error btn-sm">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
