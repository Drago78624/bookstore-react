import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section
      className="max-h-[800px] bg-cover bg-center h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542125387-c71274d94f0a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto flex items-center justify-center h-full relative z-10">
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Welcome to BookStore
          </h1>
          <p className="text-white text-lg md:text-2xl mb-8">
            Escape the ordinary, explore extraordinary worlds. Find your next
            adventure in our haven of stories.
          </p>
          <Link to="/books" className="btn btn-accent">
            BROWSE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
