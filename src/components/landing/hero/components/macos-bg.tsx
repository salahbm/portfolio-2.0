/* eslint-disable prefer-const */
'use client'
import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { useTheme } from 'next-themes'

export default function MacOSWaves() {
  const { theme } = useTheme()
  const sketchRef = useRef<HTMLDivElement>(null)
  const themeRef = useRef<{ isDark: boolean }>({ isDark: false })
  const depthRef = useRef(0)

  useEffect(() => {
    let myp5: p5

    const Sketch = (s: p5) => {
      let delta = 0,
        delta1 = 0,
        delta2 = 0,
        delta3 = 0

      let width = window.innerWidth
      let height = window.innerHeight

      s.setup = () => {
        s.createCanvas(width, height, s.WEBGL)
        s.noStroke()
        s.noiseSeed(20)
      }

      s.windowResized = () => {
        width = window.innerWidth
        height = window.innerHeight
        s.resizeCanvas(width, height)
      }

      s.draw = () => {
        const isDark = themeRef.current.isDark
        const depth = depthRef.current

        const REDS = isDark
          ? [
              '#f2627a',
              '#e45064',
              '#d9486b',
              '#c03671',
              '#8a3c78',
              '#4b376c',
              '#2d3a63',
              '#1f2f4d',
            ]
          : [
              '#e45064',
              '#e45064',
              '#e65d6c',
              '#ec6a5f',
              '#e13750',
              '#c03671',
              '#643d7a',
              '#284671',
            ]

        const YELLOWS = isDark
          ? ['#f2c061', '#ef9f50', '#c89c45']
          : ['#ef9f50', '#f2c061', '#f3bf61']

        const LIGHT_BLUES = isDark
          ? ['#7abcec', '#5b9fe0', '#4282b6']
          : ['#b7cbef', '#e2eaf4', '#e2eaf4']

        const DARK_BLUES = isDark
          ? ['#1c2b45', '#274166', '#3271ac']
          : ['#3271ac', '#4282b6', '#7abcec']

        s.background(isDark ? '#0f141c' : '#ffffff')

        // Subtle GSAP-driven parallax depth
        const parallax = {
          dark1: s.map(depth, 0, 1, 0, 150),
          dark2: s.map(depth, 0, 1, 0, 250),
          light: s.map(depth, 0, 1, 0, 320),
          yellow: s.map(depth, 0, 1, 0, 450),
          red: s.map(depth, 0, 1, 0, 600),
          scale: 1 + s.map(depth, 0, 1, 0, 0.2),
        }

        s.push()
        s.scale(parallax.scale)

        // deeper layers move slower → further "back"
        drawDarkBlues(
          DARK_BLUES,
          -width,
          -height * 0.7 + parallax.dark1,
          s.PI / 150,
          4
        )
        drawDarkBlues(DARK_BLUES, -width, -400 + parallax.dark2, s.PI / 20, 2)
        drawLightBlues(LIGHT_BLUES, parallax.light)
        drawYellows(YELLOWS, parallax.yellow)
        drawReds(REDS, parallax.red)
        s.pop()
      }

      // ===== Helper layers =====

      function drawDarkBlues(
        colors: string[],
        _x: number,
        _y: number,
        _r: number,
        _s: number
      ) {
        s.push()
        s.rotate(_r)
        s.translate(_x, _y)
        s.scale(_s)
        const size = 100
        let x = -(size / 2),
          y = 0
        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const y0 = y + s.sin(delta3 + j + x) * 15
            delta3 += 0.00001
            const y2 = y + size * 1.2 + s.sin(delta3 + j + x) * 15
            if (j % 2 === 0) {
              s.fill(colors[i])
              s.vertex(x, y0)
              s.fill(colors[i + 1])
              s.vertex(x + size / 2, y2)
            }
            x += size / 2
            j += size / 2
          }
          x = -(size / 2)
          y += size
        }
        s.endShape(s.CLOSE)
        s.pop()
      }

      function drawLightBlues(colors: string[], yOffset: number) {
        s.push()
        s.rotate(s.PI / 20)
        s.translate(-width / 2, -200 + yOffset)
        s.scale(2)
        const size = 100
        let x = -(size / 2),
          y = 0
        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const y0 = y + s.sin(delta2 + j + x) * 15
            delta2 += 0.0001
            const y2 = y + size * 1.2 + s.sin(delta2 + j + x) * 15
            if (j % 2 === 0) {
              s.fill(colors[i])
              s.vertex(x, y0)
              s.fill(colors[i + 1])
              s.vertex(x + size / 2, y2)
            }
            x += size / 2
            j += size / 2
          }
          x = -(size / 2)
          y += size
        }
        s.endShape(s.CLOSE)
        s.pop()
      }

      function drawYellows(colors: string[], yOffset: number) {
        s.push()
        // Slightly flatter rotation for smoother blend under blues
        s.rotate(s.PI / 12)
        // 🟡 Move it further left & a bit lower
        s.translate(-width * 0.7, 40 + yOffset)
        s.scale(2)
        s.noStroke()

        const size = 50
        let x = -(size / 2)
        let y = 0

        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const waveSize = 10
            const y0 = y + s.sin(delta1 + j + x) * waveSize
            delta1 += 0.00005
            const y2 = y + size * 1.2 + s.sin(delta1 + j + x) * waveSize

            if (j % 2 === 0) {
              s.fill(colors[i])
              s.vertex(x, y0)
              s.fill(colors[i + 1])
              s.vertex(x + size / 2, y2)
            }
            x += size / 2
            j += size / 2
          }
          x = -(size / 2)
          y += size
        }
        s.endShape(s.CLOSE)
        s.pop()
      }

      function drawReds(colors: string[], yOffset: number) {
        s.push()
        // ✅ Lower + flatter diagonal to avoid top cut
        s.rotate(s.PI / 12)
        s.translate(-width, 200 + yOffset)
        s.scale(1)
        const size = 100
        let x = -(size / 2),
          y = 0
        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const y0 = y + s.sin(delta + j + x) * 20
            delta += 0.00005
            const y2 = y + size * 1.2 + s.sin(delta + j + x) * 20
            if (j % 2 === 0) {
              s.fill(colors[i])
              s.vertex(x, y0)
              s.fill(colors[i + 1])
              s.vertex(x + size / 2, y2)
            }
            x += size / 2
            j += size / 2
          }
          x = -(size / 2)
          y += size
        }
        s.endShape(s.CLOSE)
        s.pop()
      }
    }

    myp5 = new p5(Sketch, sketchRef.current!)
    return () => myp5.remove()
  }, [theme])

  useEffect(() => {
    themeRef.current.isDark = theme === 'dark'
  }, [theme])

  return (
    <div
      ref={sketchRef}
      className='absolute inset-0 -z-10 h-dvh w-full overflow-hidden'
    />
  )
}
