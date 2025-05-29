// React and util
import React from "react";

// Svg component
import MonsierSVG from "./MonsierSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { getNodes } from "@/utils.jsx";
import { LOOP_EASE_IN_OUT } from "@/Constants.jsx";

export default function Monsier({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const monsier = getNodes("#Monsier");
    tl.set(monsier.head, {
      transformOrigin: "50% 90%",
      rotation: 5,
    })
      .addLabel("start")
      .to(
        monsier.head,
        {
          duration: 3,
          rotation: -5,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        [monsier.leftArm, monsier.leftMustache],
        {
          duration: 2,
          transformOrigin: "90% 50%",
          rotation: -20,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        [monsier.rightArm, monsier.rightMustache],
        {
          duration: 2,
          transformOrigin: "10% 50%",
          rotation: 20,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        monsier.monsier,
        {
          duration: 2,
          yPercent: -10,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      );
  });
  return <MonsierSVG ref={svgRef} />;
}
