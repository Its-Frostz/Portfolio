// React utility and Routing stuff
import { useEffect, useState, createRef, lazy } from "react";
import {
  useMatches,
  createBrowserRouter,
  RouterProvider,
  useOutlet,
  useLocation,
} from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";

// gsap and stuff
import { gsap } from "gsap";
import Lenis from "lenis";

// Page components
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const NotFound = lazy(() => import("./pages/404.jsx"));
const Test = lazy(() => import("./pages/Test.jsx"));

// Static components
import NavBar from "./components/NavBar.jsx";
import Spine from "./components/Spine.jsx";
import Footer from "./components/Footer.jsx";
import pic from "./Assets/me.webp";

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
    element: <About pic={pic}/>,
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
];

// Root layout component that contains the consistent UI elements
function RootLayout() {
  const { title, nav, rootClass } = useRouteMetadata();
  const currentOutlet = useOutlet();
  const location = useLocation();
  const match = routes.find(
    (route) =>
      route.path === location.pathname ||
      (route.path === "*" && !routes.some((r) => r.path === location.pathname))
  );
  const nodeRef = match?.nodeRef || createRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [navLogo, setNavLogo] = useState(".is()");

  useEffect(() => {
    // Initialize Lenis with responsive settings
    const lenis = new Lenis({
      duration: 0.8, // Much faster duration
      easing: (t) => 1 - Math.pow(1 - t, 2), // Simple ease-out quad
      smooth: true,
      smoothTouch: true,
      wheelMultiplier: 1.5, // Faster response to wheel
      touchMultiplier: 2,
      lerp: 0.08, // More responsive interpolation
      infinite: false,
    });
  
    // Simple RAF loop
    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  
    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  const enter = () => {
    document.title = title;
    setNavLogo(nav);
    setIsPlaying(true);

    // Create and clear the timeline
    const tl = gsap.timeline({ paused: false });
    tl.clear();

    // Add label for organization
    tl.addLabel("enter", 0);

    // Add animations with modern object syntax
    tl.fromTo(
      ".header-breadcrumb",
      {
        autoAlpha: 0,
        x: -32,
      },
      {
        duration: 1,
        autoAlpha: 1,
        x: 0,
        ease: "power3.out",
      },
      "enter"
    ).fromTo(
      ".transition-container",
      {
        autoAlpha: 0,
      },
      {
        duration: 2,
        autoAlpha: 1,
      },
      "enter"
    ); // Using the label as a position reference
  };

  const leave = () => {
    // Create and clear the timeline with modern syntax
    const tl = gsap.timeline();
    tl.clear();

    // Add label for organization
    tl.addLabel("leave", 0);

    // Add animations with modern object syntax
    tl.to(
      ".header-breadcrumb",
      {
        duration: 1,
        autoAlpha: 0,
        x: -32,
        ease: "power3.out",
      },
      "leave"
    ).to(
      ".transition-container",
      {
        duration: 1,
        autoAlpha: 0,
      },
      "leave"
    ); // Using the label as a position reference

    setIsPlaying(false);
  };

  useEffect(() => {
    enter();
  }, []);

  return (
    <div id="app" className={rootClass}>
      <NavBar name={navLogo} />
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={1500}
          classNames="page"
          onEnter={enter}
          onExit={leave}
          unmountOnExit
        >
          {(state) => (
            <div ref={nodeRef} className="transition-container">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
      <Spine isPlaying={isPlaying} />
      <Footer />
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [...routes],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
