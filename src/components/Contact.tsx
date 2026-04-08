import Section from './Section'
import { personal, contact } from '../data/content'

export default function Contact() {
  return (
    <Section id="contact" title={contact.heading} tone="plain">
      <p className="mb-8 max-w-xl text-sm leading-relaxed text-neutral-400">{contact.description}</p>
      <div className="flex flex-wrap gap-4">
        <a
          href={`mailto:${personal.email}`}
          className="rounded-md border border-gh-success bg-gh-success px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gh-success-hover hover:bg-gh-success-hover"
        >
          {personal.email}
        </a>
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-gh-border bg-gh-elevated px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-gh-elevated-2"
        >
          GitHub
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-gh-border bg-gh-elevated px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-gh-elevated-2"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-6 text-sm text-neutral-500">{personal.location}</p>
    </Section>
  )
}
