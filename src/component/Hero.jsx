import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Slider from "./Slider"
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false)
  const scrollRef = useRef(null)
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)
  const textRef4 = useRef(null)
  const textRef5 = useRef(null)
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

  // video expand animation
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
          scrub: true,
        },
      }
    )
  }, [])

  // text animation reusable
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
    animateLine(textRef4, "page7")
    animateLine(textRef5, "page1-content")
  }, [])

  // cursor reusable setup
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
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 1.0 })
      window.addEventListener("mousemove", moveCursor)
    })

    page.addEventListener("mouseleave", () => {
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 1.0 })
      window.removeEventListener("mousemove", moveCursor)
    })
  }

  useEffect(() => {
    setupCursor("page1", "cursor")
    setupCursor("page4", "cursor4")
    setupCursor("page5-left", "cursor5-left")
    setupCursor("page5-right", "cursor5-right")
  }, [])

  return (
    <div id="main" ref={scrollRef} data-scroll-container className="relative w-full min-h-screen overflow-hidden">
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

          {/* Bottom "rejouice" text */}
          <h1 ref={textRef5} className="absolute bottom-10 text-center font-bold tracking-widest text-5xl sm:text-7xl md:text-9xl lg:text-[200px] xl:text-[300px] leading-none">
            <span>r</span><span>e</span><span>j</span><span>o</span>
            <span>u</span><span>i</span><span>c</span><span>e</span>
          </h1>
        </div>
      </div>

      {/* Section 2 */}
      <div id="page2" className="bg-black w-full min-h-screen flex items-center justify-center text-white px-6 md:px-12">
        <h2 ref={textRef2} className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug tracking-wide">
          <span className="block px-4 sm:px-10 md:pl-36">We turn founders’ visions into </span>
          <span className="block px-4 sm:px-10 md:pr-40">remarkable brands by combining</span>
          <span className="block px-4 sm:px-10 md:pl-40"> strategy, design, and performance </span>
          <span className="block px-4 sm:px-10 md:pr-16">marketing, all under one roof. Explore </span>
          <span className="block px-4 sm:px-10">our services.</span>
        </h2>
      </div>

      {/* Section 3 */}
      <hr className="border-t border-gray-700 w-full" />
      <div
        id="page3"
        ref={textRef3}
        className="w-full min-h-screen bg-black text-white px-6 md:px-12 py-16 flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left gap-8 md:gap-16"
      >
        {/* Left text */}
        <span className="text-2xl md:text-3xl font-sans md:pl-10 lg:pl-28">
          Tomorrow’s brands, today.
        </span>

        {/* Right text block */}
        <div className="max-w-xl space-y-6 text-base sm:text-lg md:text-xl leading-relaxed md:pl-10 lg:pl-28">
          <p>
            Since 2013, we have been recognized globally for helping founders build
            market-defining brands.
          </p>
          <p>
            We partner with five clients a year to give each one the focus and care
            they deserve.
          </p>
          <a
            href="#"
            className="underline underline-offset-4 hover:text-gray-300 transition"
          >
            Learn more↗
          </a>
        </div>
      </div>


      {/* Section 4 */}
      <div id="page4" className="relative w-full h-screen overflow-hidden bg-black text-white">
        <img src="https://images.prismic.io/rejouice-2024/Z1r5Y5bqstJ98aaF_rivian.jpg?auto=format,compress&w=1530&h=880&fm=avif" className="w-full h-full object-cover absolute" />
        <video id="cursor4" src="./video2.mp4" autoPlay loop muted className="fixed top-0 left-0 w-72 h-96 object-cover opacity-0 scale-0 pointer-events-none z-50 rounded-lg shadow-lg" />
      </div>

      {/* Section 5 */}
      <div id="page5" className="relative w-full h-screen overflow-hidden bg-black text-white grid grid-cols-1 md:grid-cols-2">
        <div id="page5-left" className="relative w-[97%] h-full overflow-hidden mt-12 pl-4">
          <img src="https://images.prismic.io/rejouice-2024/Z2AYnZbqstJ98i2G_oura-abdul-ovaice-photography-cd-21.png?auto=format,compress&w=1530&h=1986&fm=avif" className="w-full h-full object-cover absolute" />
          <video id="cursor5-left" src="./video1.mp4" autoPlay loop muted className="fixed top-0 left-0 w-72 h-96 object-cover opacity-0 scale-0 pointer-events-none z-50 rounded-lg shadow-lg" />
        </div>
        <div id="page5-right" className="relative w-[97%] h-full overflow-hidden mt-12 pr-5">
          <img src="https://images.prismic.io/rejouice-2024/Z2AYnJbqstJ98i2E_moxionpower.2023.04.onlocation-17821.png?auto=format,compress&w=1530&h=1992&fm=avif" className="w-full h-full object-cover absolute " />
          <video id="cursor5-right" src="./video3.mp4" autoPlay loop muted className="fixed top-0 left-0 w-72 h-96 object-cover opacity-0 scale-0 pointer-events-none z-50 rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Section 6 */}
      <div className="h-[60%] w-[90%] flex items-baseline justify-center pl-28">
        <span className="flex flex-wrap items-center justify-center gap-40 mt-44">
          <img src="./logo1.svg" className="h-6 object-contain" />
          <img src="./logo2.svg" className="h-12 object-contain" />
          <img src="./logo3.svg" className="h-6 object-contain" />
          <img src="./logo4.svg" className="h-6 object-contain" />
          <img src="./logo5.svg" className="h-6 object-contain" />
        </span>
      </div>
      <hr className="border-t border-gray-700 w-full" />

      {/* Slider + Approach + Video */}
      <div className="w-full bg-white px-6 md:px-12 py-10 mt-7">
        <Slider
          slides={[
            "https://images.prismic.io/rejouice-2024/Z1m0-JbqstJ98Vh9_pergola-module-floor-1-360-grey-blue-bioclimatic-ceiling-and-curtains2.png?auto=format,compress",
            "https://www.rejouice.com/_vercel/image?url=https:%2F%2Fimages.prismic.io%2Frejouice-2024%2FZ1m0HZbqstJ98VgZ_oura-abdul-ovaice-3d-cd-031.png?auto=format,compress?auto=compress,format&w=1536&q=80",
            "./sliderImg1.avif",
            "./sliderImg2.avif",
            "./sliderImg3.avif",
          ]}
        />

        <div id="page7" ref={textRef4} className="mt-40 text-black px-6 md:px-20">
          <span className="text-6xl md:text-7xl font-light">Our approach.</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-20 text-lg md:text-xl">
            <span className="font-medium">A simple philosophy: <br /> quality over quantity.</span>
            <span className="leading-relaxed">
              We partner with five clients a year to deliver unmatched focus, and impact.
              Every detail is carefully crafted, every decision strategic, and every outcome transformative.
            </span>
          </div>
          <hr className="border-t border-gray-400" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-20 text-lg md:text-xl">
            <span className="font-medium">Performance & emotion. <br /> You need both.</span>
            <span className="leading-relaxed">
              We craft brands that become category leaders. These brands aren’t built on products alone.
              Emotional connection and sustainable growth are the two essentials to get there. This is how you drive retention and advocacy.
            </span>
          </div>
          <hr className="border-t border-gray-400" />
        </div>

        {/* Video Section */}
        <div className="w-full h-screen flex items-center justify-center">
          <video ref={videoRef} autoPlay loop muted className="object-cover" src="./video6.mp4" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white px-6 md:px-20 py-16 mt-14 relative h-screen">
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
            <a href="#home" className="hover:underline">Home</a>
            <a href="#work" className="hover:underline">Work</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
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

export default Hero
