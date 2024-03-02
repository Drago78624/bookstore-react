import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import BookDetailSkeleton from "../components/BookDetailSkeleton";

const BookDetail = () => {
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
            <div class="p-4">
              <h2 class="text-2xl font-bold mb-2">{bookDetails.title}</h2>
              <p class="text-lg mb-4">{bookDetails.description}</p>
              <div class="flex items-center mb-4">
                <p class="text-xl font-semibold mr-2">
                  Price: ${bookDetails.price?.substr(2)}
                </p>
                <p class="text-sm text-gray-500">{bookDetails.availibility}</p>
              </div>
              <div class="flex gap-2">
                <button class="btn btn-accent">Add to Cart</button>
                <button class="btn btn-outline">Add to Wishlist</button>
              </div>
            </div>
          </>
        )}
        {loading && <BookDetailSkeleton />}
      </div>
    </div>
  );
};

export default BookDetail;
