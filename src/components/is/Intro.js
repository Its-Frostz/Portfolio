import React, {useEffect, useRef} from 'react';
import {gsap, Power4} from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import '../../css/App.css'

export default function Intro() {

    let heading = useRef(null);
    let info = useRef(null);

    useEffect(() => {
        const ringTl = gsap.timeline();

        gsap.set(".rings span",{scale:0})
        ringTl.fromTo(
            ".rings span:nth-child(7)",
            {
                opacity: 0,
            },
            {
                delay: 0.85,
                duration: 0.1,
                opacity: 1,
            }
        );
        ringTl.fromTo(
            ".rings span:nth-child(7)", 
            {
                scale: 0
            }, 
            {
                duration: 0.5, 
                scale: 1, 
                ease: "back.out(2)"
            },"=-0.1"
        );
        ringTl.fromTo(
            ".rings span:nth-child(7)", 
            {
                backgroundColor: "rgba(149, 112, 224, 0.2)"
            }, 
            {
                duration: 1, 
                backgroundColor: "rgba(89, 24, 223, 0.6)",
                boxShadow: "0 0 70px 35px rgba(104, 42, 233, 0.6),0 0 20px rgba(104, 42, 233, 0.6)",
            },"=-0.5"
        );
        ringTl.to(
            ".rings span",
            {
                duration: 1,
                scale: 1,
                ease: "back.out(2)"
            }
        );
        ringTl.fromTo(
            ".balls",
            {
                scale: 0
            },
            {
                duration: 0.7,
                scale: 1,
                ease: "back.out(4)"
            }
        )
        ringTl.fromTo(
            ".oppo-balls",
            {
                scale: 0
            },
            {
                duration: 0.7,
                scale: 1,
                ease: "back.out(4)"
            },"-=0.7"
        )

        const ringRtl1 = gsap.timeline();
        ringRtl1.to(
            ".rings span:nth-child(1)",
            {
                scrollTrigger: {
                    trigger: ".rings",
                    triggerActions: "play pause resume none"
                },
                duration: 68,
                rotate: "+=360_cw",
                ease: "none",
                // opacity: 0
                repeat:-1
            }
        ).delay(2.9)

        const ringRtl2 = gsap.timeline();
        ringRtl2.to(
            ".rings span:nth-child(2)",
            {
                duration: 59,
                rotate: "+=360_cw",
                ease: "none",
                repeat: -1
            }
        ).delay(2.9)

        const ringRtl3 = gsap.timeline();
        ringRtl3.to(
            ".rings span:nth-child(3)",
            {
                duration: 58,
                rotate: "+=360_cw",
                ease: "none",
                repeat: -1
            }
        ).delay(2.9)

        const ringRtl4 = gsap.timeline();
        ringRtl4.to(
            ".rings span:nth-child(4)",
            {
                duration: 53,
                rotation: "+=360_cw",
                ease: "none",
                repeat: -1
            }
        ).delay(2.9)
        
        const ringRtl5 = gsap.timeline();
        ringRtl5.to(
            ".rings span:nth-child(5)",
            {
                duration: 51,
                rotate: "+=360_cw",
                ease: "none",
                repeat: -1
            }
        ).delay(2.9)
        
        const ringRtl6 = gsap.timeline();
        ringRtl6.to(
            ".rings span:nth-child(6)",
            {
                duration: 47,
                rotate: "+=360_cw",
                ease: "none",
                repeat: -1
            }
        ).delay(2.9)

        var introTl = gsap.timeline();
        gsap.set(heading, {transformOrigin: "50% 80% -10px"})
        introTl.fromTo(
            heading, 
            {
                rotateX:"90deg",
                transform:"translate3d(0px, -120px, -100px)",
            }, 
            {
                duration: 1.5,rotateX:"0deg",
                transform:"translate(0px, 0px)", 
                delay:0.8, 
                ease: "Power4.in"
            }
        )
        introTl.fromTo(
            heading, 
            {
                opacity: 0
            }, 
            {
                duration: 1.2,
                opacity: 1
            },"=-1.4"
        )
        introTl.from(
            info, 
            {
                duration: 1,
                opacity: 0,
                translateX:"-40px"
            }
        )
    }, [])  


    return (
        <section id="intro" className="scene-intro">
            <div className="rings top-left">
                <span>
                    <div className="balls"></div>
                    <div className="oppo-balls"></div>
                </span>
                <span>
                    <div className="balls"></div>
                    <div className="oppo-balls"></div>
                </span>
                <span>
                    <div className="balls"></div>
                    <div className="oppo-balls"></div>
                </span>
                <span>
                    <div className="balls"></div>
                    <div className="oppo-balls"></div>
                </span>
                <span>
                    <div className="balls"></div>
                    <div className="oppo-balls"></div>
                </span>
                <span>
                    <div className="balls"></div>
                    <div className="oppo-balls"></div>
                </span>
                <span></span>
            </div>
            <div className="omverflow">
                <div className="rings bottom-right">
                    <span>
                        <div className="balls"></div>
                        <div className="oppo-balls"></div>
                    </span>
                    <span>
                        <div className="balls"></div>
                        <div className="oppo-balls"></div>
                    </span>
                    <span>
                        <div className="balls"></div>
                        <div className="oppo-balls"></div>
                    </span>
                    <span>
                        <div className="balls"></div>
                        <div className="oppo-balls"></div>
                    </span>
                    <span>
                        <div className="balls"></div>
                        <div className="oppo-balls"></div>
                    </span>
                    <span>
                        <div className="balls"></div>
                        <div className="oppo-balls"></div>
                    </span>
                    <span></span>
                </div>
            </div>
            <div className="static-container"> 
                <h1 ref={el => heading = el} className="title">
                    <span>Atif</span>
                    <span className="func">.is()</span>
                </h1>
                <div ref={el => info = el} className="std">
                    <p className="-purple">FrostzSucksAtCoding</p>
                    <p className="-gray">
                        Young Mind with Big Dreams.
                        <br/>
                        "No Stoping Until My Phone Number Becomes My Net Worth"
                    </p>
                </div>
            </div>
        </section>
    )
}
