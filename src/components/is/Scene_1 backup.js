import React, {useEffect, useRef} from 'react';
import {gsap, Power4} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)


export default function Scene_1() {
    let triggerposition = useRef(null)
    let title = useRef(null);
    let hex = useRef(null);
    
    useEffect(() => {
        gsap.set(hex, {transform: "rotateY(180deg)"});
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerposition,
                scrub: 0.7,
                end: "bottom bottom",
                start: "10px bottom"
            }
        })

        tl.fromTo(
            title,
            {
                transform: "translate3d(-26px, -138px, -100px) rotateX(89deg)",
                transformOrigin: "0% 50%",
                opacity: 0,
                visibility: "hidden"
            },
            {
                duration:0.7,
                visibility: "inherit", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            }
        ).to(
            title,
            {
                duration:0.6,
                opacity: 0, 
                transform: "translate(0px, -100%)",
            }
        )

    }, [])
  
    return (
        <div className="infoScene">
            <section ref={el => triggerposition = el} id="infoTitle" className="scene">
                <div className="title-container">
                    <h1 ref={el => title = el} className="title">
                        Player
                        <y className="-purple">.Wings(</y>
                        <span className="param">2014</span>
                        <y className="-purple">)</y>
                    </h1>
                    {/* <div className="std">
                        <p ref={el => std = el} className="-gray">{"<VitaeJournal>"}</p>
                    </div> */}
                </div>
                <div className="container">
                    <div ref={el => hex = el} id="cuteHexagonThingy">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 -10 350 350" aria-labelledby="aBizTitle aBizDesc">
                            <g className="cutenessBody">
                                <path fill="none" stroke="#9FD4E5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="8.141" d="M69 60.2s15.6 2.2 13.2 18.4c-2.6 17.5-18.7 3.6-24.5 8.9" class="abiz-r-arm"/>
                                <path fill="none" stroke="#D1F4FC" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="8.141" d="M37.4 61.6C22.9 93 26.6 56.1 12 62.3" class="abiz-l-arm"/>
                                <g className="cutenessHead">
                                    <path fill="#D1F4FC" d="M36.1 19.4l21.4-9.5c4.7-2.1 10.3-.9 13.7 2.9l15.7 17.4c3.5 3.8 4.1 9.5 1.5 14L76.7 64.4c-2.5 4.5-7.7 6.8-12.8 5.7 0 0-19.8-4.1-25.3-5.7-4-1.1-6.6-5.3-7-9.6l-2.4-23.3c-.6-5.1 2.2-10 6.9-12.1z" class="abiz-skin"/>
                                    <path fill="none" stroke="#004E88" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width=".775" d="M42.6 42.1c-.3 1.6-1.9 2.7-3.5 2.3-1.6-.3-2.7-1.9-2.3-3.5m19.1 4c-.3 1.6-1.9 2.7-3.5 2.3-1.6-.3-2.7-1.9-2.3-3.5m-2.4 7.2c-.3 1.6-1.9 2.7-3.5 2.3-1.6-.3-2.7-1.9-2.3-3.5" class="abiz-face"/>  
                                    <path fill="#9FD4E5" d="M86.9 30.2L71.2 12.7c-.8-.9-1.7-1.7-2.8-2.3 4.7 6.3 7.6 14.3 7.6 23 0 15.8-9.2 29.2-22.2 34.4C59.2 69 63.9 70 63.9 70c5.1 1.1 10.2-1.2 12.8-5.7L88.4 44c2.6-4.4 2-10-1.5-13.8z" class="abiz-s"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    )
}
