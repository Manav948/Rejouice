import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1.2,
            lerp: 0.08,
        })
        return () => {
            scroll.destroy()
        }
    }, [])

    const animationLine = (ref, triggerId, direction = "up") => {
        if (!ref.current) return
        const lines = ref.current.querySelectorAll('span, div')
        gsap.fromTo(
            lines,
            direction === "up"
                ? { yPercent: 100, opacity: 0 }
                : { xPercent: 100, opacity: 0 },
            {
                yPercent: direction === "up" ? 0 : undefined,
                xPercent: direction === "left" ? 0 : undefined,
                opacity: 1,
                stagger: 0.15,
                ease: "power3.out",
                duration: 2.2,
                scrollTrigger: {
                    trigger: `#${triggerId}`,
                    scroller: scrollRef.current,
                    start: "top 85%",
                    end: "bottom 40%",
                    scrub: false,
                },
            }
        )
    }

    useEffect(() => {
        animationLine(textRef1, "section-1", "up")
        animationLine(textRef2, "section-2", "left")
    }, [])

    return (
        <div
            ref={scrollRef}
            id="main"
            className="w-full min-h-screen bg-black text-white overflow-hidden"
        >

            <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6">
                <p className="text-sm md:text-xl font-semibold tracking-wide">The Growth Accelerator</p>
                <div className="hidden md:flex gap-6 lg:gap-10 text-sm md:text-base">
                    <a href="/" className="hover:text-gray-300 transition">Home</a>
                    <a href="/service" className="hover:text-gray-300 transition">Service</a>
                    <a href="/about" className="hover:text-gray-300 transition">About</a>
                    <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
                </div>
                <p className="cursor-pointer text-base md:text-xl hover:text-gray-300 transition">
                    Let&apos;s talk ↗
                </p>
            </nav>
            {/* section 1 */}
            <div
                id="section-1"
                ref={textRef1}
                className="text-center text-6xl mt-72"
            >
                <span className="block text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed">
                    Partnering with global brands, founders,
                </span>
                <span className="block text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed">
                    startups, and VCs to build tomorrow’s brands, today.
                </span>
            </div>

            {/* section-2 */}
            <div
                id="section-2"
                ref={textRef2}
                className="w-full min-h-screen flex flex-col items-center justify-center py-20 space-y-12 font-bold text-xl mt-20 mb-20"
            >
                {/* line-1 */}
                <div className="grid grid-cols-3 gap-x-20 w-5/6 text-left">
                    <div>Get in touch</div>
                    <div>
                        <p>New Business.</p>
                        <p>hello@rejouice.com</p>
                    </div>
                    <div>
                        <p>Join the Team.</p>
                        <p>jobs@rejouice.com</p>
                    </div>
                </div>
                <hr className="w-5/6 border-gray-600" />

                {/* line-2 */}
                <div className="grid grid-cols-3 gap-x-20 w-5/6 text-left">
                    <div>San Diego</div>
                    <div>
                        <p>4375 30th Street</p>
                        <p>California, 92104</p>
                        <p>USA</p>
                    </div>
                    <div>11:36:49AM</div>
                </div>
                <hr className="w-5/6 border-gray-600" />

                {/* line-3 */}
                <div className="grid grid-cols-3 gap-x-20 w-5/6 text-left">
                    <div>Paris</div>
                    <div>
                        <p>26 rue du Chalet</p>
                        <p>75010 Paris,</p>
                        <p>France</p>
                    </div>
                    <div>08:37:21PM</div>
                </div>
            </div>

            {/* section-3 */}
            <div className="relative w-full min-h-screen">
                {/* Background Image */}
                <img
                    className="w-full h-full object-cover absolute top-0 left-0"
                    src="https://images.prismic.io/rejouice-2024/Z0WNHq8jQArT1Td1_7d4177a9b98b03df2d62e7ef8a3966b8.jpeg?auto=format,compress&rect=81,293,2037,1147&w=1536&h=864&fm=avif"
                    alt="portfolio"
                />

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl md:text-6xl font-light text-white cursor-pointer group">
                        {/* Two texts for fade swap */}
                        <span className="absolute transition-opacity duration-500 group-hover:opacity-0">
                            See our work
                        </span>
                        <span className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            Portfolio
                        </span>

                        {/* Underline */}
                        <div className="h-[2px] bg-white mt-4 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
                    </div>
                </div>
            </div>

            <footer className="bg-black text-white px-6 md:px-20 py-16 mt-14 relative min-h-screen w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-light">Do it once. Do it right.</h2>
                        <div>
                            <p className="font-medium">New Business:</p>
                            <a href="mailto:hello@rejouice.com" className="hover:underline">hello@rejouice.com</a>
                        </div>
                        <div>
                            <p className="font-medium">Sign up for our newsletter (No spam)</p>
                            <div className="flex items-center border-b border-gray-500 w-64">
                                <input type="email" placeholder="Email" className="bg-transparent w-full p-2 outline-none" />
                                <span className="cursor-pointer text-xl">→</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-lg">
                        <a href="/" className="hover:underline">Home</a>
                        <a href="/about" className="hover:underline">About</a>
                        <a href="/service" className="hover:underline">Services</a>
                        <a href="/contact" className="hover:underline">Contact</a>
                    </div>

                    <div className="flex flex-col justify-between text-sm md:text-base">
                        <div className="flex flex-col gap-2">
                            <a href="https://instagram.com" target="_blank" className="hover:underline">Instagram ↗</a>
                            <a href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn ↗</a>
                        </div>
                        <div className="flex justify-between mt-10">
                            <div>
                                <p>San Diego—USA</p>
                                <p>Paris—France</p>
                            </div>
                            <div>
                                <p>Terms of use</p>
                                <p>©13–25</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="absolute bottom-0 left-0 w-full text-[150px] md:text-[350px] font-bold leading-none text-center p-5">
                    rejoUice
                </h1>
            </footer>
        </div>
    )
}

export default Contact
