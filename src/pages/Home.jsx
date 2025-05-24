// Gsap and stuff
import { useGSAP } from "@gsap/react";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// React and stuff
import { useEffect, useState } from "react";

// Utility components
import GapBlock from "../components/GapBlock.jsx";
import TitleFunction from "../components/TitleFunction.jsx";
import TitleSection from "../components/TitleSection.jsx";

// Home components
import Intro from "../components/Home/Intro.jsx";
import Wrapper from "../components/Wrapper.jsx";

// SCSS
import "../css/pages/Home.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isPlaying, setIsPlaying] = useState({
    Potion: false,
  });

  const togglePlaying = (trackName) => {
    setIsPlaying((prev) => ({
      ...prev,
      [trackName]: !prev[trackName],
    }));
  };
  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  const sceneRefs = {
    wrapper: {
      id: "#thanks",
      Toon: "Potion",
      start: "top bottom",
      end: "bottom top",
      element: document.getElementById("thanks"),
    },
  };

  const setUpScene = () => {
    Object.entries(sceneRefs).forEach(([sceneId, ref]) => {
      ScrollTrigger.create({
        trigger: ref.id,
        start: ref.start,
        end: ref.end,
        onEnter: () => togglePlaying(ref.Toon),
        onLeave: () => togglePlaying(ref.Toon),
        onLeaveBack: () => togglePlaying(ref.Toon),
        markers: true,
        // onToggle: (self) => {
        //   ref.element.classList.toggle("active", self.isActive);
        // },
      });
    });
    //Can do something else with the element as well though
  }

  const playIntroScene = () => {
    gsap
      .timeline()
      .from(
        "#intro .title",
        2,
        {
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
          ease: Power3.easeOut,
        },
        "enter"
      )
      .from(
        "#intro .std",
        2,
        {
          autoAlpha: 0,
          x: -32,
          ease: Power3.easeOut,
        },
        "enter+=1.5"
      );
  };

  useEffect(() => {
    setUpScene();
  }, []);

  useGSAP(() => {
    playIntroScene();
  }, []);

  return (
    <div id="home" className="wrapper">
      <Intro />
      <GapBlock />

      <TitleSection name="curriculum">
        <TitleFunction params="/_life/..." subtitle="<VitaeJournal>">
          Summarization
        </TitleFunction>
      </TitleSection>

      <TitleSection name="Scene1">
        <TitleFunction
          purple=".Wings"
          params="2007"
          subtitle="The journey begins... Enjoy ;)"
        >
          Player
        </TitleFunction>
      </TitleSection>
      <Wrapper isPotionPlaying={isPlaying.Potion} onRef={sceneRefs.wrapper.element} />
    </div>
  );
}
