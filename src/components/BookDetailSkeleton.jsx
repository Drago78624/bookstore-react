import React from "react";

const BookDetailSkeleton = () => {
  return (
    <>
      <div class="flex items-center justify-center md:justify-start">
        <div className="skeleton w-full md:w-3/4 h-72 rounded-lg"></div>
      </div>
      <div>
        <div className="skeleton w-72 h-12 mb-4"></div>
        <div className="skeleton w-full h-72 mb-4"></div>
        <div class="flex items-center mb-4 gap-2">
          <div className="skeleton w-24 h-8"></div>
          <div className="skeleton w-24 h-8"></div>
        </div>
        <div class="flex item-center gap-2">
          <div className="skeleton w-32 h-14"></div>
          <div className="skeleton w-32 h-14"></div>
        </div>
      </div>
    </>
  );
};

export default BookDetailSkeleton;
