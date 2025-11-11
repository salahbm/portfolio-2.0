import React from 'react'
// useGSAP is GSAP's React hook that runs animations safely inside components
import { useGSAP } from '@gsap/react'
// Core GSAP animation library
import gsap from 'gsap'
// ScrollTrigger plugin gives GSAP scroll-based control
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger so GSAP can use it
gsap.registerPlugin(ScrollTrigger)

const JourneyHeader = () => {
  useGSAP(() => {
    /*
      gsap.to() = animate TO these property values.
      Here we animate the element with the class ".journey-header-title".

      scale starts at 10 (from Tailwind scale-[10]) and animates down to 1.
      The animation progress is controlled entirely by scrolling because
      ScrollTrigger is used with scrub:true.
    */
    gsap.to('.journey-header-title', {
      scale: 1, // final scale value the title will shrink to

      rotate: -7,

      // ScrollTrigger controls WHEN and HOW the animation activates
      scrollTrigger: {
        trigger: '.journey-header-title', // the element whose scroll position we watch

        /*
          start: 'center center'
          Meaning:
          - first 'center' = the center of the trigger element
          - second 'center' = the center of the viewport
          The animation begins exactly when the title reaches the center of the screen.
        */
        start: 'top 60%',

        /*
          end: 'center top'
          Meaning:
          - trigger element's center reaches the top of the viewport.
          This defines the end of the animation.
        */
        end: 'center top',

        // scrub links animation progress directly to scroll position
        scrub: true,
      },
    })
  })

  return (
    /*
      This container takes full viewport height and width.
      It centers the inner title block.
    */
    <div className='journey-header-container relative flex h-dvh w-dvw items-center justify-center overflow-hidden font-monument-extended md:h-[120vh] lg:h-[150vh]'>
      {/* ENERGY RING BACKGROUND */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        <div className='h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,_rgba(84,132,255,0.45),_rgba(0,0,0,0)_70%)] opacity-40 blur-3xl sm:h-[400px] sm:w-[400px] md:h-[600px] md:w-[600px] lg:h-[800px] lg:w-[800px]'></div>
      </div>

      {/* FLOATING DOODLE 1 — scribble circle */}
      <div className='animate-scribble-spin pointer-events-none absolute left-4 top-1/2 w-16 opacity-40 sm:left-8 sm:w-24 md:left-12 md:w-32 lg:w-40'>
        <svg viewBox='0 0 100 100' fill='none' stroke='#4F46E5' strokeWidth='3'>
          <path d='M10 50c10-20 30-40 60-30 30 10 20 50-10 65-25 12-50-5-45-35z' />
        </svg>
      </div>

      {/* FLOATING DOODLE 2 — wavy zigzag */}
      <div className='animate-float pointer-events-none absolute bottom-1/4 right-1/2 w-16 opacity-30 sm:w-20 md:w-28 lg:w-36'>
        <svg viewBox='0 0 120 30' fill='none' stroke='#6366F1' strokeWidth='4'>
          <path d='M0 20 L20 5 L40 20 L60 5 L80 20 L100 5 L120 20' />
        </svg>
      </div>

      {/* FLOATING DOODLE 3 — wavy dollar sign */}
      <div className='animate-float pointer-events-none absolute bottom-1/3 left-2/3 -translate-x-1/2 opacity-50'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          viewBox='0 0 700 700'
          width='700'
          height='700'
        >
          <defs></defs>
          <g id='two-0' transform='matrix(1 0 0 1 0 0)' opacity='1'>
            <path
              transform='matrix(1 0 0 1 350 350)'
              id='two-4'
              d='M 293.762977 86.256592 C 297.277029 115.494259 256.312891 138.750996 227.890815 146.456534 C 187.504114 157.405813 134.992178 91.902533 103.899621 119.906555 C 69.253416 151.111227 133.406194 216.080198 118.920795 260.400219 C 108.202695 293.193684 82.705253 332.803449 48.557523 337.724992 C 14.419704 342.645107 -6.481823 287.330121 -40.75144 283.432487 C -76.839958 279.327982 -115.23596 338.498754 -145.237757 318.026326 C -183.907962 291.638808 -147.890207 222.919252 -152.820392 176.364133 C -155.315707 152.801194 -150.084829 124.567329 -164.085245 105.451183 C -179.810009 83.980618 -222.869368 92.38773 -236.201636 69.355057 C -247.686213 49.514434 -225.032362 21.767687 -232.223582 0 C -244.401069 -36.861021 -325.325979 -55.782988 -307.597078 -90.318652 C -279.101501 -145.827656 -180.968578 -68.994901 -119.024796 -76.492592 C -104.847393 -78.208628 -85.230489 -77.626983 -77.866623 -89.862873 C -55.287182 -127.381145 -135.393372 -193.812892 -100.73147 -220.571152 C -79.508671 -236.954708 -48.164237 -203.034522 -26.852934 -186.766256 C -8.105762 -172.455353 -4.597286 -130.917026 18.966674 -131.916117 C 87.071607 -134.803705 72.769055 -322.4485 137.501128 -301.085473 C 183.541885 -285.890997 99.064283 -188.214853 133.63031 -154.217599 C 160.465754 -127.823724 232.250546 -193.488313 247.586101 -159.113927 C 270.392521 -107.993726 145.031293 -91.486108 128.959794 -37.866013 C 125.304936 -25.672138 128.814668 -10.279886 136.322831 -0.000001 C 171.264131 47.840267 286.693635 27.438143 293.762977 86.256592 Z '
              fill='hsl(167, 52%, 78%)'
              stroke='undefined'
              strokeWidth='1'
              strokeOpacity='1'
              fillOpacity='1'
              visibility='visible'
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeMiterlimit='4'
            ></path>
          </g>
        </svg>
      </div>

      {/* TITLE CONTENT (YOUR ORIGINAL SECTION) */}
      <div className='journey-header-title flex scale-[2] flex-col items-center justify-center px-4 sm:scale-[2.5] md:scale-[3] lg:scale-[4]'>
        <h2 className='text-center font-syne text-xl font-extrabold uppercase leading-tight tracking-tighter sm:text-3xl md:text-4xl md:leading-6 lg:text-5xl xl:text-6xl'>
          How I Ended Up Here <span className='text-accent'>?¿?</span>
        </h2>
        <h2 className='text-md mt-1 text-center font-syne font-extrabold uppercase tracking-tighter sm:text-3xl md:mt-2 md:text-4xl lg:text-5xl xl:text-6xl'>
          (And Still Coding Somehow)
        </h2>
      </div>
    </div>
  )
}

export default JourneyHeader
