// Svg component
import OctoSVG from "./OctoSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT, LOOP } from "@/Constants.jsx";
import { getNodes, Random } from "@/utils.jsx";

export default function Octo({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const octo = getNodes("#octo");
    tl
      .addLabel("start", 0)
      .fromTo(
        octo.eye,
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
        octo.octo,
        {
          duration: 5,
          y: Random(-200, 400),
          x: Random(-100, 100),
          rotation: Random(-30, 30),
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      );
  });
  return <OctoSVG ref={svgRef} />;
}
