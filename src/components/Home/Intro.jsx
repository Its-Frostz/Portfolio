// Utilility components
import TextBlock from '../TextBlock'

// As this is kind of a scene just reused scene section for this
import '../../css/Components/SceneSection.scss'

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
            Young Mind with Big Dreams.
            <br/>
            "No Stoping Until My Phone Number Becomes My Net Worth"
          </p>
        </TextBlock>
      </div>
    </section>
  )
}
