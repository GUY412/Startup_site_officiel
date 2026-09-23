import { useEffect, useState } from 'react'
import { api, mediaUrl, toList } from '../lib/api.js'
import './About.css'

export default function About() {
  const [team, setTeam] = useState([])
  const [settings, setSettings] = useState({})

  useEffect(() => {
    api.team
      .list()
      .then(setTeam)
      .catch(() => setTeam([]))
    api.settings.get().then(setSettings).catch(() => setSettings({}))
  }, [])

  const softSkills = toList(settings.soft_skills)

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>À propos</span>
          <h1>Qui sommes-nous ?</h1>
        </div>
      </section>

      <section className="section">
        <div className="container about-content">
          <p className="about-lead">{settings.about_lead}</p>
          <p>{settings.about_mission}</p>
          <p>{settings.about_description}</p>
        </div>
      </section>

      <section className="section vision-section">
        <div className="container vision-inner">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Notre vision</span>
          <p>{settings.about_vision}</p>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Notre équipe</span>
              <h2>Les personnes derrière OKNOK</h2>
            </div>

            <div className="team-grid">
              {team.map((member) => (
                <div className="card team-card" key={member.id}>
                  {member.photo_path ? (
                    <img className="team-photo" src={mediaUrl(member.photo_path)} alt={member.name} />
                  ) : (
                    <div className="team-photo team-photo-placeholder" aria-hidden="true">
                      {member.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <div className="team-card-body">
                    <h3>{member.name}</h3>
                    {member.role && <span className="team-role">{member.role}</span>}
                    {member.bio && <p>{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {softSkills.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Nos qualités</span>
              <h2>Des compétences transversales</h2>
              <p>Au-delà des outils, ce sont ces qualités qui guident chacune de nos missions.</p>
            </div>

            <ul className="skills-grid">
              {softSkills.map((skill) => (
                <li key={skill} className="skill-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
