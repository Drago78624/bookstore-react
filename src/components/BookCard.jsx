import React from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa6";

const BookCard = ({ title, imgUrl, description }) => {
  return (
    <div className="card w-full max-w-72 shadow-md rounded-lg overflow-hidden mx-auto my-4">
      <img
        src={imgUrl}
        alt="Book cover"
        className="w-full h-48 object-contain rounded-t-lg"
      />
      <div className="card-body p-4 flex flex-col justify-between">
        <div className="text-center">
          <h5 className="block card-title font-bold text-lg">
            {title.substr(0, 52)}{title.length > 52 && "..."}
          </h5>
          {/* <p className=" mb-2">Author Name</p> */}
          <p className="mb-2">{description.substr(0, 52) + "..."}</p>
          {/* <div className="rating">
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
          </div> */}
        </div>
        <div className="flex justify-between items-center">
          <button className="btn btn-accent btn-sm">
            <FaCartPlus />
            Add to cart
          </button>
          <button className="btn btn-outline btn-error btn-sm">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
