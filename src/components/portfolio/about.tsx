export function About() {
  return (
    <section id="tentang" className="section-block mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12" data-rise-group="">
        <div className="md:col-span-5" data-rise="">
          <div className="about-frame">
            <img
              src="/media/desk.jpg"
              alt="Meja kerja gelap dengan papan ketik, buku catatan, dan cahaya monitor"
              width={1728}
              height={1152}
              data-scroll-parallax=""
              loading="lazy"
            />
          </div>
          <p className="mt-4 font-mono text-xs tracking-widest text-muted uppercase">Meja kerja · malam</p>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-rise="">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">02 — Tentang</p>
          <h2 className="mt-4 text-4xl leading-tight font-medium tracking-tight md:text-5xl">
            Gerak yang tahu kapan harus diam.
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            Saya membangun situs yang terasa seperti ruang, bukan template yang ditempeli animasi.
            Tipografi yang bernapas, gulir yang tenang, dan detail yang baru terasa pada detik kedua.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Fokusnya di front-end interaktif: React, sistem visual, dan animasi yang tetap ringan di
            perangkat biasa. Tidak setiap piksel perlu berteriak cyan.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted uppercase">Basis</dt>
              <dd className="mt-2 text-lg">Surakarta</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted uppercase">Fokus</dt>
              <dd className="mt-2 text-lg">Antarmuka & gerak</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-muted uppercase">Tumpukan</dt>
              <dd className="mt-2 text-lg">React, GSAP</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
