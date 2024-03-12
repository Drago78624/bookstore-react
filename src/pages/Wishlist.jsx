import React, { useContext, useEffect, useState } from "react";
import WishlistItemCard from "../components/WishlistItemCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { AuthContext } from "../contexts/AuthContextProvider";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { userUid } = useContext(AuthContext);

  const getWishlistItems = async () => {
    const wishlistRef = collection(db, "wishlist");
    const q = query(wishlistRef, where("uid", "==", userUid));
    const querySnapshot = await getDocs(q);
    const fetchedWishlistItems = querySnapshot.docs.map((doc) => doc.data());
    setWishlistItems(fetchedWishlistItems);
  };

  useEffect(() => {
    getWishlistItems()
  }, [])
  return (
    <div class="p-2 container max-w-[992px] mx-auto">
      <h1 class="text-3xl font-bold mb-8 mt-4">Wishlist</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.length === 0 && "loading..."}
        {wishlistItems.length > 0 &&
          wishlistItems.map((wishlistItem) => {
            return <WishlistItemCard key={wishlistItem.bookId} title={wishlistItem.title} price={wishlistItem.price} coverImgUrl={wishlistItem.coverImgUrl} bookId={wishlistItem.bookId} />;
          })}
      </div>
    </div>
  );
};

export default Wishlist;
