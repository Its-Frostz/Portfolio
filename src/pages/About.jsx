// React and util
import { useEffect, useState } from "react";
import { fetchData, iconMap } from "@/utils.jsx";

// Utility Components
import TextBlock from "../components/TextBlock";
import Wrapper from "../components/Wrapper";

// SCSS
import "../css/pages/About.scss";

export default function About() {
  const [jsonData, setJsonData] = useState({});
  const [currentHumor, setCurrentHumor] = useState('');

  // Function to generate random number between 1 and max (inclusive)
  const getRandomItem = (array) => {
    if (!array || array.length === 0) return '';
    return array[Math.floor(Math.random() * array.length)];
  };
  useEffect(() => {
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
  }, []);

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
        {jsonData.links && (
          <TextBlock>
            <div className="first-fold">
                  <ul className="about-contact">
                    {jsonData.links.map((link) => {
                      const IconComponent = iconMap[link.icon];
                      return (
                        <li key={`${link.url}`}>
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
                  <p class="-gray">
                    {jsonData.subtitles.map((subtitle, i) => (
                      <span key={i}>
                        {"// " + subtitle}
                        <br />
                      </span>
                    ))}
                    {/* // Digital Craftsman | Shaping pixels into poetry */}
                    // {jsonData.currentPosition[0].title+` @ `+jsonData.currentPosition[0].institution}
                  </p>
            </div>
            <div class="about-grid">
              <h2>Main skills</h2>
              <div class="columns fluent">
                <ul>
                  {jsonData.languages.map((languages, i) => (
                    <>
                      <li key={i}>
                        <h2>{jsonData.skills[i]}</h2>
                        {languages.join(", ")}
                        <br/>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </TextBlock>
        )}
      </div>
      <Wrapper/>
    </div>
  );
}
