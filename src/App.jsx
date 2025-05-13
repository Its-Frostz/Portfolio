import { useState } from 'react'
import Home from './pages/Home.jsx'
import NavBar from './components/NavBar.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/404.jsx'
import Footer from './components/Footer.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router";

// Root layout component that contains the consistent UI elements
function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet /> {/* Child routes render here */}
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true, // This makes it the default child route
          element: <Home />,
          // name: ".Frostz()",
        },
        {
          path: "/about",
          element: <About />,
          // name: ".about()",
        },
        {
          path: "*",
          element: <NotFound />,
          // name: "",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App