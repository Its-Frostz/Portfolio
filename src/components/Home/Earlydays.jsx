import TitleSection from "../TitleSection";
import TitleFunction from "../TitleFunction";
import TextBlock from "../TextBlock";
import SceneSection from "../SceneSection";
import Ocean from "../Toons/Ocean/Ocean";

export default function Earlydays(isEarlyDayPlaying) {
  return (
    <div className="earlyDays">
      <TitleSection scene="earlyTitle">
        <TitleFunction params="2015,2020" subtitle="<table><tr><td>...">
          earlyDays
        </TitleFunction>

        <div className="clouds cloud-1"></div>
        <div className="clouds cloud-2"></div>
        <div className="clouds cloud-3"></div>
        <Ocean isPlaying={isEarlyDayPlaying} />
      </TitleSection>
      <SceneSection id="early-days">
        <TextBlock>
          <p>Design & illustration.</p>
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
