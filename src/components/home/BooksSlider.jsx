import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

const BooksSlider = ({ heading }) => {
  return (
    <section className="p-2 container mx-auto">
      <h2 className="font-semibold text-3xl my-4">POPULAR BOOKS</h2>
      <Splide
        options={{
          perPage: 3,
          gap: "2rem",
          rewind: true,
          pagination: false,
          speed: 1000,
          // autoWidth: "992px",
          autoWidth: true,
          type: "loop",
          perMove: 1,
          breakpoints: {
            640: {
              perPage: 2,
              gap: ".7rem",
            },
            480: {
              perPage: 1,
              gap: ".7rem",
            },
          },
        }}
        aria-label="Popular Books"
      >
        <SplideSlide>
          <div className="card card-compact w-52 md:w-64 lg:w-72 bg-base-100 shadow-xl">
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
        </SplideSlide>
      </Splide>
    </section>
  );
};

export default BooksSlider;
