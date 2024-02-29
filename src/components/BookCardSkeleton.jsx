import React from "react";

const BookCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-52">
      <div className="skeleton h-48 w-32 rounded-lg"></div>
      <div className="skeleton h-4 w-28 rounded-lg"></div>
      <div className="skeleton h-12 w-full rounded-lg"></div>
      <div className="flex justify-between w-full rounded-lg">
        <div className="skeleton h-8 w-24 rounded-lg"></div>
        <div className="skeleton h-8 w-8 rounded-lg"></div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
