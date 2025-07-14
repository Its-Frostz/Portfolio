// Utils
import { useViewport } from "@/utils.jsx";

// Utility components
import SceneSection from "../SceneSection.jsx";
import TextBlock from "../TextBlock.jsx";
import TitleFunction from "../TitleFunction.jsx";
import TitleSection from "../TitleSection.jsx";

// Toons
import Hexo from "../Toons/Hexo/Hexo.jsx";
import Dino from "../Toons/Dino/Dino.jsx";
import Octo from "../Toons/Octo/Octo.jsx";
import Monsier from "../Toons/Monsier/Monsier.jsx";
import Shrimp from "../Toons/Shrimp/Shrimp.jsx";
import Astronaut from "../Toons/Astronaut/Astronaut.jsx";
import Shapes from "../Toons/Shapes/Shapes.jsx";
import CoffeeMug from "../Toons/CoffeeMug/CoffeeMug.jsx";
import UFO from "../Toons/UFO/UFO.jsx";

// SCSS
import "@/css/Components/home/Backtrace.scss";

export default function Backtrace({ isBacktracePlaying }) {
  const { isMobile, isDesktop } = useViewport();
  return (
    <div className="BacktraceScene">
      <TitleSection name="BacktraceTitle">
        <TitleFunction
          purple=".Wings"
          params="2015"
          subtitle="The journey begins... Enjoy ;)"
        >
          Player
        </TitleFunction>
      </TitleSection>
      <SceneSection
        id="Backtrace1"
        container={
          <>
            <Hexo isPlaying={isBacktracePlaying} />
            <Dino isPlaying={isBacktracePlaying} />
            <Astronaut isPlaying={isBacktracePlaying} />
            <Shapes isPlaying={isBacktracePlaying} />
            <CoffeeMug isPlaying={isBacktracePlaying} />
            {isDesktop && <Shrimp isPlaying={isBacktracePlaying} />}
            {isDesktop && <Octo isPlaying={isBacktracePlaying} />}
            {!isMobile && <UFO isPlaying={isBacktracePlaying} />}
            {/* {!isMobile && <Monsier isPlaying={isBacktracePlaying} />} */}
            <Monsier isPlaying={isBacktracePlaying} />
          </>
        }
      >
        <TextBlock>
          <p className="-big">
            From 2015 I Have been
            <strong className="-purple">
              {" "}
              Persuing coding as my passion
            </strong>{" "}
            {`@ `}
            <a
              href="https://www.google.co.in/maps/place/Malda,+West+Bengal+732101/@24.9990332,88.1433716,3a,97.3y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICegdWovgE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAC9h4noS7Lqype_N0wBhlark5PSK2ydOrdGSz2sGAGaNpumt3wEvuD29mhjZfAfikU2tUYKkVaaKF8ionBg3qA9fJhOUmlg5Snw6We9CsZRRpIPxGDiZdeOegJ2SloqgcPUyRVQJJ77APQ%3Dw203-h135-k-no!7i1080!8i720!4m7!3m6!1s0x39fafdc4bb4f265f:0xd2f3ad3661f39c5a!8m2!3d25.0108408!4d88.1410967!10e5!16zL20vMDhzZnE1?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              title="Visit my home town"
            >
              My home
            </a>
            .
          </p>
          <p>
          From interschool victories to renowned hackathons and national showdowns —
          
            <strong className="-purple">
              {" now ranked 9th globally @ International Codewars Olympiad "}
            </strong>
          </p>
        </TextBlock>
      </SceneSection>
      <SceneSection id="Backtrace2">
        <TextBlock>
          <p>
            Over the years, I have been into
            <span className="-big -purple">
              Game Dev, Machine Learning, Web Dev, Competitive
              Programming
            </span>
            applying them across contests & real-world prototypes.
          </p>
        </TextBlock>
      </SceneSection>
      <SceneSection id="Backtrace3">
        <TextBlock>
          <p>
            In this entire journey
            <span className="-big">
              I was driven by <span className="-purple">stubborn curiosity </span>and a love for <span className="-purple">problem-solving</span>.
            </span>
          </p>
        </TextBlock>
      </SceneSection>
    </div>
  );
}
