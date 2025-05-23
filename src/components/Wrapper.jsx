// Utility components
import SceneSection from "./SceneSection";
import TextBlock from "./TextBlock";

//Svg Component
import Potion from "./Toons/Potion/Potion";

// SCSS
import "../css/Components/Wrapper.scss";

export default function Wrapper({ isPlaying }) {
  return (
    <SceneSection id="thanks">
      <TextBlock>
        {/* I have an idea... <Potion/> tadaaaa */}
        <Potion isPlaying={isPlaying} />{/* tadaaaa */}

        <div class="madeof">
          <p class="-comment">// Made with</p>

          <div class="cols -purple-lighter">
            <ul class="col">
              <li class="ico">{`</>`}</li>
              <li>React 19</li>
              <li>Vite 5</li>
              <li>GSAP 3</li>
              <li>ScrollMagic</li>
              <li>Figma</li>
            </ul>
            <ul class="col">
              <li class="ico">~</li>
              <li>Over 53 cups of Tea</li>
              <li>Few sleepless nights</li>
              <li>{/* Add something I guess my mind aint working */}</li>
            </ul>
            <ul class="col songs">
              <li class="ico">{/* probably <MusicIcon /> */}</li>
              {/*Add one more colomn of songs or something*/}
            </ul>
          </div>
        </div>
      </TextBlock>
    </SceneSection>
  );
}
