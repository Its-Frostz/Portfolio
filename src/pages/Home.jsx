// Gsap and stuff
import { useGSAP } from "@gsap/react";
import { gsap, Power3 } from "gsap";

// Utility components
import GapBlock from "../components/GapBlock.jsx";
import TitleFunction from "../components/TitleFunction.jsx";
import TitleSection from "../components/TitleSection.jsx";

// Home components
import Intro from "../components/Home/Intro.jsx";
import Wrapper from "../components/Wrapper.jsx";

// SCSS
import "../css/pages/Home.scss";

export default function Home() {
  const playIntroScene = () => {
    gsap
      .timeline()
      .from(
        "#intro .title",
        2,
        {
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
          ease: Power3.easeOut,
        },
        "enter"
      )
      .from(
        "#intro .std",
        2,
        {
          autoAlpha: 0,
          x: -32,
          ease: Power3.easeOut,
        },
        "enter+=1.5"
      );
  };

  useGSAP(() => {
    playIntroScene();
  }, []);

  return (
    <div id="home" className="wrapper">
      <Intro />
      <GapBlock />

      <TitleSection name="curriculum">
        <TitleFunction params="/_life/..." subtitle="<VitaeJournal>">
          Summarization
        </TitleFunction>
      </TitleSection>

      <TitleSection name="Scene1">
        <TitleFunction
          purple=".Wings"
          params="2007"
          subtitle="The journey begins... Enjoy ;)"
        >
          Player
        </TitleFunction>
      </TitleSection>
      <Wrapper />
    </div>
  );
}
