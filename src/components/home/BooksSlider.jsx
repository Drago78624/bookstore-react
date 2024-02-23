import React from "react";

const BooksSlider = ({ heading }) => {
  return (
    <section>
      <h2 className="font-semibold text-3xl my-4">POPULAR BOOKS</h2>
      <div className="carousel rounded-box">
        <div className="carousel-item card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default BooksSlider;
