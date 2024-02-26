import React from "react";
import UserInput from "../components/UserInput";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BookCard from "../components/BookCard";

const formSchema = yup.object().shape({
  userSearch: yup.string().required("Please enter a title, author or genre"),
});

const Books = () => {
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
            <option selected>
              Popularity
            </option>
            <option>Price</option>
            <option>Release Date</option>
          </select>
        </label>
      </form>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </section>
  );
};

export default Books;
