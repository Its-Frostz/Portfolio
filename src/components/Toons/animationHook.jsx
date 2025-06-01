// React and util
import { useRef, useCallback } from "react";

// GSAP and stuff
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(MotionPathPlugin);

// For continuous/looping animations
export function useToonAnimation(isPlaying, initFn, dependency = []) {
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
    { dependencies: [...dependency], scope: svgRef }
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
    { dependencies: [...dependency, isPlaying] }
  );

  // Handle autoAlpha separately to avoid interference
  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;
      let timer;
      if (isPlaying === false) {
        timer = setTimeout(() => {
          // Control autoalpha based on isPlaying state
          gsap.to(svg, {
            autoAlpha: 0,
            duration: 0.3,
          });
          clearTimeout(timer);
        }, 900);
      } else {
        gsap.to(svg, {
          autoAlpha: 1,
          duration: 0.3,
        });
      }

      return () => {
        clearTimeout(timer); // Clean up timer if component unmounts or dependencies change
      };
    },
    { dependencies: [isPlaying] }
  );

  return svgRef;
}

// For enter/exit animations (like SpineLine)
export function useDynamicAnimation(isPlaying, initFn, dependencies = []) {
  const elementRef = useRef(null);
  const timelineRef = useRef(null);

  // Create a stable reference to the init function
  const stableInitFn = useCallback(initFn, dependencies);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      // Kill existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({ paused: true });
      timelineRef.current = tl;

      if (typeof stableInitFn === "function") {
        stableInitFn(element, tl);
      } else {
        console.warn("No init function provided to useDynamicAnimation");
      }

      return () => {
        tl.kill();
      };
    },
    { dependencies: [stableInitFn], scope: elementRef }
  );

  // Sync animation state with `isPlaying`
  useGSAP(
    () => {
      const element = elementRef.current;
      const tl = timelineRef.current;
      if (!element || !tl) return;

      // element native animations (for SVG elements)
      if ("unpauseAnimations" in element && "pauseAnimations" in element) {
        isPlaying ? element.unpauseAnimations() : element.pauseAnimations();
      }

      // For dynamic animations like enter/exit, we always want to play the timeline
      // regardless of isPlaying state, since isPlaying determines which animation to show,
      // not whether it should play or not
      tl.restart();
    },
    { dependencies: [isPlaying, stableInitFn] }
  );

  return elementRef;
}
