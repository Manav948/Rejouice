import React, { useEffect, useRef } from 'react'
import gsap from "gsap"
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const textRef = useRef(null)
    const textRef1 = useRef(null)
    const scrollRef = useRef(null)


    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            lerp: 0.08,
        })
        return () => {
            scroll.destroy()
        }
    }, [])

    const animation = (ref, triggerId) => {
        if (!ref.current) return
        const lines = ref.current.querySelectorAll('span')

        gsap.fromTo(lines, {
            y: 100,
            opacity: 0
        },
            {
                y: 0,
                opacity: 1,
                stagger: 0.3,
                ease: "power4.out",
                duration: 1.2,
                scrollTrigger: {
                    trigger: `#section-1`,
                    scroller: scrollRef.current,
                    start: "top 80%",
                    end: "bottom 30%",
                    scrub: false
                }
            })
    }

    useEffect(() => {
        animation(textRef, "section-1")
        animation(textRef1, "section-2")
    })
    return (
        <div id='main' className='w-full min-h-screen '>

            <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6">
                <p className="text-sm md:text-xl font-extrabold tracking-wide">rejouice</p>
                <div className="hidden md:flex gap-6 lg:gap-10 text-xl md:text-base">
                    <a href="/" className="hover:text-gray-300 transition">Home</a>
                    <a href="#work" className="hover:text-gray-300 transition">Work</a>
                    <a href="/about" className="hover:text-gray-300 transition">About</a>
                    <a href="#service" className="hover:text-gray-300 transition">Service</a>
                </div>
                <p className="cursor-pointer text-base md:text-xl hover:text-gray-300 transition">
                    Let&apos;s talk ↗
                </p>
            </nav>
            {/* section 1 */}
            <div
                id="section-1"
                ref={textRef}
                className="flex flex-col items-center justify-center mt-72 font-bold text-6xl text-center tracking-tight space-y-4"
            >
                <span>We are a collective of seasoned creatives,</span>
                <span>strategists, growth marketers, and technologists,</span>
                <span>dedicated to transforming ambitious visions</span>
                <span>into category leaders.</span>
            </div>

            <hr className='border-t mt-20 border-gray-400' />
            {/* section 2 */}
            <div id="section-2" ref={textRef1} className="mt-10 text-black px-6 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-20 text-lg md:text-xl">
                    <span className="font-medium">We operate on <br /> simple principless </span>
                    <span className="leading-relaxed">
                        <p>(01)Put people first</p>
                        <p>(02)Pursue excellences</p>
                        <p>(03)Embrace challenges</p>
                    </span>
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-20 text-lg md:text-xl text-center">
                    <span className="leading-relaxed">
                       These three principles have earned us numerous awards. While we don’t chase accolades, they are proof of our dedication to impact, quality, and innovation.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default About
