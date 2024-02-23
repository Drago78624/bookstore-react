import React from "react";
import Header from "../components/home/Header";
import BooksSlider from "../components/home/BooksSlider";

const Home = () => {
  return (
    <main>
      <Header />
      <div className="container max-w-[992px] mx-auto p-4">
        <BooksSlider />
      </div>
    </main>
  );
};

export default Home;
