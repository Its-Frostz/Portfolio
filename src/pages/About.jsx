// React and util
import { useEffect, useState } from "react";
import { fetchData, iconMap } from "@/utils.jsx";

// Gsap and stuff
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// Utility Components
import TextBlock from "../components/TextBlock";
import Wrapper from "../components/Wrapper";

// SCSS
import "../css/pages/About.scss";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [jsonData, setJsonData] = useState({});
  const [currentHumor, setCurrentHumor] = useState("");

  // Function to generate random number between 1 and max (inclusive)
  const getRandomItem = (array) => {
    if (!array || array.length === 0) return "";
    return array[Math.floor(Math.random() * array.length)];
  };

  const playIntro = () => {
    gsap
      .timeline()
      .addLabel("enter", 1)
      .from(
        ".title",
        {
          duration: 2,
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
          ease: "power3.out",
        },
        "enter"
      )
      .from(
        ".std",
        {
          duration: 2,
          autoAlpha: 0,
          x: -32,
          ease: "power3.out",
        },
        "enter+=1.5"
      );
  };

  const playHeaderBg = () => {
    const duration = window.innerHeight;

    gsap.to(".header-bg", {
      autoAlpha: 1,
      duration: 4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#about",
        start: `top+=${duration} bottom`,
        end: `+=${duration}`,
        marker: true,
        scrub: true,
      },
    });
  };

  useGSAP(() => {
    const loadData = async () => {
      // Renamed 'fetch' to avoid conflict with window.fetch if ever an issue
      try {
        const data = await fetchData();
        if (data) {
          // Good practice to check if data exist
          setJsonData(data);
        } else {
          setJsonData([]); // Set to empty array if data is not as expected
          console.warn("Fetched data or data.links is missing.");
        }
        // console.log(data); // You can keep this for debugging
      } catch (error) {
        console.error("Error fetching data:", error);
        setJsonData([]); // Set to empty array on error
      }
    };
    loadData();
    playIntro();
    playHeaderBg();
  });

  // useEffect(() => {
  //   if (!jsonData.humour || jsonData.humour.length === 0) return;

  //   const interval = setInterval(() => {
  //     setCurrentHumor(getRandomItem(jsonData.humour));
  //   }, 8000); // Change every 3 seconds

  //   // Clean up interval on component unmount
  //   return () => clearInterval(interval);
  // }, [jsonData.humour]);

  return (
    <div id="about" className="wrapper">
      <div className="pic"></div>
      <div className="static-container">
        <h1 className="title">
          about(<span className="params">Atif</span>)
        </h1>
        <TextBlock>
          {jsonData.links && (
            <>
              <div className="first-fold">
                <ul className="about-contact">
                  {jsonData.links.map((link, i) => {
                    const IconComponent = iconMap[link.icon];
                    return (
                      <li key={i}>
                        <a
                          href={`${link.url}`}
                          title={`${link.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {IconComponent ? <IconComponent /> : link.title}
                        </a>
                      </li>
                    );
                  })}
                  <li>
                    Maybe Someday...
                    <a disabled target="_blank" className="bt">
                      CV
                      {(() => {
                        const CvIcon = iconMap["CV"];
                        return CvIcon ? <CvIcon /> : "";
                      })()}
                    </a>
                  </li>
                </ul>
                <p className="-purple">
                  {jsonData.description.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                  {/* {currentHumor && (
                  <span>
                    {currentHumor}
                    <br />
                  </span>
                )} */}
                </p>
                <p className="-gray">
                  {jsonData.subtitles.map((subtitle, i) => (
                    <span key={i}>
                      {"// " + subtitle}
                      <br />
                    </span>
                  ))}
                  {/* // Digital Craftsman | Shaping pixels into poetry */}
                  //{" "}
                  {jsonData.currentPosition[0].title +
                    ` @ ` +
                    jsonData.currentPosition[0].institution}
                </p>
              </div>
              <div className="about-grid">
                <h2>Main skills</h2>
                <div className="columns fluent">
                  <ul>
                    {jsonData.languages.map((languages, i) => (
                      <li key={i}>
                        <h2>{jsonData.skills[i]}</h2>
                        {languages.join(", ")}
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
                <h2>Languages</h2>
                <div className="columns languages">
                  <ul>
                    {Object.entries(jsonData.languagesSpoken).map(
                      ([level, langs], i) => (
                        <li key={i}>
                          <span className="-comment">// {level}</span>
                          <br />
                          {langs.map(([abbribiation, label], j) => (
                            <span key={j}>
                              <em className="-purple">{abbribiation}</em>{" "}
                              {label}
                              <br />
                            </span>
                          ))}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <h2>Also busy with</h2>
                <div className="columns busy">
                  <ul>
                    {jsonData.busy.map((busy, i) => (
                      <li key={i}>{busy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </TextBlock>
      </div>
      <Wrapper />
    </div>
  );
}
