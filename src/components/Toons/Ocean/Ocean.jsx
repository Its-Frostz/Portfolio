// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { getNodes } from "@/utils.jsx";

// Scss
import '@/css/Components/toons/Ocean.scss';

export default function Ocean({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    tl.fromTo(
        ".ocean-waves.w1",
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
          ".ocean-waves.w2",
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
        className="scenery"
        role="img"
        aria-labelledby="sceneryDesc"
      >
        <div className="sky"></div>
        <div className="ocean">
          <div className="sky-mask"></div>
          <div className="ocean-waves w1"></div>
          <div className="ocean-waves w2"></div>
        </div>
      </div>
    </div>
  );
}
