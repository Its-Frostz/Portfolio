// SCSS
import "../css/Components/Spine.scss";

// GSAP and stuff
import { Power3, gsap, Elastic } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Spine() {
  const init = () => {
    gsap
      .timeline()
      .fromTo(
        ".spine",
        1,
        {
          autoAlpha: 0,
          yPercent: 20,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          ease: Power3.easeOut,
        },
        "enter"
      )
      .fromTo(
        ".spine-target .circle",
        1,
        {
          scale: 0,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          ease: Elastic.easeOut.config(1, 0.5),
        },
        "enter+=.7"
      )
      .fromTo(
        ".spine-target .circle",
        2,
        {
          backgroundColor: "transparent",
        },
        {
          backgroundColor: "#5918df",
        },
        "enter+=1.2"
      )
      .fromTo(
        ".spine-target .pulse",
        4,
        {
          autoAlpha: 1,
          scale: 0,
        },
        {
          autoAlpha: 0,
          scale: 8,
          ease: Power3.easeOut,
        },
        "enter+=1.2"
      );
  };

  useGSAP(() => {
    init();
  }, []);

  return (
    <div>
      <div className="spine" />

      <div className="spine-target">
        <div className="circle" />
        <div className="pulse" />
      </div>
    </div>
  );
}
