// Svg component
import ShapesSVG from "./ShapesSVG";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT } from "@/Constants.jsx";
import { getNodes } from "@/utils.jsx";

export default function Shapes({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const open = getNodes("#open");
    const smart = getNodes("#smart");
    tl.clear(true)
      .addLabel("start")
      .to(
        smart.smart,
        {
          duration: 8,
          rotation: -360,
          transformOrigin: "50% 50%",
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      )
      .to(
        open,
        {
          duration: 7,
          rotation: 360,
          transformOrigin: "50% 50%",
          ...LOOP_EASE_IN_OUT,
        },
        "start"
      );
  });
  return (
    <div>
      <ShapesSVG ref={svgRef} />
    </div>
  );
}
