const stats = [
  { number: '8',     label: 'Apps live in production' },
  { number: 'AWS',   label: 'Cloud infrastructure'    },
  { number: 'F / S', label: 'Full-stack'              },
  { number: 'Open',  label: 'To new roles'            },
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
              I build full-stack web applications end-to-end — from
              database and API design to cloud deployment and polished UI.
              I care about shipping things that are <strong>fast, reliable, and production-ready</strong>.
            </p>
            <p>
              On the frontend I work in <strong>React + TypeScript</strong>. On the backend
              I write <strong>Node.js APIs and AWS Lambda functions</strong>,
              deployed via <strong>AWS Amplify</strong> with CI/CD on every push.
            </p>
            <p>
              Every project on this page was designed and built from scratch —
              no templates, no filler. Just real work, live in production.
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
