// GSAP and stuff
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Utility Components
import SceneSection from "../SceneSection";
import GapBlock from "../GapBlock";
import TextBlock from "../TextBlock";

// Scss
import "@/css/Components/home/NoLimit.scss";

gsap.registerPlugin(ScrollTrigger, SplitText);

const horizontalScene = () => {
  const elSelector = gsap.utils.selector(".theContainer");

  const el = {
    text: elSelector(".NLtext"),
    textCont: elSelector(".text-container")[0],
  };

  // Calculate the actual scrollable distance
  const textElement = el.text[0];
  const textWidth = textElement.scrollWidth;
  const viewportWidth = window.innerWidth;
  const x = textWidth - viewportWidth+750; // padding-left (100vw) + text width

  const scrollTween = gsap.to([el.textCont, ".afterLine", ".spine", ".spine-target"], {
    x: -x, // Move the full calculated distance
    ease: "none",
    scrollTrigger: {
      trigger: ".theContainer",
      start: "center center",
      end: `+=${x}`,
      pin: true,
      scrub: true,
      markers: true, // Enable to debug
      id: "horizontal-scroll", // Add ID to identify this trigger
      // onUpdate: self => {
      //   console.log('Horizontal scroll progress:', self.progress);
      // }
    },
  });

  SplitText.create(el.text, {
    type: 'chars',
    autoSplit: true,
    onSplit: (s) => {
      const tweens = s.chars.map((c) => {
        gsap.from(c, {
          y: 'random([-300, -250, 250, 300])',
          rotation: 'random([-60, -50, -40, 40, 50, 60])',
          ease: 'elastic.out(1.2, 1)',
          scrollTrigger: {
            trigger: c,
            containerAnimation: scrollTween,
            start: 'left 75%',
            end: 'left 35%',
            scrub: true,
            // markers: true,
          },
        });
      });
      return tweens;
    },
  });

  // Create character animations that work with the horizontal scroll
  // split.chars.forEach((char) => {
  //   const y = gsap.utils.random([-300, 300]);
  //   const rotation = gsap.utils.random(-60, 60);

  //   gsap.from(
  //     char,
  //     {
  //       // TO: Final positions (where animation ends)
  //       yPercent: -y, // Normal vertical position
  //       rotation: -rotation, // No rotation
  //       ease: "elastic.out(1.2, 1)",
  //       scrollTrigger: {
  //         trigger: char,
  //         containerAnimation: scrollTween, // This links it to the horizontal scroll
  //         start: "left 80%", // When char enters from right side of viewport
  //         end: "left 20%", // When char reaches left side
  //         scrub: 0.1,
  //       },
  //     }
  //   );
  // });
};

export default function NoLimit({ children }) {
  // Cleanup function to prevent memory leaks and double animations
  // const cleanup = () => {
  //   ScrollTrigger.getAll().forEach((trigger) => {
  //     if (
  //       trigger.trigger === ".theContainer" ||
  //       (trigger.vars?.containerAnimation &&
  //         trigger.vars.containerAnimation.vars?.scrollTrigger?.trigger ===
  //           ".theContainer")
  //     ) {
  //       trigger.kill();
  //     }
  //   });
  // };

  useGSAP(() => {
    // cleanup(); // Clean up any existing animations first
    horizontalScene();

    // Return cleanup function for useGSAP
    // return cleanup;
  }, []); // Empty dependency array to run only once

  return (
    <div className="noLimitScene">
      <GapBlock />
      <section className="scene" id="NoLimit1">
        <div className="theContainer">
          <div className="text-container">
            <p className="-big NLtext">
              {children}
            </p>
          </div>
        </div>
      </section>
      <GapBlock />
    </div>
  );
}
