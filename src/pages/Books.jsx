import React, { useEffect, useState } from "react";
import UserInput from "../components/UserInput";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BookCard from "../components/BookCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import BookCardSkeleton from "../components/BookCardSkeleton";

const formSchema = yup.object().shape({
  userSearch: yup.string().required("Please enter a title, author or genre"),
});

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const searchHandler = (data) => {
    console.log(data);
  };

  const getAllBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const fetchedBooks = querySnapshot.docs.map((doc) => doc.data());
    setAllBooks(fetchedBooks);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <section className="p-2 container mx-auto">
      <h2 className="font-semibold text-3xl my-4">EXPLORE BOOKS</h2>
      <form onSubmit={handleSubmit(searchHandler)}>
        <UserInput
          placeholder="Search title, author or genre"
          type="text"
          register={register}
          registerWith="userSearch"
          error={errors.userSearch}
          icon={<FaMagnifyingGlass />}
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Filter</span>
          </div>
          <select className="select select-bordered">
            <option selected>Popularity</option>
            <option>Price</option>
            <option>Release Date</option>
          </select>
        </label>
      </form>
      {/* {!allBooks.length && <div className="w-full min-h-96 flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
        </div>} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {!allBooks.length &&
          [...Array(10).keys()].map((i) => (
            <BookCardSkeleton />
          ))}
        {allBooks.length &&
          allBooks.map((book) => {
            return (
              <BookCard
                key={book.bookId}
                title={book.title}
                imgUrl={book.imgUrl}
                description={book.description}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Books;
