// React and util
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { fetchData, iconMap, startProgress } from "@/utils.jsx";

// SCSS
import "../css/Components/NavBar.scss";

export default function NavBar({ name }) {
  const handleToggleNav = () => {
    const isCurrentlyOpen = document.body.classList.contains("is-nav-open");

    if (isCurrentlyOpen) {
      document.body.classList.remove("is-nav-open");
    } else {
      document.body.classList.add("is-nav-open");
    }
  };

  const [links, setLinks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Renamed 'fetch' to avoid conflict with window.fetch if ever an issue
      try {
        const data = await fetchData();
        if (data && data.links) {
          // Good practice to check if data and data.links exist
          setLinks(data.links);
        } else {
          setLinks([]); // Set to empty array if data is not as expected
          console.warn("Fetched data or data.links is missing.");
        }
        // console.log(data); // You can keep this for debugging
      } catch (error) {
        console.error("Error fetching data:", error);
        setLinks([]); // Set to empty array on error
      }
    };
    loadData();
  }, []);

  return (
    <>
      <header id="header">
        <div className="header-bg"></div>

        <div className="header-container">
          <div className="header-breadcrumb">{name}</div>

          <button
            title="Open menu"
            type="button"
            className="header-nav-button"
            onClick={handleToggleNav}
          >
            <span className="label">Menu</span>

            <span className="dots d1"></span>
            <span className="dots d2"></span>
            <span className="dots d3"></span>
          </button>

          <nav className="header-nav">
            <button
              title="Close menu"
              type="button"
              className="header-nav-close-button"
              onClick={handleToggleNav}
            >
              <span className="label">✕</span>
            </button>
            <ul>
              <li>
                <NavLink
                  to={"/"}
                  end
                  className={({ isActive }) =>
                    isActive ? "router-link-exact-active" : ""
                  }
                  onClick={() => {
                    handleToggleNav();
                    startProgress();
                  }}
                >
                  .is()
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  end
                  className={({ isActive }) =>
                    isActive ? "router-link-exact-active" : ""
                  }
                  onClick={() => {
                    handleToggleNav();
                    startProgress();
                  }}
                >
                  .about()
                </NavLink>
              </li>
              <li>
                <a
                  href="mailto:yupthisisfrostz@gmail.com"
                  title="Send me an email"
                >
                  .email()
                </a>
              </li>
              {links &&
                links.map((link) => {
                  const IconComponent = iconMap[link.icon];
                  return (
                    <li key={link.url} className="social-link">
                      <a
                        href={`${link.url}`}
                        title={link.title}
                        target="_blank"
                      >
                        {IconComponent ? <IconComponent /> : link.title}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
