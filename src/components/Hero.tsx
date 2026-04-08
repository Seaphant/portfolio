import { personal } from '../data/content'

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center border-b border-gh-border px-6 pt-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(22,27,34,0.9) 0%, rgba(13,17,23,0.4) 50%, rgba(35,134,54,0.06) 100%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-medium tracking-wide text-gh-accent">{personal.subtitle}</p>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-50 sm:text-5xl md:text-6xl">
          {personal.name}
        </h1>
        <p className="mt-2 text-xl text-neutral-400 sm:text-2xl">{personal.title}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300">{personal.heroIntro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-md border border-gh-success bg-gh-success px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:border-gh-success-hover hover:bg-gh-success-hover"
          >
            Projects
          </a>
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gh-border bg-gh-elevated px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-gh-elevated-2"
          >
            Resume
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
          <a
            href="#contact"
            className="rounded-md border border-gh-border bg-transparent px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-gh-accent hover:text-neutral-50"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  )
}
