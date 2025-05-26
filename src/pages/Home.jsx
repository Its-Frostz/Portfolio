// React and stuff
import { useEffect, useState } from "react";
import { completeProgress } from "@/utils.jsx";

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

// SCSS
import "../css/pages/Home.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  /* SVG CONTROLLERS */

  // Track animation states for different components
  const [isPlaying, setIsPlaying] = useState({
    Potion: false,
  });

  const togglePlayingTrue = (trackName) => {
    setIsPlaying(() => ({
      [trackName]: true,
    }));
  };
  const togglePlayingFalse = (trackName) => {
    setIsPlaying(() => ({
      [trackName]: false,
    }));
  };

  // Define scroll-triggered animation scenes
  const sceneRefsSVG = {
    wrapper: {
      id: "#thanks",
      Toon: "Potion",
      start: "top bottom",
      end: "bottom top",
    },
  };
  useEffect(() => {
    // Store all scroll triggers for cleanup
    const triggers = [];

    const setUpSceneSVG = () => {
      Object.entries(sceneRefsSVG).forEach(([sceneId, ref]) => {
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

  /* Other Animations */
  const timelines = {};

  const SceneRefs = {
    curriculum: {
      id: "#curriculum",
      end: "bottom bottom",
      scrub: 0.9,
      markers: true,
    },
  };

  const setUpScene = () => {
    Object.entries(SceneRefs).forEach(([sceneId, ref]) => {
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
          markers: () => {
            return ref.markers ? ref.markers : false;
          },
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

  // GSAP timeline for intro animation
  const playIntroScene = () => {
    gsap
      .timeline()
      .addLabel("enter", 1)
      .from(
        "#intro .title",
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
        "#intro .std",
        {
          duration: 2,
          autoAlpha: 0,
          x: -32,
          ease: "power3.out",
        },
        "enter+=1.5"
      );
  };

  const curriculumScene = () => {
    timelines.curriculum
      .set("#curriculum .title-container", { autoAlpha: 1 }) // show animations
      .addLabel("start", 0)  // Keeping original timing at 0
      .from("#curriculum .title", {
        duration: 2,
        yPercent: -50,
        autoAlpha: 0,
        rotationX: 90,
        transformOrigin: "50% 50% -100px",
        ease: "power3.out",
        
      },"start")
      .from("#curriculum .std", {
        duration: 2,
        yPercent: 50,
        autoAlpha: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -100px",
        ease: "power3.out",
        
      },"start")
      .to("#curriculum .title, #curriculum .std", {
        duration: 2,
        autoAlpha: 0,
        yPercent: -100
      });
  };

  // Initialize GSAP animations on component mount
  useGSAP(() => {
    playIntroScene();
    completeProgress();
    setUpScene();
    curriculumScene();
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

      <TitleSection name="Scene1">
        <TitleFunction
          purple=".Wings"
          params="2007"
          subtitle="The journey begins... Enjoy ;)"
        >
          Player
        </TitleFunction>
      </TitleSection>
      <Wrapper isPotionPlaying={isPlaying.Potion} />
    </div>
  );
}
