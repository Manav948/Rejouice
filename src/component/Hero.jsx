import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Slider from "./Slider"
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
import { video } from "framer-motion/client"
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false)
  const scrollRef = useRef(null)
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)
  const videoRef = useRef(null)

  // locomotive-scroll setup
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.2,
      lerp: 0.04,
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
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true
        }
      }
    )
  }, [])
  // text animation in page2
  const animateLine = (ref, triggerId) => {
    if (!ref.current) return
    const lines = ref.current.querySelectorAll("span")

    gsap.fromTo(
      lines,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: `#${triggerId}`,
          start: "top 80%",
        },
      }
    )
  }
  useEffect(() => {
    animateLine(textRef2, "page2")
    animateLine(textRef3, "page3")
  }, [])

  // reusable cursor setup
  const setupCursor = (pageId, cursorId) => {
    const page = document.getElementById(pageId)
    const cursor = document.getElementById(cursorId)
    if (!page || !cursor) return

    const xMove = gsap.quickTo(cursor, "x", { duration: 1.3, ease: "power3.out" })
    const yMove = gsap.quickTo(cursor, "y", { duration: 1.3, ease: "power3.out" })

    const moveCursor = (e) => {
      xMove(e.clientX - cursor.offsetWidth / 2)
      yMove(e.clientY - cursor.offsetHeight / 2)
    }

    page.addEventListener("mouseenter", () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 1.5 })
      window.addEventListener("mousemove", moveCursor)
    })

    page.addEventListener("mouseleave", () => {
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 1.5 })
      window.removeEventListener("mousemove", moveCursor)
    })
  }

  // initialize cursor for page1 and page4
  useEffect(() => {
    setupCursor("page1", "cursor")
    setupCursor("page4", "cursor4")
    setupCursor("page5-left", "cursor5-left")
    setupCursor("page5-right", "cursor5-right")

  }, [])

  return (
    <div id="main" className="relative w-full h-screen">
      {/* Page 1 Section */}
      <div id="page1" className="relative w-full h-screen overflow-hidden text-white">
        {/* Cursor */}
        <div
          id="cursor"
          onClick={() => setShowVideo(true)}
          className="fixed top-0 left-0 w-32 h-32 rounded-full bg-red-600 flex items-center justify-center opacity-0 scale-0 pointer-events-none z-50"
        >
          <h4 className="text-white text-sm md:text-lg font-semibold select-none pointer-events-none">
            Play Reel
          </h4>
        </div>

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.rejouice.com/static/reel-short-mobile.mp4"
        />

        {/* Page1 Content */}
        <div
          id="page1-content"
          className="relative z-20 flex flex-col items-center justify-center h-full"
        >
          {/* Navbar */}
          <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-6">
            <p className="text-sm md:text-xl font-semibold tracking-wide">
              The Growth Accelerator
            </p>
            <div className="hidden md:flex gap-6 lg:gap-10 text-sm md:text-base">
              <a href="#home" className="hover:text-gray-300 transition">
                Home
              </a>
              <a href="#work" className="hover:text-gray-300 transition">
                Work
              </a>
              <a href="#about" className="hover:text-gray-300 transition">
                About
              </a>
              <a href="#service" className="hover:text-gray-300 transition">
                Service
              </a>
            </div>
            <p className="cursor-pointer text-base md:text-xl hover:text-gray-300 transition">
              Let&apos;s talk ↗
            </p>
          </nav>

          {/* Bottom "rejouice" text */}
          <h1 className="absolute bottom-10 text-center font-bold tracking-widest text-5xl sm:text-7xl md:text-9xl lg:text-[200px] xl:text-[300px] leading-none">
            <span>r</span>
            <span>e</span>
            <span>j</span>
            <span>o</span>
            <span>u</span>
            <span>i</span>
            <span>c</span>
            <span>e</span>
          </h1>
        </div>
      </div>

      {/* Section 2 */}
      <div
        id="page2"
        className="bg-black w-full min-h-screen flex items-center justify-center text-white px-6 md:px-12"
      >
        <h2
          ref={textRef2}
          className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug tracking-wide"
        >
          <span className="block pl-36">We turn founders’ visions into </span>
          <span className="block pr-40">remarkable brands by combining</span>
          <span className="block pl-40"> strategy, design, and performance </span>
          <span className="block pr-16">marketing, all under one roof. Explore </span>
          <span className="block">our services.</span>
        </h2>
      </div>

      {/* Section 3 */}
      <hr className="border-t border-gray-700 w-full" />
      <div id="page3" ref={textRef3} className="w-full h-4/6 bg-black text-white md:px-12 py-10 flex flex-col md:flex-row md:justify-between md:items-start">
        <span className="text-xl md:text-xl font-sans pl-28">Tomorrow’s brands, today.</span>
        <div className="max-w-xl space-y-6 text-sm md:text-base leading-relaxed">
          <span className="flex text-xl font-sans pr-60">
            Since 2013, we have been recognized globally for helping founders build market-defining brands.
          </span>
          <br />
          <span className="flex text-xl font-sans pr-60">
            We partner with five clients a year to give each one the focus and care they deserve.
          </span>
          <br />
          <span className="underline underline-offset-4 hover:text-gray-300 transition mt-10">
            Learn more↗
          </span>
        </div>
      </div>

      {/* Section 4 */}
      <div id="page4" className="relative w-full h-screen overflow-hidden bg-black text-white">
        <img
          src="https://images.prismic.io/rejouice-2024/Z1r5Y5bqstJ98aaF_rivian.jpg?auto=format,compress&w=1530&h=880&fm=avif"
          className="w-full h-full object-cover absolute"
        />
        <video
          id="cursor4"
          src="./video2.mp4"
          autoPlay
          loop
          muted
          className="fixed top-0 left-0 w-72 h-96 object-cover opacity-0 scale-0 pointer-events-none z-50 rounded-lg shadow-lg"
        />
      </div>
      {/* section 5 */}
      <div
        id="page5"
        className="relative w-full h-screen overflow-hidden bg-black text-white grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left block */}
        <div id="page5-left" className="relative w-[97%] h-full overflow-hidden mt-12 pl-4">
          <img
            src="https://images.prismic.io/rejouice-2024/Z2AYnZbqstJ98i2G_oura-abdul-ovaice-photography-cd-21.png?auto=format,compress&w=1530&h=1986&fm=avif"
            className="w-full h-full object-cover absolute"
          />
          {/* Video Cursor */}
          <video
            id="cursor5-left"
            src="./video1.mp4"
            autoPlay
            loop
            muted
            className="fixed top-0 left-0 w-72 h-96 object-cover opacity-0 scale-0 pointer-events-none z-50 rounded-lg shadow-lg"
          />
        </div>

        {/* Right block */}
        <div id="page5-right" className="relative w-[97%] h-full overflow-hidden mt-12 pr-5">
          <img
            src="https://images.prismic.io/rejouice-2024/Z2AYnJbqstJ98i2E_moxionpower.2023.04.onlocation-17821.png?auto=format,compress&w=1530&h=1992&fm=avif"
            className="w-full h-full object-cover absolute "
          />
          {/* Video Cursor */}
          <video
            id="cursor5-right"
            src="./video3.mp4"
            autoPlay
            loop
            muted
            className="fixed top-0 left-0 w-72 h-96 object-cover opacity-0 scale-0 pointer-events-none z-50 rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* section 6 */}
      <div className="h-[60%] w-[90%] flex items-baseline justify-center pl-28">
        <span className="flex flex-wrap items-center justify-center gap-40 mt-44" >
          <img src="./logo1.svg" className="h-6 object-contain" />
          <img src="./logo2.svg" className="h-12 object-contain" />
          <img src="./logo3.svg" className="h-6 object-contain" />
          <img src="./logo4.svg" className="h-6 object-contain" />
          <img src="./logo5.svg" className="h-6 object-contain" />
        </span>
      </div>
      <hr className="border-t border-gray-700 w-full" />

      {/* slider section */}
      <div className="w-full h-[500px] md:h-500px] bg-white px-6 md:px-12 py-10 mt-7">
        <Slider
          slides={[
            "https://images.prismic.io/rejouice-2024/Z1m0-JbqstJ98Vh9_pergola-module-floor-1-360-grey-blue-bioclimatic-ceiling-and-curtains2.png?auto=format,compress",
            "https://www.rejouice.com/_vercel/image?url=https:%2F%2Fimages.prismic.io%2Frejouice-2024%2FZ1m0HZbqstJ98VgZ_oura-abdul-ovaice-3d-cd-031.png?auto=format,compress?auto=compress,format&w=1536&q=80",
            "./sliderImg1.avif",
            "./sliderImg2.avif",
            "./sliderImg3.avif",
          ]}
        />

        <div className="mt-40 text-black px-6 md:px-20">
          {/* Section Title */}
          <h1 className="text-6xl md:text-7xl font-light">Our approach.</h1>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-20 text-lg md:text-xl">
            <p className="font-medium">
              A simple philosophy: <br />
              quality over quantity.
            </p>
            <p className="leading-relaxed">
              We partner with five clients a year to deliver unmatched focus, and impact.
              Every detail is carefully crafted, every decision strategic, and every
              outcome transformative.
            </p>
          </div>
          <hr className="border-t border-gray-400" />

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-20 text-lg md:text-xl">
            <p className="font-medium">
              Performance & emotion. <br />
              You need both.
            </p>
            <p className="leading-relaxed">
              We craft brands that become category leaders. These brands aren’t built on
              products alone. Emotional connection and sustainable growth are the two
              essentials to get there. This is how you drive retention and advocacy.
            </p>
          </div>
          <hr className="border-t border-gray-400" />
        </div>
        <div className="w-full h-screen flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            className="object-cover"
            src="./video6.mp4" />
        </div>
      </div>
    </div>
  )
}

export default Hero
