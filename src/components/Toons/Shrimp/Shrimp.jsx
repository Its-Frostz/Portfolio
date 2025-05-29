// Svg component
import ShrimpSVG from "./ShrimpSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT } from "@/Constants.jsx";
import { getNodes, Random } from "@/utils.jsx";

export default function Shrimp({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const cinnamon = getNodes("#Cinnamon");
    tl.addLabel("start")
      .to([cinnamon.skirt, cinnamon.backSkirt], {
        duration: 3,
        skewY: -0.5,
        skewX: 0.5,
        transformOrigin: "50% 0%",
        ...LOOP_EASE_IN_OUT,
      })
      .to(
        cinnamon.leftFoot,
        {
          duration: 2,
          transformOrigin: "1% 99%",
          rotation: 80,
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        cinnamon.rightFoot,
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
        cinnamon.leftArm,
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
        cinnamon.rightArm,
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
        cinnamon.cinnamon,
        {
          duration: 10,
          motionPath: {
            curviness: 1.25,
            path: [
              {
                yPercent: Random(-50, -15),
                xPercent: Random(-30, 30),
                rotation: Random(-40, -20),
              },
              {
                yPercent: Random(-50, -15),
                xPercent: Random(-30, 30),
                rotation: Random(40, 20),
              },
            ],
            // autoRotate: true,
          },
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      );
  });
  return <ShrimpSVG ref={svgRef} />;
}
