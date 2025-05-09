import React, {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

export default function Curriculam() {
    
    let triggerPortion = useRef(null)
    let titleContainer = useRef(null);
    let title = useRef(null);
    let std = useRef(null)
    
    useEffect(() => {
        const tl1 = gsap.timeline()
        const tl2 = gsap.timeline()
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
                scrollTrigger: {
                    trigger: "#curriculam",
                    // toggleActions: "restart none none none",
                    scrub: 0.8,
                    end: "40% bottom",
                },
                visibility: "inherit", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            }
        )
        tl2.fromTo(
            std,
            {
                visibility: "hidden",
                opacity: 0, 
                transform: "translate(0%, 50%) matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 100, -100, 1)",
                transformOrigin: "50% 50% 0px"
            },
            {
                scrollTrigger: {
                    trigger: "#curriculam",
                    // toggleActions: "play resume none none",
                    scrub: 0.8,
                    end: "40% bottom",
                },
                visibility: "inherit", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            }
        )
        tl1.fromTo(
            title,
            {
                visibility: "hidden", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            },
            {
                scrollTrigger: {
                    trigger: "#curriculam",
                    // toggleActions: "none resume none none",
                    scrub: 0.1,
                    start: "50% bottom",
                    end: "bottom bottom",
                    // markers: true
                },
                opacity: 0, 
                transform: "translate(0px, -100%)",
                onComplete: gsap.set(title, {opacity:0})
            }
        )
        tl2.fromTo(
            std,
            {
                visibility: "hidden", 
                opacity: 1, 
                transform: "translate3d(0px, 0px, 0px)", 
                transformOrigin: "50% 50% 0px"
            },
            {
                scrollTrigger: {
                    trigger: "#curriculam",
                    // toggleActions: "restart none none none",
                    scrub: 0.1,
                    start: "50% bottom",
                    end: "bottom bottom"
                },
                opacity: 0, 
                transform: "translate(0px, -100%)",
            }
        )
        // tl2.fromTo(
        //     std,
        //     {
        //         visibility: "hidden", 
        //         opacity: 0.5, 
        //         transform: "translate3d(0px, 0px, 0px)", 
        //         transformOrigin: "50% 50% 0px"
        //     },
        //     {
        //         scrollTrigger: {
        //             trigger: "#curriculam",
        //             // toggleActions: "restart none none none",
        //             scrub: true,
        //             start: "75% bottom",
        //             end: "100% bottom"
        //         },
        //         opacity: 0, 
        //         transform: "translate(0px, -100%)",
        //     }
        // )
        // gsap.fromTo(
        //     title,
        //     {
        //         opacity: 0,
        //     },
        //     {
        //         scrollTrigger: {
        //             trigger: "#curriculam",
        //             // toggleActions: "restart none none none",
        //             scrub: 1,
        //             start: "110% bottom",
        //             end: "110% bottom"
        //         },
        //         opacity: 0,
        //     }
        // )
        // gsap.fromTo(
        //     std,
        //     {
        //         opacity: 0,
        //     },
        //     {
        //         scrollTrigger: {
        //             trigger: "#curriculam",
        //             // toggleActions: "none none none none",
        //             scrub: 1,
        //             start  : "bottom bottom",
        //             end: "bottom bottom"
        //         },
        //         opacity: 0,
        //     }
        // )
        // tl1.set(title, {opacity:0});
        // tl2.set(std, {opacity:0});
    }, [])
    
    return (
        <section ref={el => triggerPortion = el} id="curriculam" className="scene">
            <div ref={el => titleContainer = el} className="title-container">
                <h1 ref={el => title = el} className="title">
                    CurriculumVitae(
                    <span className="param">/.*$/g</span>
                    )
                </h1>
                <div className="std">
                    <p ref={el => std = el} className="-gray">"WorkShowcase"</p>
                </div>
            </div>
        </section>
    )
}
