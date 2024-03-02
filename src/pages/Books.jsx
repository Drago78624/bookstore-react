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
  searchTerm: yup.string().required("Please enter a title, author or genre"),
});

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const {
    register,
    handleSubmit,
    watch,
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

  // useEffect(() => {
  //   const searchTerm = watch("searchTerm");

  //   const filtered = allBooks.filter((book) =>
  //     book.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredBooks(filtered);
  // }, [watch("searchTerm"), allBooks]);

  useEffect(() => {
    const searchTerm = watch("searchTerm");
    console.log(searchTerm);
    const filtered = allBooks.filter((book) => {
      const titleMatch = book.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      let priceMatch = true;
      if (selectedPriceFilter !== "all") {
        const priceRange = selectedPriceFilter.split("-");
        const minPrice = parseFloat(priceRange[0]);
        const maxPrice = parseFloat(priceRange[1]);
        const bookPrice = Number(book.price.substr(2));
        priceMatch = bookPrice >= minPrice && bookPrice <= maxPrice;
      }

      return titleMatch && priceMatch;
    });
    // console.log(filtered)
    setFilteredBooks(filtered);
  }, [watch("searchTerm"), allBooks, selectedPriceFilter]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const handlePriceFilterChange = (event) => {
    setSelectedPriceFilter(event.target.value);
  };

  return (
    <section className="p-2 container mx-auto">
      <h2 className="font-semibold text-3xl my-4">EXPLORE BOOKS</h2>
      <form onSubmit={handleSubmit(searchHandler)}>
        {/* <input type="text" value={searchTerm} onChange={searchHandler} /> */}
        <UserInput
          placeholder="Search title, author or genre"
          type="text"
          register={register}
          registerWith="searchTerm"
          error={errors.searchTerm}
          icon={<FaMagnifyingGlass />}
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <select
            value={selectedPriceFilter}
            onChange={handlePriceFilterChange}
            className="select select-bordered"
          >
            <option value="all">All Prices</option>
            <option value="0-25">$0 - $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50-100">$50 - $100</option>
            {/* <option>Ascending</option>
            <option>Descending</option> */}
          </select>
        </label>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {!allBooks.length &&
          [...Array(12).keys()].map((i) => <BookCardSkeleton key={i} />)}
        {filteredBooks.length === 0
          ? allBooks.map((book) => {
              return (
                <BookCard
                  key={book.bookId}
                  title={book.title}
                  price={book.price}
                  imgUrl={book.imgUrl}
                  description={book.description}
                  bookId={book.bookId}
                />
              );
            })
          : filteredBooks.map((book) => (
              <BookCard
                key={book.bookId}
                title={book.title}
                price={book.price}
                imgUrl={book.imgUrl}
                description={book.description}
                bookId={book.bookId}
              />
            ))}
      </div>
    </section>
  );
};

export default Books;
