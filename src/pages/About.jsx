// React and util 
import { useEffect, useState } from 'react';
import { fetchData, iconMap } from '@/utils.jsx'

// Utility Components
import TextBlock from '../components/TextBlock'

// SCSS
import '../css/pages/About.scss'

export default function About() {

  const [jsonData, setJsonData] = useState({})

  useEffect(() => {

    const loadData = async () => { // Renamed 'fetch' to avoid conflict with window.fetch if ever an issue
      try {
        const data = await fetchData();
        if (data) { // Good practice to check if data exist
          setJsonData(data);
        } else {
          setJsonData([]); // Set to empty array if data is not as expected
          console.warn("Fetched data or data.links is missing.");
        }
        // console.log(data); // You can keep this for debugging
      } catch (error) {
        console.error('Error fetching data:', error);
        setJsonData([]); // Set to empty array on error
      }
    };
    loadData();
  }, []);

  return (
    <div id="about" className="wrapper">
      <div className="pic"></div>
      <div className="static-container">
        <h1 className="title">about(<span className="params">Atif</span>)</h1>

        <TextBlock>
          <div className="first-fold">
            {jsonData.links && (
              <ul className="about-contact">
                {jsonData.links.map((link) => {
                  const IconComponent = iconMap[link.icon];
                  return (
                    <li key={`${link.url}`}>
                      <a href={`${link.url}`} title={`${link.title}`} target="_blank" rel="noopener noreferrer">
                        {(link.icon && <IconComponent />) || link.title}
                      </a>
                    </li>
                  );
                })}
                <li></li>
              </ul>
            )}
          </div>
        </TextBlock>
      </div>
    </div>
  )
}
