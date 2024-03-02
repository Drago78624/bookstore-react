import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import BookDetailSkeleton from "../components/BookDetailSkeleton";
import { AuthContext } from "../contexts/AuthContextProvider";

const BookDetail = () => {
  const { isUserLoggedIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});

  const getBookDetails = async () => {
    setLoading(true);
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);
    setBookDetails(docSnap.data());
    setLoading(false);
  };

  useEffect(() => {
    getBookDetails();
  }, []);
  return (
    <div class="container mx-auto px-4 py-8">
      <div class="card grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {!loading && (
          <>
            <div class="flex items-center justify-center md:justify-start">
              <img
                class="w-full md:w-3/4 rounded-lg"
                src={bookDetails.imgUrl}
                alt="Book Image"
              />
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-2">{bookDetails.title}</h2>
              <p class="text-lg mb-4">{bookDetails.description}</p>
              <div class="flex items-center mb-4">
                <p class="text-xl font-semibold mr-2">
                  Price: ${bookDetails.price?.substr(2)}
                </p>
                <p class="text-sm text-gray-500">{bookDetails.availibility}</p>
              </div>
              {isUserLoggedIn ? (
                <div class="flex gap-2">
                  <button class="btn btn-accent">Add to Cart</button>
                  <button class="btn btn-outline">Add to Wishlist</button>
                </div>
              ) : (
                <div role="alert" className="alert alert-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <Link to="/signin">
                    Sign In to add this book to wishlist and cart
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
        {loading && <BookDetailSkeleton />}
      </div>
    </div>
  );
};

export default BookDetail;
