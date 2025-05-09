import React, {useEffect, useRef} from 'react';
import {gsap, Power4} from 'gsap';
import '../../css/App.css'


export default function Spine() {

    let Spine = useRef(null);
    let Ball = useRef(null);
    let outpulse = useRef(null);

    useEffect(() => { 

      var tl = gsap.timeline();
      //spine animation part
      tl.from(Spine, {duration:0.85, translateY: "35px", ease: Power4.out});
      
      //Ball animatoin part
      tl.fromTo(Ball, {opacity:0}, {duration: 0.1, opacity:1});
      tl.fromTo(Ball, {scale: 0}, {duration: 0.5, scale: 1, ease: "back.out(2)"}, "=-0.1");
      tl.fromTo(Ball, {backgroundColor: "rgba(255, 255, 255, 0)"}, {duration: 1, backgroundColor: "rgba(89, 24, 223, 1)"})
      tl.fromTo(outpulse, {scale: 0}, {duration: 2, scale: 7.5, ease: Power4.out}, "-=1")
      tl.fromTo(outpulse, {opacity: 1}, {duration: 1.9, opacity: 0, ease: Power4.in}, "-=1.7")
    }, [])

    return (
        <div>
          <div ref={el => Spine = el} className="spine"></div>
          <div className="spine-target">
            <div ref={el => Ball = el} className="circle"></div>
            <div ref={el => outpulse = el} className="pulse"></div>
          </div>
        </div>
    )
}
