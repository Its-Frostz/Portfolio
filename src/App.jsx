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
// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import NotFound from "./pages/404.jsx";
// import Test from "./pages/Test.jsx";

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

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     // Smoother, more responsive feel
  //     duration: 1.8,
      
  //     // Better easing - feels more natural
  //     easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      
  //     // Mobile optimization
  //     smooth: true,
  //     smoothTouch: true, // Enable smooth scrolling on touch devices
  //     touchMultiplier: 2, // More responsive touch scrolling
  //     infinite: false,
      
  //     // Better performance on mobile
  //     syncTouch: true, // Sync touch events
  //     syncTouchLerp: 0.1, // Smooth lerp for touch
  //     touchInertiaMultiplier: 35, // Natural momentum on mobile
      
  //     // Wheel settings for desktop
  //     wheelMultiplier: 1.2,
  //     normalizeWheel: true,
      
  //     // Performance
  //     autoResize: true,
  //   });
  
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  
  //   requestAnimationFrame(raf);
  
  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2, // Sweet spot for smoothness
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease - no snapping
  //     smooth: true,
  //     smoothTouch: true,
  //     touchMultiplier: 2, // More responsive touch
  //     wheelMultiplier: 1, // Normal wheel sensitivity
  //     threshold: 0, // KEY: Start smoothing from first pixel!
  //     lerp: 0.1, // Linear interpolation - super smooth transitions
  //     infinite: false,
  //     gestureDirection: 'vertical',
  //   });
  
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  
  //   requestAnimationFrame(raf);
  
  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);
  
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.6, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });

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
