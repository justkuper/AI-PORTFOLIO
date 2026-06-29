import { useState, useEffect, useRef } from 'react'

const STOPS = [
  'Scroll to explore the portfolio.',
  'Full-stack: React · Node.js · AWS.',
  '5+ apps shipped and live in production.',
  'Open to freelance & collaborations.',
  'Made it to the bottom — say hello! 👋',
]

const BALL = 44  // diameter px
const PAD  = 32  // edge padding px

export default function ScrollBall() {
  const [xPct,    setXPct]    = useState(0)
  const [stopIdx, setStopIdx] = useState(0)
  const [squish,  setSquish]  = useState(false)
  const [atEdge,  setAtEdge]  = useState(true)
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
      // cosine ease — slow at edges, fast in middle
      const e   = (1 - Math.cos(f * Math.PI)) / 2
      const x   = seg % 2 === 0 ? e * 100 : (1 - e) * 100

      setXPct(x)

      const atL = x < 6
      const atR = x > 94
      setAtEdge(atL || atR)

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
          setTimeout(() => setSquish(false), 500)
        }
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // CSS left for the ball (keeps it inside PAD on both edges)
  const ballLeft = `calc(${PAD}px + (${xPct} / 100) * (100vw - ${PAD * 2 + BALL}px))`

  // Bubble anchors left when ball is on left half, right when on right half
  const onLeft = xPct <= 50

  return (
    <div className="scrollball-root">
      {/* Shadow */}
      <div
        className={`scrollball-shadow${squish ? ' squish' : ''}`}
        style={{ left: ballLeft }}
      />

      {/* Ball */}
      <div
        className={`scrollball-ball${squish ? ' squish' : ''}`}
        style={{ left: ballLeft }}
      />

      {/* Info bubble */}
      <div
        className={`scrollball-bubble${atEdge ? ' visible' : ''}${onLeft ? ' anchor-left' : ' anchor-right'}`}
        style={{ left: ballLeft }}
      >
        {STOPS[stopIdx]}
      </div>
    </div>
  )
}
