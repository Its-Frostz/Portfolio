// Svg component
import AstronautSVG from "./AstronautSVG.jsx";

// Animation stuff for toon
import { useToonAnimation } from "../animationHook.jsx";
import { LOOP_EASE_IN_OUT, LOOP_ELASTIC_OUT } from "@/Constants.jsx";
import { getNodes, random } from "@/utils.jsx";

export default function Astronaut({ isPlaying }) {
  const svgRef = useToonAnimation(isPlaying, (svg, tl) => {
    const astro = getNodes("#Astro");
    tl.set(astro.head, {
        rotation: -15,
        transformOrigin: '50% 90%',
        yPercent: 0,
        xPercent: -10,
      })
      .set(astro.tube, {
        rotation: -15,
        transformOrigin: '0% 100%',
      })
      .addLabel('start', 0)
      .to(
        astro.head,
        {
          duration: 4,
          rotation: 10,
          yPercent: 5,
          xPercent: 10,
          ...LOOP_EASE_IN_OUT,
        },
        'start'
      )
      .to(
        astro.tube,
        {
          duration: 4,
          rotation: 20,
          yPercent: 10,
          ...LOOP_EASE_IN_OUT,
        },
        'start'
      )
      .to(
        astro.leftArm,
        {
          duration: 2,
          rotation: -20,
          transformOrigin: '90% 90%',
          ...LOOP_ELASTIC_OUT,
        },
        'start'
      )
      .fromTo(
        astro.leftLeg,
        {
          duration: 2,
          rotation: 10,
          transformOrigin: '90% 10%',
        },
        {
          rotation: -10,
          ...LOOP_EASE_IN_OUT,
        },
        'start'
      )
      .fromTo(
        astro.rightLeg,
        {
          duration: 2,
          rotation: -10,
          transformOrigin: '90% 10%',
        },
        {
          rotation: 10,
          ...LOOP_EASE_IN_OUT,
        },
        'start'
      )
      .to(
        astro.body,
        {
          duration: 1,
          scaleX: 1.06,
          transformOrigin: '50% 50%',
          ...LOOP_EASE_IN_OUT,
        },
        'start'
      )
      .to(
        astro.astro,
        {
          duration: 5,
          yPercent: random(-40, -20),
          xPercent: random(-10, 10),
          rotation: random(-120, 120),
          transformOrigin: '50% 50%',
          ...LOOP_EASE_IN_OUT,
        },
        'start'
      )
  })
  return (
    <AstronautSVG ref={svgRef} />
  )
}
