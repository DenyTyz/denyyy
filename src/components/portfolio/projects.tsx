import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";

function lockScroll(open: boolean) {
  window.dispatchEvent(new CustomEvent("portfolio:lock", { detail: open }));
}

function Study({ project }: { project: Project }) {
  return (
    <Dialog.Root onOpenChange={lockScroll}>
      <Dialog.Trigger asChild>
        <button type="button" className="project-card" data-tilt="">
          <div className="project-media">
            <img src={project.image} alt={project.alt} width={1728} height={1152} data-zoom="" loading="lazy" />
          </div>
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-muted uppercase">{project.kind}</p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight">{project.title}</h3>
            </div>
            <span className="mt-1 inline-flex items-center gap-2 font-mono text-xs text-muted tabular-nums">
              {project.year}
              <ArrowUpRight strokeWidth={1.5} className="arrow-nudge size-4 text-accent" aria-hidden="true" />
            </span>
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content" data-lenis-prevent="">
          <div className="grid gap-0 md:grid-cols-2">
            <img
              src={project.image}
              alt=""
              width={1728}
              height={1152}
              className="h-56 w-full object-cover md:h-full"
            />
            <div className="relative p-6 md:p-8">
              <Dialog.Close
                type="button"
                className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border border-border"
                aria-label="Tutup"
              >
                <X strokeWidth={1.5} className="size-4" />
              </Dialog.Close>
              <p className="font-mono text-xs tracking-widest text-accent uppercase">
                {project.index} — {project.kind}
              </p>
              <Dialog.Title className="mt-3 pr-12 text-3xl font-medium tracking-tight">
                {project.title}
              </Dialog.Title>
              <Dialog.Description className="mt-4 leading-relaxed text-muted">
                {project.summary}
              </Dialog.Description>
              <p className="mt-6 text-sm text-fg">{project.role}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs tracking-wide text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-mono text-xs tracking-widest text-muted uppercase">
                Studi konsep · {project.year}
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Projects() {
  return (
    <section id="karya" className="section-block mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-widest text-accent uppercase">04 — Karya</p>
          <h2 className="mt-4 max-w-xl text-4xl leading-tight font-medium tracking-tight md:text-5xl">
            Empat studi, satu suhu visual.
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted md:block">
          Arahkan kursor ke kartu. Miringnya mengikuti tangan, gambarnya mendekat pelan.
        </p>
      </div>
      <div className="project-grid mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2" data-rise-group="">
        {projects.map((project) => (
          <div key={project.id} data-rise="">
            <Study project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
