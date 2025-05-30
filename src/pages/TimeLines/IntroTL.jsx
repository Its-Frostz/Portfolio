import gsap from "gsap";

// GSAP timeline for intro animation
export const playIntroScene = () => {
  gsap
    .timeline()
    .addLabel("enter", 1)
    .from(
      "#intro .title",
      {
        duration: 2,
        autoAlpha: 0,
        rotationX: 90,
        transformOrigin: "50% 50% -100px",
        ease: "power3.out",
      },
      "enter"
    )
    .from(
      "#intro .std",
      {
        duration: 2,
        autoAlpha: 0,
        x: -32,
        ease: "power3.out",
      },
      "enter+=1.5"
    );
};