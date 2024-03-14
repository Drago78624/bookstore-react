import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import BookCard from "../books/BookCard";
import BookCardSkeleton from "../books/BookCardSkeleton";

const BooksSlider = ({ heading }) => {
  const [bookCards, setBookCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    const books = [];
    try {
      const collectionRef = collection(db, "books");
      const q = query(collectionRef, limit(10)); // Limit to 7 documents
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        books.push(doc.data());
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
    return books;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const books = await fetchBooks();
      setBookCards(books);
      setLoading(false);
    };
    fetchData();
  }, []);
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
        {!bookCards.length &&
          [...Array(10).keys()].map((i) => (
            <SplideSlide key={i}>
              <BookCardSkeleton />
            </SplideSlide>
          ))}
        {bookCards.length &&
          bookCards.map((bookCard) => {
            return (
              <SplideSlide key={bookCard.bookId}>
                <BookCard
                  key={bookCard.bookId}
                  title={bookCard.title}
                  price={bookCard.price}
                  imgUrl={bookCard.imgUrl}
                  description={bookCard.description}
                  bookId={bookCard.bookId}
                />
              </SplideSlide>
            );
          })}
      </Splide>
    </section>
  );
};

export default BooksSlider;
