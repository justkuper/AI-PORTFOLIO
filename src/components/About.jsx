const stats = [
  { number: '2026',  label: 'Current year'       },
  { number: '∞',     label: 'Projects incoming'  },
  { number: '100%',  label: 'Built with React'   },
  { number: '0→1',   label: 'Mode always on'     },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="section-label">About</p>
            <h2 className="section-title">Developer.<br />Builder. Creator.</h2>

            <p>
              I build things end-to-end — from idea to deployed product.
              Whether it's a web app, a tool, or an experiment, I care about
              making it <strong>fast, clean, and useful</strong>.
            </p>
            <p>
              This portfolio is my running launchpad. Every project you see here
              was designed and built from scratch in 2026. No legacy code, no
              filler — just the work.
            </p>
            <p>
              I work primarily with <strong>React, JavaScript, and modern web
              tooling</strong>, with a strong eye for design and user experience.
            </p>
          </div>

          <div className="about-stats">
            {stats.map(s => (
              <div className="stat-card" key={s.label}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
