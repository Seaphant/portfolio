import { bgImages } from '../data/visual'

export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gh-canvas" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.09] mix-blend-screen contrast-125"
        style={{ backgroundImage: `url(${bgImages.layerA})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-[position:70%_40%] opacity-[0.06]"
        style={{ backgroundImage: `url(${bgImages.layerB})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gh-canvas via-gh-canvas/95 to-gh-canvas" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(56,139,253,0.08),transparent_55%)]" />
    </div>
  )
}
