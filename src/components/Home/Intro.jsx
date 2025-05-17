// Utilility components
import TextBlock from "../TextBlock";

// As this is kind of a scene just reused scene section for this
import "../../css/Components/SceneSection.scss";

export default function Intro() {
  return (
    <section className="scene-intro" id="intro">
      <div className="static-container">
        <h1 className="title">
          <span className="atif">Atif</span>
          <span className="func">.is()</span>
        </h1>

        <TextBlock>
          <p className="-purple">Atif Ahmed</p>
          <p className="-gray">
            A chaotic overachiever, who makes his whole personality being a software developer.
          </p>
        </TextBlock>
      </div>
    </section>
  );
}
