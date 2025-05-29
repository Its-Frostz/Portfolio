import CoffeeMugSVG from "./CoffeeMugSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT } from "@/Constants.jsx";
import { getNodes, Random } from "@/utils.jsx";

export default function CoffeeMug({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const Coffee = getNodes("#Coffee");
    tl.to(Coffee.coffee, {
      duration: 5,
      yPercent: Random(20, 200),
      xPercent: Random(-50, 50),
      rotation: Random(0, 360),
      transformOrigin: "50% 50%",
      ...LOOP_EASE_IN_OUT,
    });
  });
  return <CoffeeMugSVG ref={svgRef} />;
}
