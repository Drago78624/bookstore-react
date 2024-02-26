import React from "react";
import Header from "../components/home/Header";
import BooksSlider from "../components/home/BooksSlider";

const Home = () => {
  return (
    <main>
      <Header />
      <BooksSlider />
      <BooksSlider />
    </main>
  );
};

export default Home;
