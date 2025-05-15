import React from 'react'
import TextBlock from '../components/TextBlock'
import Github from '../components/Icons/Github';
import Instagram from '../components/Icons/Instagram';

import '../css/pages/About.scss'

const links = [
  {
    title: "instagram",
    url: "https://www.instagram.com/signior_atif/",
    icon: Instagram,
  },
  {
    title: "github",
    url: "https://github.com/Its-Frostz",
    icon: Github,
  },
];

export default function About() {
  return (
    <div id="about" className="wrapper">
      <div className="pic"></div>
      <div className="static-container">
        <h1 className="title">about(<span className="params">Atif</span>)</h1>

        <TextBlock>
          <div className="first-fold">
            <ul className="about-contact">
              {links.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={`${link.url}`}>
                    <a href={`${link.url}`} title={`${link.title}`} target="_blank">
                      {(link.icon && <IconComponent />) || link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </TextBlock>
      </div>
    </div>
  )
}
