// import React from "react";

import { NavLink } from "react-router";
import "../css/Components/NavBar.scss";
import Github from "./Icons/Github.jsx";
import Instagram from "./Icons/Instagram.jsx";

export default function NavBar(props) {
  const handleToggleNav = () => {
    const isCurrentlyOpen = document.body.classList.contains("is-nav-open");

    if (isCurrentlyOpen) {
      console.log("close")
      document.body.classList.remove("is-nav-open");
    } else {
      console.log("open")
      document.body.classList.add("is-nav-open");
    }
  };
  const items = [
    {
      title: "github",
      url: "https://github.com/Its-Frostz",
      icon: Github,
    },
    {
      title: "instagram",
      url: "https://www.instagram.com/signior_atif/",
      icon: Instagram,
    },
  ];
  return (
    <>
      <header id="header">
        <div className="header-bg"></div>

        <div className="header-container">
          <div className="header-breadcrumb">{props.name}</div>

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
                <NavLink to={"/"} end className={({ isActive }) => (isActive ? 'router-link-exact-active' : '')}>.is()</NavLink>
              </li>
              <li>
                <NavLink to={"/about"} end className={({ isActive }) => (isActive ? 'router-link-exact-active' : '')}>.about()</NavLink>
              </li>
              <li>
                <a
                  href="mailto:yupthisisfrostz@gmail.com"
                  title="Send me an email"
                >
                  .email()
                </a>
              </li>
              {items.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.url} className="social-link">
                    <a href={`${link.url}`} title={link.title} target="_blank">
                      {(link.icon && <IconComponent />) || link.title}
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
// NavBar.prototype = {
//     name: PropTypes.string
// }

// NavBar.defaultProps = {
//     name: ".Frostz()"
// }
