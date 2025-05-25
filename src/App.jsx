// React utility and Routing stuff
import { useEffect } from "react";
import {
  useMatches,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router";

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

  useEffect(() => {
    document.title = title;
  }, [title]);

  const [isPlaying, setIsPlaying] = useState(true);
  

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
