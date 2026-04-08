import Section from './Section'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <Section id="experience" title="Experience" tone="plain">
      <div className="space-y-8">
        {experience.map((exp) => (
          <div
            key={exp.company + exp.period}
            className="rounded-lg border border-gh-border bg-gh-elevated/30 p-6"
          >
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <div>
                <h3 className="font-semibold text-neutral-50">{exp.role}</h3>
                <p className="text-sm text-neutral-400">{exp.company}</p>
              </div>
              <p className="text-sm text-neutral-500">
                {exp.period} · {exp.location}
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
