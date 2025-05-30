// Songs for dino
export const SONGS = [
  // Dog
  "https://www.youtube.com/watch?v=EpX1_YJPGAY",
  // Howl's moving castle
  "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=4ab07ac682764778",
  // Cat
  "https://www.youtube.com/watch?v=hvL1339luv0",
  // Original
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
];

//Scene refs for toons trigger 
export const SCENE_REFS_SVG = {
  wrapper: {
    id: "#thanks",
    Toon: "Potion",
    start: "top bottom",
    end: "bottom top",
  },
  backtraceScene: {
    id: ".BacktraceScene",
    Toon: "Backtrace",
    start: "top bottom",
    end: "bottom top",
  },
};



//Scene refs for timeslines  
export const SCENE_REFS = {
  curriculum: {
    id: "#curriculum",
    end: "bottom bottom",
    scrub: 0.9,
  },
  backtraceTitle: {
    id: "#BacktraceTitle",
    end: "bottom bottom",
    scrub: 0.9,
  },
  backtraceMonsier: {
    id: "#Backtrace1",
    end: "bottom bottom",
    scrub: 0.9,
  },
  backtraceEverybody: {
    id: "#Backtrace2",
    end: "bottom bottom",
    scrub: 0.9,
  },
  backtraceEnding: {
    id: "#Backtrace3",
    end: "bottom bottom",
    scrub: 0.9,
  },
};

//Animation constants
export const LOOP = {
  repeat: -1,
  yoyo: true,
};

export const LOOP_EASE_OUT = {
  ...LOOP,
  ease: "power2.out",
};

export const LOOP_EASE_IN = {
  ...LOOP,
  ease: "power2.in",
};

export const LOOP_EASE_IN_OUT = {
  ...LOOP,
  ease: "power2.inOut",
};

export const LOOP_ELASTIC_OUT = {
  ...LOOP,
  ease: "elastic.out(1, 0.1)",
};
