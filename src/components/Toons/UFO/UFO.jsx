// Svg component
import UFOSVG from "./UFOSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT, LOOP } from "@/Constants.jsx";
import { getNodes, Random } from "@/utils.jsx";

export default function UFO({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const Trish = getNodes("#Trish");
    tl.clear()
      .addLabel("start", 0)
      .to(
        Trish.ship,
        {
          duration: 0.25,
          rotationZ: 5,
          transformOrigin: "50% 75%",
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .fromTo(
        Trish.eye,
        {
          duration: 0.05,
          scaleY: 0.1,
          transformOrigin: "50% 50%",
        },
        {
          scaleY: 1,
          repeat: -1,
          repeatDelay: 1.618,
        },
        "start"
      )
      .to(
        Trish.trish,
        {
          duration: 12,
          motionPath: {
            path: [
              {
                xPercent: Random(-100, 50),
                yPercent: Random(-40, 40),
                rotationZ: Random(15, 30),
              },
              {
                xPercent: Random(-100, 50),
                yPercent: Random(-40, 40),
                rotationZ: Random(-30, -15),
              },
              {
                xPercent: Random(-100, 50),
                yPercent: Random(-40, 40),
                rotationZ: Random(15, 30),
              },
              {
                xPercent: Random(-100, 50),
                yPercent: Random(-40, 40),
                rotationZ: Random(-30, -15),
              },
              {
                xPercent: Random(-100, 50),
                yPercent: Random(-40, 40),
                rotationZ: Random(15, 30),
              },
              {
                xPercent: Random(-100, 50),
                yPercent: Random(-40, 40),
                rotationZ: Random(-30, -15),
              },
            ],
            curviness: 1.25,
            // autoRotate: true,
          },
          transformOrigin: "50% 5%",
          ...LOOP,
        },
        "start"
      );
  });
  return <UFOSVG ref={svgRef} />;
}
