// GSAP timeline for Curriculum scene
export const curriculumScene = (timeline) => {
  timeline
    .set("#curriculum .title-container", { autoAlpha: 1 }) // show animations
    .addLabel("start", 0) // Keeping original timing at 0
    .from(
      "#curriculum .title",
      {
        duration: 0.7,
        yPercent: -50,
        autoAlpha: 0,
        rotationX: 90,
        transformOrigin: "50% 50% -100px",
        ease: "power1.out",
      },
      "start"
    )
    .from(
      "#curriculum .std",
      {
        duration: 0.7,
        yPercent: 50,
        autoAlpha: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -100px",
        ease: "power3.out",
      },
      "start"
    )
    .to("#curriculum .title, #curriculum .std", {
      duration: 0.5,
      autoAlpha: 0,
      yPercent: -100,
    });
};
