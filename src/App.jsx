// React utility and Routing stuff
import { useEffect, useState, useRef, createRef } from "react";
import { createRoot } from 'react-dom/client'
import {
  useMatches,
  createBrowserRouter,
  RouterProvider,
  useOutlet,
  useLocation,
} from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
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

const routes = [
  {
    path: "/",
    index: true, // This makes it the default child route
    element: <Home />,
    nodeRef: createRef(),
    handle: {
      title: ".Frostz()",
      nav: "Atif.is()",
      rootClass: "page-home",
    },
  },
  {
    path: "/about",
    element: <About />,
    nodeRef: createRef(),
    handle: {
      title: ".about()",
      nav: "Atif.about()",
      rootClass: "page-about",
    },
  },
  {
    path: "/test",
    element: <Test />,
    nodeRef: createRef(),
    handle: {
      title: ".test()",
      nav: "test()",
      rootClass: "page-test",
    },
  },
  {
    path: "*",
    element: <NotFound />,
    nodeRef: createRef(),
    handle: {
      title: ".404()",
      nav: "404()",
      rootClass: "page-not-found",
    },
  },
]

// Root layout component that contains the consistent UI elements
function RootLayout() {
  const { title, nav, rootClass } = useRouteMetadata();
  const currentOutlet = useOutlet();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const prevPathRef = useRef(location.pathname);
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}

  useEffect(() => {
    document.title = title;
  }, [title]);
  
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
    }, 1500); // Timing should match the exit animation duration
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div id="app" className={rootClass}>
      <NavBar name={nav} />
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={1500}
          classNames="page"
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="pag">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
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
        ...routes,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
