import { useState, useEffect, useRef } from 'react'

const STOPS = [
  'Building things that actually work.',
  'Developer.\nBuilder.\nCreator.',
  'What I work with',
  'Open to\ncollaborate',
  "Let's talk ↓",
]

const BALL     = 160   // diameter px
const PAD_L    = 24    // left edge padding
const PAD_R    = 110   // right edge padding (clears chat FAB)
const FLOOR    = 120   // px from bottom when ball hits wall
const ARC_H    = 210   // max arc height above floor

export default function ScrollBall() {
  const [xPct,    setXPct]    = useState(0)
  const [yBottom, setYBottom] = useState(FLOOR)
  const [stopIdx, setStopIdx] = useState(0)
  const [squish,  setSquish]  = useState(false)
  const prevStop = useRef(-1)

  useEffect(() => {
    const SEGS = STOPS.length - 1

    const update = () => {
      const scrolled  = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress  = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0

      const t   = progress * SEGS
      const seg = Math.min(Math.floor(t), SEGS - 1)
      const f   = t - seg

      // Horizontal position with cosine ease
      const eH = (1 - Math.cos(f * Math.PI)) / 2
      const x  = seg % 2 === 0 ? eH * 100 : (1 - eH) * 100

      // Vertical arc: sine peak in middle, zero at walls
      const arc = Math.sin(f * Math.PI) * ARC_H

      setXPct(x)
      setYBottom(FLOOR + arc)

      // Detect wall stops
      const atL = x < 5
      const atR = x > 95

      if (atL || atR) {
        const idx = Math.min(
          atL
            ? (seg % 2 === 0 ? seg : seg + 1)
            : (seg % 2 === 0 ? seg + 1 : seg),
          STOPS.length - 1
        )
        if (idx !== prevStop.current) {
          prevStop.current = idx
          setStopIdx(idx)
          setSquish(true)
          setTimeout(() => setSquish(false), 550)
        }
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const ballLeft = `calc(${PAD_L}px + (${xPct} / 100) * (100vw - ${PAD_L + PAD_R + BALL}px))`

  return (
    <div className="scrollball-root">
      {/* Shadow on the floor */}
      <div
        className={`scrollball-shadow${squish ? ' squish' : ''}`}
        style={{ left: ballLeft, opacity: Math.max(0, 1 - (yBottom - FLOOR) / ARC_H) }}
      />

      {/* Ball */}
      <div
        className={`scrollball-ball${squish ? ' squish' : ''}`}
        style={{ left: ballLeft, bottom: yBottom }}
      >
        <span className="scrollball-text">{STOPS[stopIdx]}</span>
      </div>
    </div>
  )
}
