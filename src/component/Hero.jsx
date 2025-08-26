import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import LocomotiveScroll from "locomotive-scroll"
const Hero = () => {
  const [showVideo, setShowVideo] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.2,
      lerp: 0.004
    })
    return () => {
      scroll.destroy();
    }
  }, [])

  useEffect(() => {
    const cursor = document.getElementById("cursor")
    const page1 = document.getElementById("page1")

    const xMove = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" })
    const yMove = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" })

    const moveCursor = (e) => {
      xMove(e.clientX - cursor.offsetWidth / 2)
      yMove(e.clientY - cursor.offsetHeight / 2)
    }

    page1.addEventListener("mouseenter", () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 })
      window.addEventListener("mousemove", moveCursor)
    })

    page1.addEventListener("mouseleave", () => {
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3 })
      window.removeEventListener("mousemove", moveCursor)
    })

    const interactiveEls = page1.querySelectorAll("a,button")
    interactiveEls.forEach((e) => {
      e.addEventListener("mouseenter", () => {
        gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3 })
      })
      e.addEventListener("mouseleave", () => {
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 })
      })
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  return (
    <div id="main" className="relative w-full h-screen">
      {/* Page 1 Section */}
      <div
        id="page1"
        className="relative w-full h-screen overflow-hidden text-white"
      >
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
    <div
  id="page2"
  className="bg-black w-full min-h-screen flex items-center justify-center text-white px-6 md:px-12"
>
  <h2 className="max-w-5xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug tracking-tight">
    We turn founders’ visions into remarkable brands by combining strategy, design, 
    and performance marketing, all under one roof. Explore our services.
  </h2>
</div>


      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] lg:w-[50%]">
            <video
              controls
              autoPlay
              className="w-full rounded-lg"
              src="https://www.rejouice.com/static/reel-full.mp4"
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
