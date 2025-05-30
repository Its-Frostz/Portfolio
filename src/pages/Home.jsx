// React and stuff
import { useEffect, useState } from "react";
import { completeProgress } from "@/utils.jsx";
import { SCENE_REFS_SVG, SCENE_REFS } from "@/Constants.jsx";

// Gsap and stuff
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Utility components
import GapBlock from "../components/GapBlock.jsx";
import TitleFunction from "../components/TitleFunction.jsx";
import TitleSection from "../components/TitleSection.jsx";

// Home components
import Intro from "../components/Home/Intro.jsx";
import Wrapper from "../components/Wrapper.jsx";
import Backtrace from "../components/Home/Backtrace.jsx";

//Timelines
import { playIntroScene } from "./TimeLines/IntroTL.jsx";
import { curriculumScene } from "./TimeLines/CurriculamTL.jsx";
import { backtraceTitle, backtraceMonsier, backtraceEverybody, backtraceEnding } from "./TimeLines/BacktraceTL.jsx";

// SCSS
import "../css/pages/Home.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  /* SVG CONTROLLERS */

  // Track animation states for different components
  const [isPlaying, setIsPlaying] = useState({
    Potion: false,
    Backtrace: false,
  });

  const togglePlayingTrue = (trackName) => {
    setIsPlaying((prevState) => ({
      ...prevState,
      [trackName]: true,
    }));
  };
  const togglePlayingFalse = (trackName) => {
    setIsPlaying((prevState) => ({
      ...prevState,
      [trackName]: false,
    }));
  };

  // !Define scroll-triggered animation scenes
  useEffect(() => {
    // Store all scroll triggers for cleanup
    const triggers = [];

    const setUpSceneSVG = () => {
      Object.entries(SCENE_REFS_SVG).forEach(([sceneId, ref]) => {
        const element = document.getElementById(ref.id.replace("#", ""));

        const trigger = ScrollTrigger.create({
          trigger: ref.id,
          start: ref.start,
          end: ref.end,
          onEnter: () => togglePlayingTrue(ref.Toon),
          onEnterBack: () => togglePlayingTrue(ref.Toon),
          onLeave: () => togglePlayingFalse(ref.Toon),
          onLeaveBack: () => togglePlayingFalse(ref.Toon),
          // markers: true, // Visual markers for debugging (can be disabled in production)
          onToggle: (self) => {
            // Toggle 'active' class based on scroll position
            if (element) {
              element.classList.toggle("active", self.isActive);
            }
          },
        });
        triggers.push(trigger);
      });
      //Can do something else with the element as well though
    };
    setUpSceneSVG();

    // Cleanup function to kill all scroll triggers on component unmount
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  // !Other Animations
  const timelines = {};

  const setUpScene = () => {
    Object.entries(SCENE_REFS).forEach(([sceneId, ref]) => {
      const element = document.getElementById(ref.id.replace("#", ""));

      const timeLine = gsap.timeline({
        scrollTrigger: {
          trigger: ref.id,
          start: () => {
            return ref.start ? ref.start : "top bottom";
          },
          end: () => {
            return ref.end ? ref.end : "bottom bottom";
          },
          scrub: ref.scrub,
          // markers: true, // For debugging purposes
          onToggle: (self) => {
            // Toggle 'active' class based on scroll position
            if (element) {
              element.classList.toggle("active-scene", self.isActive);
            }
          },
        },
      });
      timelines[sceneId] = timeLine;
    });
  };

  // Initialize GSAP animations on component mount
  useGSAP(() => {
    playIntroScene();//Intro
    completeProgress();//Progress bar
    setUpScene();//Scroll triggers
    curriculumScene(timelines.curriculum);//Curriculum
    backtraceTitle(timelines.backtraceTitle);//Backtrace
    backtraceMonsier(timelines.backtraceMonsier);//Backtrace
    backtraceEverybody(timelines.backtraceEverybody);//Backtrace
    backtraceEnding(timelines.backtraceEnding);//Backtrace
  }, []);

  return (
    <div id="home" className="wrapper">
      <Intro />
      <GapBlock />

      <TitleSection name="curriculum">
        <TitleFunction params="/_life/..." subtitle="<VitaeJournal/>">
          Summarization
        </TitleFunction>
      </TitleSection>

      <Backtrace isBacktracePlaying={isPlaying.Backtrace} />
      <Wrapper isPotionPlaying={isPlaying.Potion} />
    </div>
  );
}
