//Svgcomponent
import PotionSVG from "./PotionSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../toonsHook";
import { getNodes } from "@/utils.jsx";
import { LOOP_EASE_IN_OUT } from "@/Constants.jsx";

// SCSS
import "@/css/Components/toons/Potion.scss";

export default function Potion({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const potion = getNodes("#potion");
    tl
      .addLabel("start")
      .to(potion, {
        duration: 3,
        transformOrigin: "50% 90%",
        rotation: 15,
        ...LOOP_EASE_IN_OUT,
      })
      .fromTo(
        potion.potionDrop,
        {
          yPercent: 100,
          rotation: 0,
          scale: 1,
        },
        {
          duration: 0.5,
          transformOrigin: "20% 120%",
          rotation: 360,
          yPercent: -100,
          scale: 0,
          repeat: -1,
        },
        "start"
      )
      .fromTo(
        potion.potionDrop2,
        {
          yPercent: 100,
          rotation: 0,
          scale: 1,
        },
        {
          duration: 0.7,
          transformOrigin: "0% 120%",
          rotation: -360,
          yPercent: -100,
          scale: 0,
          repeat: -1,
        },
        "start"
      );
  });

  return (
    <div>
      <PotionSVG ref={svgRef} />
    </div>
  );
}
