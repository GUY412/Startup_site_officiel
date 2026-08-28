import { softSkills } from '../data/services.js'
import './About.css'

export default function About() {
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
          <p className="about-lead">
            <strong>OKNOK</strong> est une startup spécialisée dans les solutions numériques, la
            cybersécurité, la communication digitale, le marketing, le design multimédia et
            l’innovation technologique.
          </p>
          <p>
            Notre mission est d’accompagner les entreprises, les organisations et les entrepreneurs
            dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins.
            Nous intervenons dans plusieurs domaines, notamment la cybersécurité, le développement de
            solutions numériques, la communication digitale, le marketing, le design graphique et la
            gestion de projets innovants.
          </p>
          <p>
            Grâce à une équipe pluridisciplinaire, OKNOK combine technologie, créativité et stratégie
            pour concevoir des solutions à forte valeur ajoutée. Nous croyons que l’innovation doit
            être accessible et contribuer au développement des talents, des entreprises et des
            communautés.
          </p>
        </div>
      </section>

      <section className="section vision-section">
        <div className="container vision-inner">
          <span className="eyebrow" style={{ color: 'var(--color-accent-light)' }}>Notre vision</span>
          <p>
            Faire d’OKNOK un acteur de référence dans les solutions numériques et l’innovation en
            Afrique, en mettant la technologie, la créativité et la stratégie au service du
            développement des entreprises et des communautés.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Notre équipe</span>
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
    </>
  )
}
