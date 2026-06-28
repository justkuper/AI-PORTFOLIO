const skills = [
  { name: 'React',        color: '#61dafb' },
  { name: 'JavaScript',   color: '#f7df1e' },
  { name: 'HTML & CSS',   color: '#e34f26' },
  { name: 'Vite',         color: '#646cff' },
  { name: 'Node.js',      color: '#3c873a' },
  { name: 'Git',          color: '#f05032' },
  { name: 'Netlify',      color: '#00ad9f' },
  { name: 'Figma',        color: '#f24e1e' },
  { name: 'REST APIs',    color: '#7c6aff' },
  { name: 'TypeScript',   color: '#3178c6' },
  { name: 'Tailwind',     color: '#38bdf8' },
  { name: 'AI/LLMs',      color: '#a78bfa' },
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="section-label">Stack</p>
        <h2 className="section-title">What I work with</h2>
        <p className="section-sub">
          Tools and technologies I reach for when building products.
        </p>

        <div className="skills-grid">
          {skills.map(s => (
            <div className="skill-pill" key={s.name}>
              <span className="skill-dot" style={{ background: s.color }} />
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
