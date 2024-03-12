import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

const WishlistItemCard = ({ title, price, coverImgUrl, bookId }) => {
  const deleteFromWishlist = async () => {
    const docRef = doc(db, "wishlist", bookId);

    await deleteDoc(docRef);
  };

  return (
    <div class="card rounded-lg shadow-md bg-base-100">
      <figure class="px-4 pt-4">
        <img src={coverImgUrl} alt="Book Cover" class="rounded-lg w-32" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-base font-bold">{title}</h2>
        <div class="flex items-center justify-between mt-4">
          <span class="badge badge-accent">${price.substr(2)}</span>
          <button class="btn btn-outline btn-error btn-sm" onClick={deleteFromWishlist}>
            <FaTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItemCard;
