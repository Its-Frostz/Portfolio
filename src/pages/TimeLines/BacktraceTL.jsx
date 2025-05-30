// GSAP timeline for Backtrace scene
export const backtraceTitle = (timeline) => {
  timeline
    .clear()
    .set("#Cinnamon", {
      autoAlpha: 0,
      scale: 0,
      xPercent: 600,
      yPercent: 100,
    })
    .set("#dino", {
      scale: 0,
      xPercent: 400,
      yPercent: 100,
    })
    .set(["#Nichan", "#Coffee", "#Trish", "#Octo"], {
      autoAlpha: 0,
      scale: 0,
      xPercent: 400,
      yPercent: 100,
    })
    // This scene
    .set(["#BacktraceTitle .title-container", "#Backtrace1 .container"], {
      autoAlpha: 1,
    })
    .addLabel("start", 0)

    // Animations
    .from(
      "#BacktraceTitle .title",
      {
        duration: 6,
        yPercent: -50,
        autoAlpha: 0,
        rotationX: 90,
        transformOrigin: "50% 50% -100px",
        ease: "power1.out",
      },
      "start"
    )

    .from(
      "#BacktraceTitle .std",
      {
        duration: 6,
        yPercent: 50,
        autoAlpha: 0,
        rotationX: -90,
        transformOrigin: "50% 50% -100px",
        ease: "power3.out",
      },
      "start"
    )

    .to("#BacktraceTitle .title, #BacktraceTitle .std", {
      duration: 6,
      autoAlpha: 0,
      yPercent: -100,
    })

    .from(
      ["#open", "#smart"],
      {
        duration: 6,
        autoAlpha: 0,
        scale: 0,
        ease: "power3.out",
        stagger: 0.2,
      },
      "start+=2"
    )

    .from(
      "#Hexo",
      {
        duration: 6,
        scale: 0,
      },
      "start+=2"
    );
};

export const backtraceMonsier = (timeline) => {
  timeline
    .clear()
    .addLabel("start", 0)
    .from(
      "#Monsier",
      {
        duration: 4,
        xPercent: 70,
        ease: "power3.out",
      },
      "start"
    )
    .to(
      "#Hexo",
      {
        duration: 4,
        autoAlpha: 0,
        xPercent: -100,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      ["#smart", "#open"],
      {
        duration: 4,
        autoAlpha: 0,
        scale: 0,
        ease: "power3.out",
        stagger: 0.2,
      },
      "start"
    );
};

export const backtraceEverybody = (timeline) => {
  timeline
    .clear()
    .addLabel("start", 0)
    .to(
      "#Monsier",
      {
        duration: 4,
        yPercent: 130,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      ["#dino", "#Trish", "#Octo", "#Cinnamon", "#Coffee", "#Nichan"],
      {
        duration: 5,
        autoAlpha: 1,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power3.out",
        stagger: 0.2,
      },
      "start"
    );
};

export const backtraceEnding = (timeline) => {
  timeline
    .clear()
    .addLabel("start", 5)
    .to(
      "#dino",
      {
        duration: 6,
        yPercent: 200,
        scale: 1.5,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Trish",
      {
        duration: 6,
        xPercent: -250,
        yPercent: -100,
        autoAlpha: 0,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Cinnamon",
      {
        duration: 6,
        xPercent: -300,
        yPercent: 300,
        autoAlpha: 0,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Octo",
      {
        duration: 6,
        xPercent: -650,
        yPercent: 500,
        autoAlpha: 0,
        ease: "power3.in",
      },
      "start"
    )
    .to(
      "#Nichan",
      {
        duration: 12,
        bottom: "-10vh",
        right: "-10vw",
        scale: 4,
        ease: "power3.inOut",
      },
      "start+=1"
    )
    .to(
      "#Coffee",
      {
        duration: 12,
        top: "8rem",
        left: 0,
        scale: 4,
        ease: "power3.inOut",
      },
      "start+=1"
    );
};
