import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false)
  const scrollRef = useRef(null)
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)

  // locomotive-scroll setup
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.2,
      lerp: 0.004,
    })
    return () => {
      scroll.destroy()
    }
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
  useEffect(()=>{
    animateLine(textRef2,"page2")
    animateLine(textRef3,"page3")
  },[])

// reusable cursor setup
const setupCursor = (pageId, cursorId) => {
  const page = document.getElementById(pageId)
  const cursor = document.getElementById(cursorId)
  if (!page || !cursor) return

  const xMove = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" })
  const yMove = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" })

  const moveCursor = (e) => {
    xMove(e.clientX - cursor.offsetWidth / 2)
    yMove(e.clientY - cursor.offsetHeight / 2)
  }

  page.addEventListener("mouseenter", () => {
    gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 })
    window.addEventListener("mousemove", moveCursor)
  })

  page.addEventListener("mouseleave", () => {
    gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3 })
    window.removeEventListener("mousemove", moveCursor)
  })
}

// initialize cursor for page1 and page4
useEffect(() => {
  setupCursor("page1", "cursor")
  setupCursor("page4", "cursor4")
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
      <div className="text-xl md:text-xl font-sans pl-28">Tomorrow’s brands, today.</div>
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
  </div>
)
}

export default Hero
