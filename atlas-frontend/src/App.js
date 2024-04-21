import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./style.scss";
import OAuth2RedirectHandler from "./pages/login/oauth2/OAuth2RedirectHandler";
import Navbar from "./components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ACCESS_TOKEN } from "./constants";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const token = localStorage.getItem(ACCESS_TOKEN);

  const Layout = () => {
    return (
      <div className={`theme-light`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!token && !isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUser());
    }
  }, [isLoggedIn, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/oauth2/redirect",
      element: <OAuth2RedirectHandler />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
