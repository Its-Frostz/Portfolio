// React and util
import { useState, useEffect } from "react";
import { useDynamicAnimation } from "./Toons/animationHook.jsx";

// GSAP and stuff
import { Power3,Elastic } from "gsap";

// SCSS
import "../css/Components/Spine.scss";

export default function Spine({isPlaying}) {
  // State to track what animation to show
  const [animationMode, setAnimationMode] = useState('idle'); // 'idle', 'enter', 'exit'
  
  // Handle the enter/exit logic - simplified for reliability
  useEffect(() => {
    console.log(`isPlaying changed to: ${isPlaying}, current mode: ${animationMode}`);
    
    if (isPlaying) {
      // When isPlaying becomes true, always go to enter mode
      setAnimationMode('enter');
      console.log("Setting enter animation");
    } else {
      // When isPlaying becomes false, always go to exit mode
      setAnimationMode('exit');
      console.log("Setting exit animation");
    }
  }, [isPlaying]);

  // Use the dynamic hook
  const svgRef = useDynamicAnimation(
    // PARAMETER 1: isActive - should animation be running?
    animationMode !== 'idle',
    
    // PARAMETER 2: animationFunction - builds the timeline
    (svg, tl) => {

      if (animationMode === 'enter') {
        // Build ENTER animation
        tl.clear()
          .addLabel('enter', 0)
          .fromTo(
            '.spine',
            { autoAlpha: 0, yPercent: 20 },
            { duration: 1, autoAlpha: 1, yPercent: 0, ease: Power3.easeOut },
            'enter'
          )
          .fromTo(
            '.spine-target .circle',
            { scale: 0, autoAlpha: 0 },
            { duration: 1, scale: 1, autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.5) },
            'enter+=0.7'
          )
          .fromTo(
            '.spine-target .circle',
            { backgroundColor: 'transparent' },
            { duration: 2, backgroundColor: '#5918df' },
            'enter+=1.2'
          )
          .fromTo(
            '.spine-target .pulse',
            { autoAlpha: 1, scale: 0 },
            { duration: 3.5, autoAlpha: 0, scale: 8, ease: Power3.easeOut},
            'enter+=1.2'
          );
      } 
      
      else if (animationMode === 'exit') {
        console.log("exit animation");
        // Build EXIT animation
        tl.clear()
        .addLabel('leave', 0)
        .to(
            '.spine-target .circle, .spine-target .pulse',
            { duration: 0.5, scale: 0, autoAlpha: 0, ease: Power3.easeIn },
            'leave'
          )
          .to(
            '.spine',
            { 
              duration: 0.5, 
              autoAlpha: 0, 
              yPercent: 50, 
              ease: Power3.easeIn,
              // Reset state when animation completes
              onComplete: () => setAnimationMode('idle'),
            },
            'leave+=0.25'
          );
        console.log("exit animation");
      }
    },
    // PARAMETER 3: dependencies - rebuild animation when this changes
    [animationMode],
  );
  
  return (
    <div ref={svgRef}>
      <div className="spine" />

      <div className="spine-target">
        <div className="circle" />
        <div className="pulse" />
      </div>
    </div>
  );
}
