import App from "../App";
import Posts from "../pages/posts";
import ErrorPage from "../pages/notFound";
import Post from "../pages/post";
import Login from "../pages/Login";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../components/AuthContext";
import Signup from "../pages/Signup";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/posts", element: <Posts /> },
      { path: "/posts/:id", element: <Post /> },
    ],
  },
];


export default routes;
