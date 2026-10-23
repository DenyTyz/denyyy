import { hotSkills, skills } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="keahlian" className="section-block py-8 md:py-12" aria-labelledby="keahlian-judul">
      <div className="mx-auto flex max-w-7xl items-end justify-between px-5 pb-6 md:px-10">
        <h2 id="keahlian-judul" className="font-mono text-xs tracking-widest text-accent uppercase">
          03 — Keahlian
        </h2>
        <p className="hidden font-mono text-xs tracking-widest text-muted uppercase sm:block">
          Berjalan tanpa henti
        </p>
      </div>
      <div className="marquee py-8 md:py-10">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-run" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {skills.map((skill) => (
                <span
                  key={`${copy}-${skill}`}
                  className={hotSkills.has(skill) ? "marquee-item is-hot" : "marquee-item"}
                >
                  {skill}
                  <i className="marquee-mark" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
