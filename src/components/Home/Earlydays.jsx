import TitleSection from "../TitleSection";
import TitleFunction from "../TitleFunction";
import TextBlock from "../TextBlock";
import SceneSection from "../SceneSection";

export default function Earlydays() {
  return (
    <div className="earlyDays">
      <TitleSection scene="earlyTitle">
        <TitleFunction params="2015,2020" subtitle="<table><tr><td>...">
          earlyDays
        </TitleFunction>

        <div className="clouds cloud-1"></div>
        <div className="clouds cloud-2"></div>
        <div className="clouds cloud-3"></div>
      </TitleSection>
      <SceneSection id="early-days">
        <TextBlock>
          <p className="-big">
            A Kid with a niche in
            <br />
            <span className="-purple">problem solving.</span>
          </p>
        </TextBlock>
      </SceneSection>
    </div>
  );
}
