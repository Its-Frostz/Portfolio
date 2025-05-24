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
  const sceneRefs = {
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

    const setUpScene = () => {
      Object.entries(sceneRefs).forEach(([sceneId, ref]) => {
        const element = document.getElementById(ref.id.replace("#", ""));

        const trigger = ScrollTrigger.create({
          trigger: ref.id,
          start: ref.start,
          end: ref.end,
          onEnter: () => togglePlayingTrue(ref.Toon),
          onEnterBack: () => togglePlayingTrue(ref.Toon),
          onLeave: () => togglePlayingFalse(ref.Toon),
          onLeaveBack: () => togglePlayingFalse(ref.Toon),
          markers: true, // Visual markers for debugging (can be disabled in production)
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
    setUpScene();

    // Cleanup function to kill all scroll triggers on component unmount
    return () => {
      console.log(" im out toodalooo! ", triggers);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  // GSAP timeline for intro animation
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

  // Initialize GSAP animations on component mount
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
      <Wrapper isPotionPlaying={isPlaying.Potion} />
    </div>
  );
}
