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
