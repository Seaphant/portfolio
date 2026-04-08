import Section from './Section'
import { about } from '../data/content'

export default function About() {
  return (
    <Section id="about" title="About" tone="band">
      <div className="space-y-4">
        {about.paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-neutral-300">
            {p}
          </p>
        ))}
      </div>
    </Section>
  )
}
