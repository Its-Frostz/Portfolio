// React and util
import { useEffect, useState } from "react";

// Svg component
import DinoSVG from "./DinoSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT, LOOP } from "@/Constants.jsx";
import { getNodes, Random } from "@/utils.jsx";

export const SONGS = [
  // Howl's moving castle
  "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=4ab07ac682764778",
  // Dog
  "https://www.youtube.com/watch?v=EpX1_YJPGAY",
  // Cat
  "https://www.youtube.com/watch?v=hvL1339luv0",
  // Original
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
];

export default function Dino({ isPlaying }) {
  const [rhythm, setRhythm] = useState(0.3);
  // const [song, setSong] = useState(4);
  const [song, setSong] = useState(Random(0, 4));
  let rotationZ = rhythm * 32;
  function setupStuff() {
    const bright = document.querySelector(".bright");
    const teeth1 = document.querySelector("#dino .teeth1");
    const teeth2 = document.querySelector("#dino .teeth2");
    const mouthChillout = document.querySelector("#dino .mouth-chillout");
    const mouthFuckYeah = document.querySelector("#dino .mouth-fuck-yeah");
    switch (song) {
      case 1:
        bright.style.display = "none";
        teeth1.style.display = "none";
        teeth2.style.display = "none";
        mouthChillout.style.display = "none";
        mouthFuckYeah.style.display = "";
        break;
      case 2:
        rotationZ = 9.6;
        setRhythm(1);
        bright.style.display = "none";
        teeth1.style.display = "none";
        teeth2.style.display = "none";
        mouthChillout.style.display = "none";
        mouthFuckYeah.style.display = "";
        break;
      case 3:
        setRhythm(0.2);
        break;
    }
  }

  //   document.querySelector(".dino-head").addEventListener("click", () => {
  //     window.open(SONGS[song - 1]);
  //   });

  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const dino = getNodes("#dino");
    setupStuff();

    tl.addLabel("start", 0)
      .to(
        dino.leftLeg,
        {
          duration: rhythm,
          skewX: -20,
          transformOrigin: "50% 100%",
          ...LOOP,
        },
        "start"
      )
      .to(
        dino.rightLeg,
        {
          duration: rhythm,
          skewX: 20,
          transformOrigin: "50% 100%",
          ...LOOP,
        },
        "start"
      )
      .to(
        dino.headphone,
        {
          duration: rhythm / 2,
          scale: 1.1,
          transformOrigin: "20% 20%",
          ...LOOP,
        },
        "start"
      )
      .to(
        [dino.leftArm, dino.rightArm],
        {
          duration: rhythm,
          yPercent: 20,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        dino.tail,
        {
          duration: rhythm,
          transformOrigin: "25% 50%",
          rotationZ: 20,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        dino.head,
        {
          duration: rhythm,
          transformOrigin: "85% 100%",
          rotationZ,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      );

    if (song > 2) {
      tl.fromTo(
        dino.eye,
        {
          duration: 0.01,
          scaleY: 0.1,
          transformOrigin: "50% 50%",
        },
        {
          scaleY: 1,
          transformOrigin: "50% 50%",
          repeatDelay: 3,
          ...LOOP,
        },
        "start"
      ).fromTo(
        dino.bright,
        {
          duration: 0.01,
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          repeatDelay: 3,
          ...LOOP,
        },
        "start"
      );
    } else {
      tl.set(
        dino.eye,
        {
          scaleY: 0.1,
          transformOrigin: "50% 50%",
        },
        "start"
      );
    }
  }, [rhythm]);

  return <DinoSVG ref={svgRef} />;
}
