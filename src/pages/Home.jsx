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
import Backtrace from "../components/Home/Backtrace.jsx";

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
  const sceneRefsSVG = {
    wrapper: {
      id: "#thanks",
      Toon: "Potion",
      start: "top bottom",
      end: "bottom top",
    },
    backtraceScene: {
      id: ".BacktraceScene",
      Toon: "Backtrace",
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

  // !Other Animations
  const timelines = {};

  const SceneRefs = {
    curriculum: {
      id: "#curriculum",
      end: "bottom bottom",
      scrub: 0.9,
    },
    backtraceTitle: {
      id: "#BacktraceTitle",
      end: "bottom bottom",
      scrub: 0.9,
    },
    backtraceMonsier: {
      id: "#Backtrace1",
      end: "bottom bottom",
      scrub: 0.9,
    },
    backtraceEverybody: {
      id: "#Backtrace2",
      end: "bottom bottom",
      scrub: 0.9,
    },
    backtraceEnding: {
      id: "#Backtrace3",
      end: "bottom bottom",
      scrub: 0.9,
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

  // GSAP timeline for Curriculum scene
  const curriculumScene = () => {
    timelines.curriculum
      .set("#curriculum .title-container", { autoAlpha: 1 }) // show animations
      .addLabel("start", 0) // Keeping original timing at 0
      .from(
        "#curriculum .title",
        {
          duration: 0.7,
          yPercent: -50,
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
          ease: "power1.out",
        },
        "start"
      )
      .from(
        "#curriculum .std",
        {
          duration: 0.7,
          yPercent: 50,
          autoAlpha: 0,
          rotationX: -90,
          transformOrigin: "50% 50% -100px",
          ease: "power3.out",
        },
        "start"
      )
      .to("#curriculum .title, #curriculum .std", {
        duration: 0.5,
        autoAlpha: 0,
        yPercent: -100,
      });
  };

  // GSAP timeline for Backtrace scene
  const backtraceTitle = () => {
    timelines.backtraceTitle
      .clear()
      .set("#Cinnamon", {
        autoAlpha: 0,
        scale: 0,
        xPercent: 600,
        yPercent: 100,
      })
      .set("#dino", {
        scale: 0,
        xPercent: 400,
        yPercent: 100,
      })
      .set(["#Nichan", "#Coffee", "#Trish", "#Octo"], {
        autoAlpha: 0,
        scale: 0,
        xPercent: 400,
        yPercent: 100,
      })
      // This scene
      .set(["#BacktraceTitle .title-container", "#Backtrace1 .container"], {
        autoAlpha: 1,
      })
      .addLabel("start", 0)

      // Animations
      .from(
        "#BacktraceTitle .title",
        {
          duration: 6,
          yPercent: -50,
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
          ease: "power1.out",
        },
        "start"
      )

      .from(
        "#BacktraceTitle .std",
        {
          duration: 6,
          yPercent: 50,
          autoAlpha: 0,
          rotationX: -90,
          transformOrigin: "50% 50% -100px",
          ease: "power3.out",
        },
        "start"
      )

      .to("#BacktraceTitle .title, #BacktraceTitle .std", {
        duration: 6,
        autoAlpha: 0,
        yPercent: -100,
      })

      .from(
        ["#smart", "#open"],
        {
          duration: 6,
          autoAlpha: 0,
          scale: 0,
          ease: "power3.out",
          stagger: 0.2,
        },
        "start+=2"
      )

      .from(
        "#Hexo",
        {
          duration: 6,
          scale: 0,
        },
        "start+=2"
      );
  };

  const backtraceMonsier = () => {
    timelines.backtraceMonsier
      .clear()
      .addLabel("start", 0)
      .from(
        "#Monsier",
        {
          duration: 4,
          xPercent: 70,
          ease: "power3.out",
        },
        "start"
      )
      .to(
        "#Hexo",
        {
          duration: 4,
          autoAlpha: 0,
          xPercent: -100,
          ease: "power3.in",
        },
        "start"
      )
      .to(
        ["#smart", "#open"],
        {
          duration: 4,
          autoAlpha: 0,
          scale: 0,
          ease: "power3.out",
          stagger: 0.2,
        },
        "start"
      );
  };

  const backtraceEverybody = () => {
    timelines.backtraceEverybody
      .clear()
      .addLabel("start", 0)
      .to(
        "#Monsier",
        {
          duration: 4,
          yPercent: 130,
          ease: "power3.in",
        },
        "start"
      )
      .to(
        ["#dino", "#Nichan", "#Coffee", "#Trish", "#Cinnamon", "#Octo"],
        {
          duration: 5,
          autoAlpha: 1,
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: "power3.out",
          stagger: 0.2,
        },
        "start"
      );
  };

  const backtraceEnding = () => {
    timelines.backtraceEnding
    .clear()
    .addLabel("start", 0)
    .to(
      "#dino",
      {
        duration: 6,
        yPercent: 200,
        scale: 1.5,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Trish",
      {
        duration: 6,
        xPercent: -250,
        yPercent: -100,
        autoAlpha: 0,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Cinnamon",
      {
        duration: 6,
        xPercent: -300,
        yPercent: 300,
        autoAlpha: 0,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Octo",
      {
        duration: 6,
        xPercent: -500,
        yPercent: 400,
        autoAlpha: 0,
        ease: "none",
      },
      "start+=2"
    )
    .to(
      "#Nichan",
      {
        duration: 12,
        bottom: "-10vh",
        right: "-10vw",
        scale: 4,
        ease: "power3.inOut",
      },
      "start"
    )
    .to(
      "#Coffee",
      {
        duration: 12,
        top: "8rem",
        left: 0,
        scale: 4,
        ease: "power3.inOut",
      },
      "start"
    );
  };

  // Initialize GSAP animations on component mount
  useGSAP(() => {
    playIntroScene();
    completeProgress();
    setUpScene();
    curriculumScene();
    backtraceTitle();
    backtraceMonsier();
    backtraceEverybody();
    backtraceEnding();
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
