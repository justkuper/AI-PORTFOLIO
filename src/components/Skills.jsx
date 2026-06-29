const categories = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind', 'Vite'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'REST APIs', 'AWS Lambda', 'Python'],
  },
  {
    label: 'Cloud & Infra',
    skills: ['AWS Amplify', 'API Gateway', 'S3', 'Git', 'CI / CD'],
  },
  {
    label: 'Tools',
    skills: ['Figma', 'AI / LLMs', 'Serverless Framework'],
  },
]

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <p className="section-label">Stack</p>
        <h2 className="section-title">What I work with</h2>
        <p className="section-sub">
          Full-stack from UI to cloud — the tools I reach for daily.
        </p>

        <div className="skills-categories">
          {categories.map(cat => (
            <div className="skills-category" key={cat.label}>
              <p className="skills-category-label">{cat.label}</p>
              <ul className="skills-category-list">
                {cat.skills.map(s => (
                  <li className="skills-category-item" key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
