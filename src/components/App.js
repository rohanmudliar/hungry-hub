import { createBrowserRouter, Outlet } from "react-router-dom";

import Header from "./layout/Header";
import LandingPage from "./landing-page/LandingPage";
import Footer from "./layout/Footer";
import ErrorPage from "./common/ErrorPage";
import ResultsPage from "./results-page/ResultsPage";
import SignIn from "./sign-in/SignIn";
import Cart from "./cart/Cart";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "location/:locationName",
        element: <ResultsPage />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
