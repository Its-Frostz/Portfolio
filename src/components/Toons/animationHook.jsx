// React and util
import { useRef, useCallback } from "react";

// GSAP and stuff
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// For continuous/looping animations
export function useToonAnimation(isPlaying, initFn) {
  const svgRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const tl = gsap.timeline({ paused: true });
      timelineRef.current = tl;

      if (typeof initFn === "function") {
        initFn(svg, tl);
      } else {
        console.warn("No init function provided to useToonAnimation");
      }

      return () => {
        tl.kill();
      };
    },
    { dependencies: [], scope: svgRef }
  ); // scope ties GSAP context to this ref

  // Sync animation state with `isPlaying`
  useGSAP(
    () => {
      const svg = svgRef.current;
      const tl = timelineRef.current;
      if (!svg || !tl) return;

      // SVG native animations
      if ("unpauseAnimations" in svg && "pauseAnimations" in svg) {
        isPlaying ? svg.unpauseAnimations() : svg.pauseAnimations();
      }

      // GSAP timeline
      isPlaying ? tl.play() : tl.pause();
    },
    { dependencies: [isPlaying] }
  );

  return svgRef;
}


// For enter/exit animations (like SpineLine)
export function useDynamicAnimation(isPlaying, initFn, dependencies = []) {
  const svgRef = useRef(null);
  const timelineRef = useRef(null);

  // Create a stable reference to the init function
  const stableInitFn = useCallback(initFn, dependencies);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      // Kill existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({ paused: true });
      timelineRef.current = tl;

      if (typeof stableInitFn === "function") {
        stableInitFn(svg, tl);
      } else {
        console.warn("No init function provided to useDynamicToonAnimation");
      }

      return () => {
        tl.kill();
      };
    },
    { dependencies: [stableInitFn], scope: svgRef }
  );

  // Sync animation state with `isPlaying`
  useGSAP(
    () => {
      const svg = svgRef.current;
      const tl = timelineRef.current;
      if (!svg || !tl) return;

      // SVG native animations
      if ("unpauseAnimations" in svg && "pauseAnimations" in svg) {
        isPlaying ? svg.unpauseAnimations() : svg.pauseAnimations();
      }

      // GSAP timeline - restart for dynamic animations
      if (isPlaying) {
        tl.restart();
      } else {
        tl.pause();
      }
    },
    { dependencies: [isPlaying] }
  );

  return svgRef;
}
