import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Root from "./pages/Root.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route path="" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="signin" element={<SignIn />} />,
      <Route path="signup" element={<SignUp />} />,
      <Route path="email-verification" element={<EmailVerification />} />,
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
