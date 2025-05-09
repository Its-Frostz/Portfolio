import NavBar from './components/is/NavBar.js'
import Intro from './components/is/Intro.js';
import Curriculam from './components/is/Curriculam.js';
import Spine from './components/is/Spine.js'
import Scene_1 from './components/is/Scene_1.js'
import './css/App.css';

function App() {
  return (
    <>
      <div className="body-bg">
        <div className="-default"></div>
      </div>

      <NavBar/>

      <div id="home" className="wrapper">
        <Intro/>
        <div className="gap"></div>
        <Curriculam/>
        <Scene_1/>
      </div>

      <Spine/>
    </>
  );  
}

export default App;