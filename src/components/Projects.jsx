// ─────────────────────────────────────────────
//  ADD YOUR PROJECTS HERE
//  Each object: { emoji, title, desc, tags, live, repo }
//  Set live/repo to null to hide the link.
// ─────────────────────────────────────────────
const projects = [
  {
    emoji: '💰',
    title: 'Budget Buddy',
    desc: 'Full-stack personal finance app — real-time expense tracking, category breakdowns, goal setting, and a persistent data layer backed by a REST API.',
    tags: ['React', 'Node.js', 'REST API', 'AWS Amplify'],
    live: 'https://main.d3gkddadunznu6.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '🇪🇸',
    title: 'Spanish Vocab',
    desc: 'Spaced-repetition flashcard app — adaptive difficulty scoring, per-word progress tracking, streak system, and a clean mobile-first UI.',
    tags: ['React', 'LocalStorage', 'AWS Amplify'],
    live: 'https://main.d202gh3rkyayu.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '🌤️',
    title: 'Weather App',
    desc: 'Real-time weather dashboard consuming a third-party REST API — current conditions, hourly + 7-day forecasts, and city search with error handling.',
    tags: ['React', 'REST API', 'AWS Amplify'],
    live: 'https://main.d2oy2uz9qvupt6.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '📬',
    title: 'Gmail Clone',
    desc: 'Email client built from scratch — threaded inbox architecture, compose with rich-text editor, label management, and full keyboard navigation.',
    tags: ['React', 'Context API', 'AWS Amplify'],
    live: 'https://main.d67pqpfwjvnp1.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '🛒',
    title: 'eBay Clone',
    desc: 'Marketplace platform with product listings, faceted search and filter, auction-style bidding UI, and multi-step checkout flow.',
    tags: ['React', 'REST API', 'AWS Amplify'],
    live: 'https://main.d2rdn223jm15py.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '💳',
    title: 'PayPal Clone',
    desc: 'Fintech-style payment platform — JWT auth flow, protected routes, account dashboard, transaction history, and P2P transfer UI.',
    tags: ['React', 'JWT Auth', 'AWS Amplify'],
    live: 'https://main.dgq8ikxp4vttj.amplifyapp.com/login',
    repo: null,
  },
  {
    emoji: '🎵',
    title: 'Spotify Clone',
    desc: 'Music streaming interface — audio playback controls, playlist and queue management, artist/album views, and responsive mobile layout.',
    tags: ['React', 'Web Audio API', 'AWS Amplify'],
    live: 'https://main.d3v5ko87rbcgvh.amplifyapp.com/',
    repo: null,
  },
  {
    emoji: '📚',
    title: 'LearnHub',
    desc: 'E-learning platform — course catalog with category filtering, enrollment flow, progress tracking per module, and student/instructor views.',
    tags: ['React', 'Context API', 'AWS Amplify'],
    live: 'https://main.d1v684z8e11246.amplifyapp.com/',
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
