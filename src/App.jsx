// React utility and Routing stuff
import { useEffect, useState, useRef } from "react";
import {
  useMatches,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router";
import { CSSTransition } from "react-transition-group";
import { gsap } from "gsap";

// Page components
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/404.jsx";
import Test from "./pages/Test.jsx";

// Static components
import NavBar from "./components/NavBar.jsx";
import Spine from "./components/Spine.jsx";
import Footer from "./components/Footer.jsx";

// SCSS
import "./css/App.scss";

function useRouteMetadata() {
  const matches = useMatches();
  const match = matches.find((m) => m.handle);
  return {
    title: match?.handle?.nav || "404()",
    nav: match?.handle?.title || "404()",
    rootClass: match?.handle?.rootClass || "",
  };
}

// Root layout component that contains the consistent UI elements
function RootLayout() {
  const { title, nav, rootClass } = useRouteMetadata();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    document.title = title;
  }, [title]);
  
  // Simple and reliable page transition logic
  useEffect(() => {
    // Skip on initial render
    if (prevPathRef.current === location.pathname) {
      return;
    }
    
    // Update the previous path reference
    prevPathRef.current = location.pathname;
    
    // Start exit animation
    setIsPlaying(false);
    
    // After the exit animation completes, set isPlaying back to true for entrance animation
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 800); // Timing should match the exit animation duration
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div id="app" className={rootClass}>
      <NavBar name={nav} />
      <Outlet /> {/* Child routes render here */}
      <Spine isPlaying={isPlaying}/>
      <Footer />
    </div>
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
            title: ".Frostz()",
            nav: "Atif.is()",
            rootClass: "page-home",
          },
        },
        {
          path: "/about",
          element: <About />,
          handle: {
            title: ".about()",
            nav: "Atif.about()",
            rootClass: "page-about",
          },
        },
        {
          path: "/test",
          element: <Test />,
          handle: {
            title: ".test()",
            nav: "test()",
            rootClass: "page-test",
          },
        },
        {
          path: "*",
          element: <NotFound />,
          handle: {
            title: ".404()",
            nav: "404()",
            rootClass: "page-not-found",
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
