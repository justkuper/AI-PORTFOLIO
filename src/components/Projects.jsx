// ─────────────────────────────────────────────
//  ADD YOUR PROJECTS HERE
//  Each object: { emoji, title, desc, tags, live, repo }
//  Set live/repo to null to hide the link.
// ─────────────────────────────────────────────
const projects = [
  {
    emoji: '💰',
    title: 'Budget Buddy',
    desc: 'A personal budgeting app to track spending, set goals, and take control of your finances.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.d3gkddadunznu6.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '🇪🇸',
    title: 'Spanish Vocab',
    desc: 'An interactive flashcard app for building Spanish vocabulary — practice words, track progress, and level up your fluency.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.d202gh3rkyayu.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '🌤️',
    title: 'Weather App',
    desc: 'A clean, real-time weather app — search any city for current conditions, temperature, and forecasts.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.d2oy2uz9qvupt6.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '📬',
    title: 'Gmail Clone',
    desc: 'A fully functional Gmail-style email client with inbox, compose, labels, and threading.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.d67pqpfwjvnp1.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '🛒',
    title: 'eBay Clone',
    desc: 'A full-featured eBay-style marketplace with product listings, search, and auction-style buying.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.d2rdn223jm15py.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '💳',
    title: 'PayPal Clone',
    desc: 'A PayPal-inspired payment platform with login, account dashboard, and transaction flows.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.dgq8ikxp4vttj.amplifyapp.com/login',
    repo: null,
  },
  {
    emoji: '🎵',
    title: 'Spotify Clone',
    desc: 'A Spotify-style music streaming UI with playlists, playback controls, and a sleek player interface.',
    tags: ['React', 'AWS Amplify'],
    live: 'https://main.d3v5ko87rbcgvh.amplifyapp.com/',
    repo: null,
  },
]

function ComingSoonCard() {
  return (
    <div className="project-card coming-soon">
      <div className="project-card-thumb">🔨</div>
      <div className="project-card-body">
        <div className="project-card-tags">
          <span className="tag">In Progress</span>
        </div>
        <div className="project-card-title">Something is cooking…</div>
        <div className="project-card-desc">
          First project dropping soon. Check back.
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ emoji, title, desc, tags, live, repo }) {
  return (
    <div className="project-card">
      <div className="project-card-thumb">{emoji}</div>
      <div className="project-card-body">
        {tags?.length > 0 && (
          <div className="project-card-tags">
            {tags.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        )}
        <div className="project-card-title">{title}</div>
        <div className="project-card-desc">{desc}</div>
        <div className="project-card-links">
          {live && (
            <a className="project-link" href={live} target="_blank" rel="noopener noreferrer">
              Live ↗
            </a>
          )}
          {repo && (
            <a className="project-link" href={repo} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const hasProjects = projects.length > 0

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <p className="section-label">Work</p>
            <h2 className="section-title">Projects</h2>
            <p className="section-sub">
              Everything built from 2026 onward — shipped from this workspace.
            </p>
          </div>
          <a
            href="https://github.com/justkuper"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            GitHub ↗
          </a>
        </div>

        <div className="projects-grid">
          {hasProjects
            ? projects.map(p => <ProjectCard key={p.title} {...p} />)
            : <ComingSoonCard />
          }
        </div>
      </div>
    </section>
  )
}
