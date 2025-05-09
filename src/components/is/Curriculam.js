import React, {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

export default function Curriculam() {
    
    let triggerposition = useRef(null)
    let title = useRef(null);
    let std = useRef(null);
    let A1 = 0.7
    let A2 = 0.6
    let content = "/_life/..."
    const mediaQuery = window.matchMedia('(max-width: 420px)')
    
    if(mediaQuery.matches){
        content = "/life/"
    }
    
    useEffect(() => {
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: triggerposition,
                // toggleActions: "play resume none none",
                scrub: 0.9,
                end: "bottom bottom"
            }
        })
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: triggerposition,
                // toggleActions: "play resume none none",
                scrub: 0.9,
                end: "bottom bottom"
            }
        })
        gsap.set(title, {opacity:0});
        gsap.set(std, {opacity:0});
        tl1.fromTo(
            title,
            {
                transform: "translate3d(-26px, -142.105px, -100px) rotateX(90deg)",
                transformOrigin: "0% 50%",
                opacity: 0,
                visibility: "hidden"
            },
            {
                duration:A1,
                visibility: "inherit", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            }
        ).to(
            title,
            {
                duration:A2,
                opacity: 0, 
                transform: "translate(0px, -100%)",
            }
        )
        tl2.fromTo(
            std,
            {
                transform: "translate(0%, 50%) matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 100, -100, 1)",
                transformOrigin: "50% 50%",
                opacity: 0, 
                visibility: "hidden",
            },
            {
                duration:A1,
                visibility: "inherit", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            }
        ).to(
            std,
            {
                duration:A2,
                opacity: 0, 
                transform: "translate(0px, -100%)",
            }
        )
    }, [])
    
    return (
        <section ref={el => triggerposition = el} id="curriculam" className="scene">
            <div className="title-container">
                <h1 ref={el => title = el} className="title">
                    Summarization(
                    <span className="param">{content}</span>
                    )
                </h1>
                <div className="std">
                    <p ref={el => std = el} className="-gray">{"<VitaeJournal>"}</p>
                </div>
            </div>
        </section>
    )
}
