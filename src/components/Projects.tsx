import { useEffect, useState } from 'react'
import Section from './Section'
import { projects } from '../data/content'
import type { Project } from '../data/content'

function ProjectCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <div className="group rounded-lg border border-gh-border bg-gh-elevated/30 p-6 transition-colors hover:border-neutral-600 hover:bg-gh-elevated/50">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="rounded-full border border-gh-border bg-gh-inset px-3 py-1 text-xs font-medium text-neutral-300">
          {project.focus}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-neutral-500 transition-colors hover:text-gh-accent"
          onClick={(e) => e.stopPropagation()}
        >
          Repo &rarr;
        </a>
      </div>

      <h3 className="text-lg font-semibold text-neutral-50">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">{project.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-gh-border/80 bg-gh-inset px-2 py-0.5 text-xs text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="mt-4 text-sm text-gh-accent transition-colors hover:text-gh-accent-hover"
      >
        More detail &rarr;
      </button>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 px-4 py-16 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-gh-border bg-gh-elevated p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="rounded-full border border-gh-border bg-gh-inset px-3 py-1 text-xs font-medium text-neutral-300">
              {project.focus}
            </span>
            <h3
              id={`project-${project.id}-title`}
              className="mt-3 text-xl font-semibold text-neutral-50 md:text-2xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-neutral-500 transition-colors hover:bg-gh-elevated-2 hover:text-neutral-300"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-neutral-300">{project.summary}</p>

        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-neutral-50">Details</h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gh-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-neutral-50">What went wrong / what I fixed</h4>
          <ul className="space-y-2">
            {project.challenges.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gh-border bg-gh-inset/80 p-4">
          <p className="text-sm leading-relaxed text-neutral-300">
            <span className="font-medium text-neutral-200">TL;DR: </span>
            {project.whyItMatters}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-gh-border/80 bg-gh-inset px-2 py-0.5 text-xs text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md border border-gh-border bg-gh-elevated-2 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-800"
          >
            Open repo &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Firmware you can flash, plus one web app so nobody thinks I only speak registers."
      tone="band"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onSelect={() => setSelected(p)} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </Section>
  )
}
