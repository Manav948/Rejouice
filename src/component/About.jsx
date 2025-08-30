import React, { useEffect, useRef } from 'react'
import gsap from "gsap"
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
import Slider from './Slider'
gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const textRef = useRef(null)
    const textRef1 = useRef(null)
    const textRef2 = useRef(null)
    const textRef3 = useRef(null)
    const textRef4 = useRef(null)
    const textRef5 = useRef(null)
    const textRef6 = useRef(null)
    const scrollRef = useRef(null)
    const videoRef = useRef(null)

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

    useEffect(() => {
        gsap.fromTo(
            videoRef.current,
            { width: "60%", height: "60%", borderRadius: "20px" },
            {
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                ease: "power2.inOut",
                duration: 4.5,
                scrollTrigger: {
                    trigger: videoRef.current,
                    scroller: scrollRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                },
            }
        )
    }, [])

    useEffect(() => {
        if (!scrollRef.current) return

        const locoScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            lerp: 0.08,
        })

        // 🔗 connect Locomotive with GSAP
        ScrollTrigger.scrollerProxy(scrollRef.current, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                }
            },
            pinType: scrollRef.current.style.transform ? "transform" : "fixed",
        })

        locoScroll.on("scroll", ScrollTrigger.update)
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update())
        ScrollTrigger.refresh()

        return () => {
            locoScroll.destroy()
            ScrollTrigger.kill()
        }
    }, [])

    useEffect(() => {
        const images = gsap.utils.toArray(".award-image")

        gsap.fromTo(
            images,
            { scale: 0.5, opacity: 0, y: 100, z: 100 },
            {
                scale: 1,
                rotate: 0,
                opacity: 1,
                y: 0,
                z: 0,
                duration: 3.2,
                ease: "elastic.out(1, 1)",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: images[0],
                    scroller: scrollRef.current,
                    start: "top 80%",
                },
            }
        )
    }, [])

    const animation = (ref, triggerId, direction = "up") => {
        if (!ref.current) return
        const lines = ref.current.querySelectorAll('span')

        gsap.fromTo(lines,
            direction === "up"
                ? { yPercent: 100, opacity: 0 }
                : { xPercent: 100, opacity: 0 },
            {
                yPercent: direction === "up" ? 0 : undefined,
                xPercent: direction === "right" ? 0 : undefined,
                opacity: 1,
                stagger: 0.15,
                ease: "power3.out",
                duration: 1.2,
                scrollTrigger: {
                    trigger: `#${triggerId}`,
                    scroller: scrollRef.current,
                    start: "top 85%",
                    end: "bottom 40%",
                    scrub: false
                }
            })
    }

    useEffect(() => {
        animation(textRef, "section-1", "up")
        animation(textRef1, "section-2", "right")
        animation(textRef2, "section-3", "up")
        animation(textRef3, "section-4", "up")
        animation(textRef4, "section-5", "right")
        animation(textRef5, "section-6", "up")
        animation(textRef6, "text-section", "up")
    })
    return (
        <div id='main' className='w-full min-h-screen '>

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20 mb-20 text-lg md:text-xl">
                    <span className="font-medium pl-16">We operate on <br /> simple principless </span>
                    <span className="leading-relaxed pl-[350px]">
                        <p>(01)Put people first</p>
                        <p>(02)Pursue excellences</p>
                        <p>(03)Embrace challenges</p>
                    </span>
                </div>

                <div className=" pl-[450px] grid grid-cols-1 md:grid-cols-2 mt-20 mb-20 text-lg md:text-xl text-center">
                    <span className="leading-relaxed ">
                        These three principles have earned us numerous awards. While we don’t chase accolades, they are proof of our dedication to impact, quality, and innovation.
                    </span>
                </div>
            </div>
            {/* section 3 */}
            <div id='section-3' ref={textRef2} className='bg-white w-full h-[500px] text-[420px] text-center mt-80'>
                <span>A</span>
                <span>w</span>
                <span>a</span>
                <span>r</span>
                <span>d</span>
                <span>s</span>
                <hr className='border-t border-gray-400' />
            </div>
            {/* section 4 */}
            <div id='section-4' ref={textRef3} className="text-black flex items-center justify-center mt-40 mb-40">
                <div className="flex items-center justify-between gap-[600px]">
                    <span className="text-xl font-semibold">Awards for digital innovation</span>
                    <ul className="flex flex-col">
                        <span>25 × Awwwards</span>
                        <span>15 × FWA</span>
                        <span>22 × CSS Design</span>
                        <span>02 × Webby</span>
                        <span>...and more.</span>
                    </ul>
                </div>
            </div>
            {/* section 5 */}
            <div className="w-[95%] h-95vh pl-20 flex items-center justify-center">
                <video ref={videoRef} autoPlay loop muted className="object-cover" src="./video6.mp4" />
            </div>

            <div
                id="section-6"
                ref={textRef5}
                className="flex flex-col items-center justify-center mt-72 font-bold text-6xl text-center tracking-tight space-y-4 mb-48"
            >
                <span>Attention is earned, not given. Great work</span>
                <span>only matters when it drives action. We build brands</span>
                <span>that turn attention into growth by unlocking their true</span>
                <span>potential. And it all starts with the story you choose</span>
                <span>to tell.</span>
            </div>
            {/* section 6 */}
            <div id="section-5" ref={textRef4} className="w-full h-screen bg-black flex flex-col lg:flex-row items-center justify-between text-white px-20 py-20 gap-10">
                {/* first div */}
                <div className="text-4xl font-bold max-w-sm">
                    Designed to transform
                </div>

                {/* second div */}
                <div className="flex flex-col gap-40 max-w-2xl">
                    <div>
                        <h4 className="text-xl font-semibold mb-2">One Team, Global Talent</h4>
                        <span className="text-gray-300">
                            We curate the best talent from all corners of the world. This enables us to leverage diverse perspectives, knowledge, and expertise to deliver fresh and tailored solutions for our clients.
                        </span>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-2">Strategic Simplicity</h4>
                        <span className="text-gray-300">
                            For us, simplicity is the ultimate sophistication. Our best work emerges from tackling complexity head-on and distilling it collaboratively with partners who value the time needed to build a high-performing brand.
                        </span>
                    </div>

                    <div>
                        <span className="text-gray-300">
                            We partner like co-founders. Straight talk, no sugarcoating. This is how we exceed expectations, and deliver memorable brands.
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="relative w-full flex items-center justify-center gap-6 px-10 py-20 bg-white mb-40"
            >
                {/* Move images slightly upward into black background */}
                <img
                    src="https://www.rejouice.com/_vercel/image?url=https:%2F%2Fimages.prismic.io%2Frejouice-2024%2FZ0d2w5bqstJ971yO_acc20b623f8ad0c1d5071831725eb05c.png?auto=format,compress?auto=compress,format&w=1536&q=80"
                    alt="Award Logo 1"
                    className=" award-image w-[45%] h-[400px] object-cover -mt-32 rounded-2xl shadow-xl"
                />
                <img
                    src="https://www.rejouice.com/_vercel/image?url=https:%2F%2Fimages.prismic.io%2Frejouice-2024%2FZ0d2wJbqstJ971yN_164dad9031dec4bc9060a6ecd2db5f47.png?auto=format,compress?auto=compress,format&w=1536&q=80"
                    alt="Award Logo 2"
                    className=" award-image w-[45%] h-[400px] object-cover -mt-32 rounded-2xl shadow-xl"
                />
            </div>
            {/*  text section */}
            <div id='text-section' ref={textRef6} className='text-center flex flex-col text-6xl     '>
                <span>We match your project</span>
                <span>with the right experts</span>
                <hr className='border-t border-gray-400 mt-16' />
            </div>
            <div className="w-full bg-white px-6 md:px-12 py-10 mt-7">
                <Slider
                    slides={[
                        "https://images.prismic.io/rejouice-2024/Z0eQrZbqstJ971-J_Maskgroup-1.jpg?auto=format,compress&w=754&h=696&fm=avif",
                        "https://images.prismic.io/rejouice-2024/Z0eQr5bqstJ971-L_Maskgroup-3.jpg?auto=format,compress&w=754&h=876&fm=avif",
                        "https://images.prismic.io/rejouice-2024/Z0eQrpbqstJ971-K_Maskgroup-2.jpg?auto=format,compress&w=754&h=496&fm=avif",
                        "https://images.prismic.io/rejouice-2024/Z0eQsZbqstJ971-N_Maskgroup.jpg?auto=format,compress&w=754&h=676&fm=avif",
                        "https://images.prismic.io/rejouice-2024/Z0eQsJbqstJ971-M_Maskgroup-4.jpg?auto=format,compress&w=754&h=876&fm=avif",
                    ]}
                />
            </div >
            {/* footer */}

            <footer className="bg-black text-white px-6 md:px-20 py-16 mt-14 relative min-h-screen w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
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

export default About
