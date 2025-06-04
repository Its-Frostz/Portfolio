// GSAP and stuff
import { gsap, ScrollTrigger, MorphSVGPlugin } from "gsap";
import { useGSAP } from "@gsap/react";

// Utility Components
import SceneSection from "../SceneSection";
import GapBlock from "../GapBlock";
import TextBlock from "../TextBlock";

// Scss
import "@/css/Components/home/NoLimit.scss";

gsap.registerPlugin(MorphSVGPlugin);

export default function NoLimit({ children }) {

  return (
    <div className="noLimitScene">
      <GapBlock />
      <SceneSection id="NoLimit1">
        <TextBlock>
          <p className="-big NLtext">
            How<span className="-purple">{" far "}</span> will you take it?
          </p>
        </TextBlock>
      </SceneSection>
      <GapBlock />
    </div>
  );
}
