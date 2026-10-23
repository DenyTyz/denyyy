import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/portfolio/split-text";

export function Hero() {
  return (
    <section id="atas" className="section-block relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pt-28 pb-20 md:min-h-svh md:grid-cols-12 md:px-10 md:pt-24">
        <div className="md:col-span-7">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">Portofolio · 2026</p>
          <h1 className="mt-6">
            <SplitText text="Hi, I'm" className="hero-kicker block" />
            <SplitText text="Denyyy" className="hero-name mt-2 block" />
          </h1>
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
            data-hero-in=""
            style={{ animationDelay: "220ms" }}
          >
            Saya menyusun antarmuka seperti seseorang menyusun ruang: ritme dulu, baru hiasan. Bergerak
            kalau ada gunanya — dari Surakarta, untuk layar yang ingin terasa presisi.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3"
            data-hero-in=""
            style={{ animationDelay: "320ms" }}
          >
            <a href="#karya" data-magnetic="" className="btn btn-primary">
              Lihat karya
              <ArrowUpRight strokeWidth={1.5} className="size-4" aria-hidden="true" />
            </a>
            <a href="#kontak" data-magnetic="" className="btn btn-ghost">
              Hubungi saya
            </a>
          </div>
        </div>
        <div className="md:col-span-5" data-hero-in="" style={{ animationDelay: "160ms" }}>
          <div className="parallax-stage">
            <figure className="hero-frame aspect-[3/4]" data-parallax="">
              <img
                src="/media/hero.jpg"
                alt="Monolit kaca gelap dengan garis cahaya cyan di salah satu sisinya"
                width={1200}
                height={1600}
              />
            </figure>
          </div>
          <p className="mt-4 flex items-center justify-between font-mono text-xs tracking-widest text-muted uppercase">
            <span>Monolit · studi cahaya</span>
            <span>01</span>
          </p>
        </div>
      </div>
    </section>
  );
}
