import Section from './Section'
import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Stuff I have actually used on shipped repos." tone="band">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-sm font-semibold text-neutral-50">{group.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-gh-border bg-gh-inset px-2.5 py-1 text-xs text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
