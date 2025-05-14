import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import NavBar from './components/NavBar.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/404.jsx'
import Spine from './components/Spine.jsx'
import Footer from './components/Footer.jsx'
import { useMatches } from 'react-router'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router";
import './css/App.scss'

function useRouteMetadata() {
  const matches = useMatches();
  const match = matches.find(m => m.handle);
  return {
    title: match?.handle?.nav || '404()',
    nav: match?.handle?.title || '404()'
  };
}

// Root layout component that contains the consistent UI elements
function RootLayout() {
  const { title, nav } = useRouteMetadata();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <NavBar name={nav}/>
      <Outlet /> {/* Child routes render here */}
      <Spine />
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
          handle: {
            title: '.Frostz()',
            nav: 'Atif.is()',
          },
          // name: ".Frostz()",
        },
        {
          path: "/about",
          element: <About />,
          handle: {
            title: '.about()',
            nav: 'Atif.about()',
          },
          // name: ".about()",
        },
        {
          path: "*",
          element: <NotFound />,
          handle: {
            title: '.404()',
            nav: '404()',
          },
          // name: "",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App