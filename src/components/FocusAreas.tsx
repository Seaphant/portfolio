import Section from './Section'
import { focusAreas } from '../data/content'

export default function FocusAreas() {
  return (
    <Section
      id="focus"
      title="What I actually work on"
      subtitle="Rough buckets: most projects hit more than one."
      tone="plain"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {focusAreas.map((area) => (
          <div
            key={area.title}
            className="rounded-lg border border-gh-border bg-gh-elevated/40 p-5 transition-colors hover:border-neutral-600"
          >
            <h3 className="text-sm font-semibold text-neutral-50">{area.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{area.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
