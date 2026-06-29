export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Available for new projects
        </div>

        <h1 className="hero-title">
          Building things<br />
          that <span className="highlight">actually work.</span>
        </h1>

        <p className="hero-sub">
          I'm Kuper — a developer and creator building apps, tools, and experiences.
          This is my launchpad: everything I ship lives here.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            See my work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in touch
          </a>
        </div>
      </div>

    </section>
  )
}
