// Svg component
import HexoSVG from "./HexoSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT, LOOP_EASE_OUT } from "@/Constants.jsx";
import { getNodes } from "@/utils.jsx";

//Scss
import "@/css/Components/toons/Hexo.scss";

export default function Hexo({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const hexo = getNodes("#Hexo");
    tl.addLabel("start", 0)
      .to(hexo.head, {
        duration: 2,
        transformOrigin: "50% 75%",
        scale: 1.05,
        yPercent: -5,
        ...LOOP_EASE_IN_OUT,
      }, "start")
      .to([hexo.rightArm, hexo.leftArm], {
        duration: 1.5,
        rotationZ: 5,
        transformOrigin: "90% 0%",
        ...LOOP_EASE_IN_OUT,
      }, "start")
      .to(hexo.magento, {
        duration: 2,
        yPercent: -20,
        ...LOOP_EASE_OUT,
      })
      .to(hexo.magentoS, {
        duration: 2,
        scale: 0.7,
        autoAlpha: 0.5,
        ...LOOP_EASE_OUT,
      }, "-=2");
  });
  return <HexoSVG ref={svgRef} />;
}
