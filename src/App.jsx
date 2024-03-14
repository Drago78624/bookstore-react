import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Root from "./pages/layouts/Root.jsx";
import MainLayout from "./pages/layouts/MainLayout.jsx";
import EmailVerification from "./pages/auth/EmailVerification.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AuthRequired from "./pages/layouts/AuthRequired.jsx";
import LoggedIn from "./pages/layouts/LoggedIn.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import Books from "./pages/books/Books.jsx";
import BookDetail from "./pages/books/BookDetail.jsx";
import Wishlist from "./pages/profile/Wishlist.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route path="" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="book-detail/:bookId" element={<BookDetail />} />
        <Route element={<AuthRequired />}>
          <Route path="profile" element={<Profile />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Route>
      <Route element={<LoggedIn />}>
        <Route path="signin" element={<SignIn />} />,
        <Route path="signup" element={<SignUp />} />,
        <Route path="email-verification" element={<EmailVerification />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
