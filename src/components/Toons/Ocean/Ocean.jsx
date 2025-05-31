// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { getNodes } from "@/utils.jsx";

// Scss
import '@/css/Components/toons/Ocean.scss';

export default function Ocean({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const scenery = getNodes(".scenery");
    tl.fromTo(
        scenery.w1,
        {
          xPercent: 10,
          yPercent: 0,
          zIndex: 9,
        },
        {
          xPercent: 0,
          yPercent: -100,
          zIndex: 1,
          duration: 16,
          repeat: -1,
        }
      ).fromTo(
        scenery.w2,
        {
          xPercent: 10,
          yPercent: 0,
          zIndex: 9,
        },
        {
          xPercent: 0,
          yPercent: -100,
          zIndex: 1,
          duration: 16,
          repeat: -1,
        },
        "-=8"
      );
  });

  return (
    <div>
      <div
        ref={svgRef}
        class="scenery"
        role="img"
        aria-labelledby="sceneryDesc"
      >
        {/* <p class="ariaLabel" id="pepeDesc">
          A floating head carrying musical instruments in the ear, foliage and
          monuments in the hair, flies over a greenish ocean during the sunset
        </p> */}
        <div class="sky"></div>
        <div class="ocean">
          <div class="sky-mask"></div>
          <div class="ocean-waves w1"></div>
          <div class="ocean-waves w2"></div>
        </div>
      </div>
    </div>
  );
}
