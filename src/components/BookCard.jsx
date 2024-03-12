import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const BookCard = ({ title, price, imgUrl, description, bookId }) => {
  const { isUserLoggedIn, userUid } = useContext(AuthContext);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const docRef = doc(db, "wishlist", bookId);

  const addToWishlist = async () => {
    console.log(alreadyAdded);
    if (alreadyAdded) {
      await deleteDoc(docRef);
      setAlreadyAdded(false)
    } else {
      await setDoc(doc(db, "wishlist", bookId), {
        bookId,
        title,
        price,
        coverImgUrl: imgUrl,
        uid: userUid,
      });
      setAlreadyAdded(true)
    }
  };

  const checkingWishlistStatus = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAlreadyAdded(true);
    } else {
      setAlreadyAdded(false);
    }
  };

  useEffect(() => {
    checkingWishlistStatus();
  }, []);

  return (
    <div className="card w-full max-w-72 shadow-md rounded-lg overflow-hidden mx-auto my-4">
      <img
        src={imgUrl}
        alt="Book cover"
        className="w-full h-48 object-contain rounded-t-lg"
      />
      <div className="card-body p-4 flex flex-col justify-between">
        <div className="text-center">
          <Link
            to={`/book-detail/${bookId}`}
            className="block card-title font-bold text-lg"
          >
            {title.substr(0, 26)}
            {title.length > 26 && "..."}
          </Link>
          <p className=" mb-2">${price.substr(2)}</p>
          <p className="mb-2">{description.substr(0, 52) + "..."}</p>
          {/* <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div> */}
        </div>
        {isUserLoggedIn && (
          <div className="flex justify-between items-center">
            <button className="btn btn-accent btn-sm">
              <FaCartPlus />
              Add to cart
            </button>
            <button
              className={`btn ${
                alreadyAdded ? "" : "btn-outline"
              } btn-error btn-sm`}
              onClick={addToWishlist}
            >
              <FaHeart />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
