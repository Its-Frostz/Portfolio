// Svg component
import ShrimpSVG from "./ShrimpSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT } from "@/Constants.jsx";
import { getNodes, random } from "@/utils.jsx";

export default function Shrimp({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const shrimp = getNodes("#Cinnamon");
    tl.addLabel("start")
      .to([shrimp.skirt, shrimp.backSkirt], {
        duration: 3,
        skewY: -0.5,
        skewX: 0.5,
        transformOrigin: "50% 0%",
        ...LOOP_EASE_IN_OUT,
      })
      .to(
        shrimp.leftFoot,
        {
          duration: 2,
          transformOrigin: "1% 99%",
          rotation: 80,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        shrimp.rightFoot,
        {
          duration: 2,
          transformOrigin: "1% 99%",
          yPercent: -7,
          rotation: 50,
          ...LOOP_EASE_IN_OUT,
        },
        "-=1.9"
      )
      .to(
        shrimp.leftArm,
        {
          duration: 0.6,
          transformOrigin: "20% 50%",
          skewY: 20,
          yPercent: -10,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        shrimp.rightArm,
        {
          duration: 0.5,
          transformOrigin: "20% 50%",
          skewY: 20,
          yPercent: -20,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        shrimp.body,
        {
          duration: 10,
          bezier: {
            curviness: 1.25,
            values: [
              {
                yPercent: random(-50, -15),
                xPercent: random(-30, 30),
                rotation: random(-40, -20),
              },
              {
                yPercent: random(-50, -15),
                xPercent: random(-30, 30),
                rotation: random(40, 20),
              },
            ],
            autoRotate: true,
          },
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      );
  });
  return <ShrimpSVG ref={svgRef} />;
}
