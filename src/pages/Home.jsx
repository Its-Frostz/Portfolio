// React and stuff
import { useEffect, useState } from "react";
import { completeProgress, useViewport } from "@/utils.jsx";
import { SCENE_REFS_SVG, SCENE_REFS } from "@/Constants.jsx";

// Gsap and stuff
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Utility components
import GapBlock from "../components/GapBlock.jsx";
import TitleFunction from "../components/TitleFunction.jsx";
import TitleSection from "../components/TitleSection.jsx";
import NoLimit from "../components/Home/NoLimit.jsx";

// Home components
import Intro from "../components/Home/Intro.jsx";
import Wrapper from "../components/Wrapper.jsx";
import Backtrace from "../components/Home/Backtrace.jsx";

//Timelines
import { playIntroScene } from "./TimeLines/IntroTL.jsx";
import { curriculumScene } from "./TimeLines/CurriculamTL.jsx";
import {
  backtraceTitle,
  backtraceMonsier,
  backtraceEverybody,
  backtraceEnding,
} from "./TimeLines/BacktraceTL.jsx";

// SCSS
import "@/css/pages/Home.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  // !Base setups 

  /* AfterLine setup */
  
  useEffect(() => {
    const updateAfterLineHeight = () => {
      const afterLine = document.querySelector('.afterLine');
      const wrapper = document.querySelector('.wrapper');
      
      if (afterLine && wrapper) {
        // Get the total document height
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate offsets
        const topOffset = window.innerHeight * 0.5; // 50vh
        const bottomOffset = window.innerHeight * 0.44; // 44vh
        
        // Calculate the line height: total document height - top offset - bottom offset
        const lineHeight = documentHeight - topOffset - bottomOffset;
        
        afterLine.style.height = `${lineHeight}px`;
        
        console.log('Document height:', documentHeight);
        console.log('Top offset:', topOffset);
        console.log('Bottom offset:', bottomOffset);
        console.log('Calculated line height:', lineHeight);
      }
    };
  
    // Update on mount
    updateAfterLineHeight();
    
    // Update on window resize
    window.addEventListener('resize', updateAfterLineHeight);
    
    // Update when content changes (optional)
    const resizeObserver = new ResizeObserver(updateAfterLineHeight);
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      resizeObserver.observe(wrapper);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateAfterLineHeight);
      resizeObserver.disconnect();
    };
  }, []);

  // ! Animation setups 

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

  const { isMobile } = useViewport();

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
            return ref.start ? ref.start : "top 90%";
          },
          end: () => {
            return ref.end ? ref.end : "bottom bottom";
          },
          
          preventOverlaps: ref.preventOverlaps,
          fastScrollEnd: ref.fastScrollEnd,
          
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
    playIntroScene(); //Intro
    completeProgress(); //Progress bar
    setUpScene(); //Scroll triggers
    curriculumScene(timelines.curriculum); //Curriculum
    backtraceTitle(timelines.backtraceTitle); //Backtrace
    backtraceMonsier(timelines.backtraceMonsier, isMobile); //Backtrace
    backtraceEverybody(timelines.backtraceEverybody); //Backtrace
    backtraceEnding(timelines.backtraceEnding); //Backtrace
  }, []);

  return (
    <>
      <div id="home" className="wrapper">
        <Intro />
        <GapBlock />

        <TitleSection name="curriculum">
          <TitleFunction params="/_life/.." subtitle="<VitaeJournal/>">
            Reflect
          </TitleFunction>
        </TitleSection>

        <Backtrace isBacktracePlaying={isPlaying.Backtrace} />
        <NoLimit>
          How <span className="-purple">{" far "}</span> are you willing to take it?
        </NoLimit>
        <Wrapper isPotionPlaying={isPlaying.Potion} />
        <div className="afterLine"></div>
      </div>
    </>
  );
}
