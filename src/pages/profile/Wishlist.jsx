import React, { useContext, useEffect, useState } from "react";
import WishlistItemCard from "../../components/wishlist/WishlistItemCard";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { AuthContext } from "../../contexts/AuthContextProvider";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userUid } = useContext(AuthContext);

  const getWishlistItems = async () => {
    // const wishlistRef = collection(db, "wishlist");
    // const q = query(wishlistRef, where("uid", "==", userUid));
    
    // const querySnapshot = await getDocs(q);
    // const fetchedWishlistItems = querySnapshot.docs.map((doc) => doc.data());
    // setWishlistItems(fetchedWishlistItems);
    // setLoading(false);
  };

  useEffect(() => {
    // getWishlistItems();
    const wishlistRef = collection(db, "wishlist");
    const q = query(wishlistRef, where("uid", "==", userUid));
    setLoading(true)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedWishlistItems = querySnapshot.docs.map((doc) => doc.data());
      setWishlistItems(fetchedWishlistItems);
      setLoading(false)
    });
    return unsubscribe
  }, []);
  return (
    <div className="p-2 container max-w-[992px] mx-auto">
      <h1 className="text-3xl font-bold mb-8 mt-4">Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && "loading..."}
        {wishlistItems.length === 0 && !loading && <h1>No books found</h1>}
        {wishlistItems.length > 0 &&
          wishlistItems.map((wishlistItem) => {
            return (
              <WishlistItemCard
                key={wishlistItem.bookId}
                title={wishlistItem.title}
                price={wishlistItem.price}
                coverImgUrl={wishlistItem.coverImgUrl}
                bookId={wishlistItem.bookId}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Wishlist;
