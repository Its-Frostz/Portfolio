// Utility components
import SceneSection from "./SceneSection";
import TextBlock from "./TextBlock";

//Svg Component
import Potion from "./Toons/Potion/Potion";

// SCSS
import "../css/Components/Wrapper.scss";

export default function Wrapper({ isPotionPlaying }) {
  return (
    <SceneSection id="thanks">
      <TextBlock>
        {/* I have an idea... <Potion/> tadaaaa */}
        <Potion isPlaying={isPotionPlaying} />{/* tadaaaa */}

        <div className="madeof">
          <p className="-comment">// Made with</p>

          <div className="cols -purple-lighter">
            <ul className="col">
              <li className="ico">{`{</>}`}</li>
              <li>React 19</li>
              <li>Vite 5</li>
              <li>GSAP 3</li>
              <li>Photoshop</li>
              <li>Figma</li>
            </ul>
            <ul className="col">
              <li className="ico">~</li>
              <li>Over 53 cups of Tea</li>
              <li>Few sleepless nights</li>
              <li>3 Easter eggs</li>
              <li>{/* Add something I guess my mind aint working */}</li>
            </ul>
            <ul className="col songs">
              <li className="ico">{/* probably <MusicIcon /> */}</li>
              {/*Add one more colomn of songs or something*/}
            </ul>
          </div>
        </div>
      </TextBlock>
    </SceneSection>
  );
}
