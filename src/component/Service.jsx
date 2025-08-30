import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LocomotiveScroll from "locomotive-scroll"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "locomotive-scroll/dist/locomotive-scroll.css"
gsap.registerPlugin(ScrollTrigger)

const Service = () => {
  const scrollRef = useRef(null);
  const textRef1 = useRef(null)
  const textRef2 = useRef(null)
  const videoRef = useRef(null)

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
  })

  return (
    <div id='main' ref={scrollRef} className='w-full min-h-screen overflow-hidden'>

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
      <div id='section-1' ref={textRef1} className='text-center mt-96 text-6xl font-extrabold'>
        <span className='text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed pl-56'>One mission. Two engagement models.</span><br />
        <span className='text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed pr-56'>Undeniable transformation and growth.</span>
      </div>

      {/* section-2 */}
      <div id='section-2' ref={textRef2} className="w-full min-h-screen flex items-center flex-col justify-between py-20 font-bold text-xl mt-16">
        <div className="grid grid-cols-2 gap-x-32 text-left">

          {/* Left Column (Capabilities) */}
          <div className="flex justify-start">
            <h2 className="font-light">Capabilities</h2>
          </div>

          {/* Right Column (All Capabilities Content) */}
          <div className="flex flex-col gap-16">
            <hr className='border-t border-gray-400' />
            {/* (01) Strategy */}
            <div className="flex gap-20">
              <h3 className="font-semibold text-lg min-w-[150px]">(01) Strategy</h3>
              <p className="font-normal ">
                Brand Audit <br />
                Qualitative Research <br />
                Quantitative Research <br />
                Discovery Workshop <br />
                Competitive Analysis <br />
                Brand Storytelling <br />
                Positioning <br />
                Brand Architecture <br />
                Naming <br />
                Key Messaging <br />
                Voice & Tone <br />
                Content Strategy <br />
                Copywriting
              </p>
            </div>

            {/* (02) Design */}
            <hr className='border-t border-gray-400' />
            <div className="flex gap-20">
              <h3 className="font-semibold text-lg min-w-[150px]">(02) Design</h3>
              <p className="font-normal">
                Brand Identity <br />
                Brand Guidelines & Design Systems <br />
                Art Direction <br />
                User Experience (UX) <br />
                User Interface (UI) <br />
                Wireframe & Prototyping <br />
                Product Design <br />
                Mobile App <br />
                Website, E-Commerce & App Design <br />
                Motion Design <br />
                CGI & 3D <br />
                Content Creation
              </p>
            </div>

            {/* (03) Development */}
            <hr className='border-t border-gray-400' />
            <div className="flex gap-20">
              <h3 className="font-semibold text-lg min-w-[150px]">(03) Development</h3>
              <p className="font-normal">
                Creative Development <br />
                Technical Architecture <br />
                Headless eCommerce <br />
                Front-End Development <br />
                Back-End Development <br />
                Application Development <br />
                APIs & Integrations <br />
                Quality Assurance
              </p>
            </div>

            {/* (04) Growth */}
            <hr className='border-t border-gray-400' />
            <div className="flex gap-20">
              <h3 className="font-semibold text-lg min-w-[150px]">(04) Growth</h3>
              <p className="font-normal">
                Conversion Rate Optimization (CRO) <br />
                Talent Strategy <br />
                Revenue Operations <br />
                Lifecycle Marketing <br />
                Media Buying <br />
                Data and Analytics <br />
                Technology
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* video section */}
      <div className=" mt-20 w-[95%] h-95vh pl-20 flex items-center justify-center">
        <video ref={videoRef} autoPlay loop muted className="object-cover" src="./video7.mp4" />
      </div>

      {/* section-3 */}
      <div className='w-full min-h-screen flex items-center justify-between pl-20 pr-20 text-2xl font-extrabold'>
        <div>
          <span>We offer two</span><br />
          <span>engagement models</span>
        </div>

        <div>
          <span>Classic Model</span><br />
          <span>Cash Compensation</span>
        </div>

        <div>
          <span>Venture Model↗</span><br />
          <span>Less Cash, Some Equity</span>
        </div>
      </div>
      <hr className='border-t border-gray-400 mb-20' />
      {/* footer section */}
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

export default Service
