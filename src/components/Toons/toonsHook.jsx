// React and util
import { useRef, useEffect } from "react";

// GSAP and stuff
import { gsap } from "gsap";

export function useToonAnimation(isPlaying, initFn) {
  const svgRef = useRef(null);
  const loopRef = useRef(null);

  // Run once on mount
  useEffect(() => {
    const svg = svgRef.current;
    const loop = new gsap.timeline({ paused: true });
    loopRef.current = loop;

    if (typeof initFn === "function") {
      initFn(svg, loop);
    } else {
      console.warn("No init function provided to useToonAnimation");
    }

    return () => {
      loop.kill();
    };
  }, []);

  // Watch isPlaying
  useEffect(() => {
    const svg = svgRef.current;
    const loop = loopRef.current;
    if (!svg || !loop) return;

    // Toggle SVG built-in animation
    if ("unpauseAnimations" in svg && "pauseAnimations" in svg) {
      isPlaying ? svg.unpauseAnimations() : svg.pauseAnimations();
    }

    // Toggle GSAP loop
    isPlaying ? loop.play() : loop.pause();
  }, [isPlaying]);

  return svgRef;
}
