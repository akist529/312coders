import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discord from "./components/Discord";

import Community from "./components/Community";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute';
import AdminPostsPage from './pages/AdminPostsPage';
import PostEditPage from './pages/PostEditPage';
import { api } from "./api";
import { AlertContextProvider } from "./hooks/useAlert";
import Alert from "./components/Alert";
import PostPreviewPage from "./pages/PostPreviewPage";

const Layout = () => {
  return (
    <AlertContextProvider>
      <Navbar />
      <main>
        <Outlet />
        <Alert />
      </main>
      <Footer />
    </AlertContextProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/community",
        element: <Community />
      },
      {
        path: "/discord",
        element: <Discord />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/blog",
        children: [
          {
            path: "admin-posts",
            element:
              <ProtectedRoute>
                <AdminPostsPage />
              </ProtectedRoute>,
            loader: async () => {
              return await api.blog.getPosts();
            }
          },
          {
            path: "edit/:id",
            element:
              <ProtectedRoute>
                <PostEditPage />
              </ProtectedRoute>,
            loader: async ({ params }) => {
              if (params.id) {
                return await api.blog.getPost(params.id ?? '');
              } else {
                return null;
              }
            },
          },
          {
            path: "post/:id",
            element: <PostPreviewPage />,
            loader: async ({ params }) => {
              if (params.id) {
                return await api.blog.getPost(params.id ?? '');
              } else {
                return null;
              }
            },
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
