/* eslint-disable prefer-const */
'use client'
import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { useTheme } from 'next-themes'

export default function MacOSWaves() {
  const sketchRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    let myp5: p5

    const Sketch = (s: p5) => {
      const isDark = theme === 'dark'
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
            '#1f2f4d',
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
            '#284671',
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

      const backgroundColor = isDark ? '#0f141c' : '#ffffff'

      let delta = 0,
        delta1 = 0,
        delta2 = 0,
        delta3 = 0

      const width = window.innerWidth
      const height = window.innerHeight

      s.setup = () => {
        s.createCanvas(width, height, s.WEBGL)
        s.noiseSeed(20)
      }

      s.draw = () => {
        s.background(backgroundColor)
        drawDarkBlues(DARK_BLUES, -width, -height * 0.7, s.PI / 150, 4)
        drawDarkBlues(DARK_BLUES, -width, -400, s.PI / 20, 2)
        drawLightBlues(LIGHT_BLUES)
        drawYellows(YELLOWS)
        drawReds(REDS)
      }

      // ========== Helper functions ==========

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
        s.scale(_s, _s)
        s.noStroke()

        const size = 100
        let x = -(size / 2)
        let y = 0

        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const waveSize = 15
            const y0 = y + s.sin(delta3 + j + x) * waveSize
            delta3 += 0.00001 // slowed down
            const y2 = y + size * 1.2 + s.sin(delta3 + j + x) * waveSize

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

      function drawLightBlues(colors: string[]) {
        s.push()
        s.rotate(s.PI / 20)
        s.translate(-width / 2, -200)
        s.scale(2, 2)
        s.noStroke()
        const size = 100
        let x = -(size / 2)
        let y = 0
        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const waveSize = 15
            const y0 = y + s.sin(delta2 + j + x) * waveSize
            delta2 += 0.0001 // slowed
            const y2 = y + size * 1.2 + s.sin(delta2 + j + x) * waveSize
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

      function drawYellows(colors: string[]) {
        s.push()
        s.rotate(s.PI / 10)
        s.translate(-width / 2, -20)
        s.scale(2, 2)
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
            delta1 += 0.00005 // slowed
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

      function drawReds(colors: string[]) {
        s.push()
        s.rotate(s.PI / 6)
        s.translate(-width, 0)
        s.scale(1, 1)
        s.noStroke()
        const size = 100
        let x = -(size / 2)
        let y = 0
        s.beginShape(s.TRIANGLE_STRIP)
        for (let i = 0; i < colors.length - 1; i++) {
          let j = 0
          while (j < width * 2 + size / 2) {
            const waveSize = 20
            const y0 = y + s.sin(delta + j + x) * waveSize
            delta += 0.00005 // slowed down
            const y2 = y + size * 1.2 + s.sin(delta + j + x) * waveSize
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

    return () => {
      myp5.remove()
    }
  }, [theme])

  return (
    <div
      ref={sketchRef}
      className='absolute inset-0 -z-10 h-full w-full overflow-hidden bg-[#6c29e2]'
    />
  )
}
