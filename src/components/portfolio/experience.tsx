import { useEffect, useRef, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import { Preloader } from "@/components/portfolio/preloader";

type ExperienceProps = {
  children: ReactNode;
};

export function Experience({ children }: ExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipImpl = useRef<() => void>(() => {});
  const [booting, setBooting] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    let finished = false;
    let introDone = reduce;
    let raf = 0;
    let lenis: Lenis | null = null;
    let ctx: { revert: () => void } | null = null;
    let ticker: ((time: number) => void) | null = null;
    let removeTicker: (() => void) | null = null;
    let refresh = () => {};

    const dot = root.querySelector<HTMLElement>("[data-cursor-dot]");
    const ring = root.querySelector<HTMLElement>("[data-cursor-ring]");
    const parallax = root.querySelector<HTMLElement>("[data-parallax]");

    let pointerX = -200;
    let pointerY = -200;
    let ringX = -200;
    let ringY = -200;
    let targetX = -200;
    let targetY = -200;
    let scale = 1;
    let targetScale = 1;
    let hoverX = 0;
    let hoverY = 0;
    let hoverTX = 0;
    let hoverTY = 0;
    let magnetic: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let seenPointer = false;

    const resetMagnetic = () => {
      if (!magnetic) return;
      magnetic.classList.remove("is-pulling");
      magnetic.style.transform = "";
      magnetic = null;
    };

    const resetTilt = () => {
      if (!tilt) return;
      tilt.classList.remove("is-tilting");
      tilt.style.transform = "";
      const zoom = tilt.querySelector<HTMLElement>("[data-zoom]");
      if (zoom) zoom.style.transform = "";
      tilt = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!fine || event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      targetX = pointerX;
      targetY = pointerY;
      if (!seenPointer) {
        seenPointer = true;
        ringX = pointerX;
        ringY = pointerY;
        document.documentElement.classList.add("cursor-on");
      }

      const target = event.target instanceof Element ? event.target : null;
      const nextMagnetic = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnetic && magnetic !== nextMagnetic) resetMagnetic();
      if (nextMagnetic) {
        const rect = nextMagnetic.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        nextMagnetic.classList.add("is-pulling");
        nextMagnetic.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
        targetX = rect.left + rect.width / 2 + dx * 0.25;
        targetY = rect.top + rect.height / 2 + dy * 0.25;
        magnetic = nextMagnetic;
      }

      const nextTilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilt && tilt !== nextTilt) resetTilt();
      if (nextTilt && !reduce) {
        const rect = nextTilt.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        nextTilt.classList.add("is-tilting");
        nextTilt.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 10}deg)`;
        const zoom = nextTilt.querySelector<HTMLElement>("[data-zoom]");
        if (zoom) {
          zoom.style.transform = `scale(1.08) translate(${(px - 0.5) * -12}px, ${(py - 0.5) * -12}px)`;
        }
        tilt = nextTilt;
      }

      targetScale = target?.closest("a, button, input, textarea") ? 2.2 : 1;
      hoverTX = event.clientX / window.innerWidth - 0.5;
      hoverTY = event.clientY / window.innerHeight - 0.5;
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      document.documentElement.classList.remove("cursor-on");
      seenPointer = false;
      resetMagnetic();
      resetTilt();
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      scale += (targetScale - scale) * 0.16;
      hoverX += (hoverTX - hoverX) * 0.06;
      hoverY += (hoverTY - hoverY) * 0.06;
      if (dot) {
        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (parallax && !reduce) {
        parallax.style.transform = `translate3d(${hoverX * 26}px, ${hoverY * 18}px, 0) rotateX(${hoverY * -7}deg) rotateY(${hoverX * 8}deg)`;
      }
      raf = window.requestAnimationFrame(loop);
    };

    if (fine) {
      document.documentElement.classList.add("has-cursor");
      window.addEventListener("pointermove", onPointerMove);
      document.documentElement.addEventListener("pointerout", onPointerOut);
      raf = window.requestAnimationFrame(loop);
    }

    const onLock = (event: Event) => {
      const locked = Boolean((event as CustomEvent<boolean>).detail);
      if (!lenis) return;
      if (locked) lenis.stop();
      else if (introDone) lenis.start();
    };
    window.addEventListener("portfolio:lock", onLock);

    let failSafe = 0;
    const finish = () => {
      if (finished || disposed) return;
      finished = true;
      introDone = true;
      window.clearTimeout(failSafe);
      lenis?.start();
      setBooting(false);
      window.requestAnimationFrame(() => refresh());
    };

    skipImpl.current = () => finish();
    failSafe = window.setTimeout(() => finish(), 5200);

    const boot = async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const lenisMod = await import("lenis");
      if (disposed) return;

      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      refresh = () => ScrollTrigger.refresh();

      lenis = new lenisMod.default({
        lerp: 0.085,
        smoothWheel: true,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
      });
      if (!reduce && !finished) lenis.stop();

      lenis.on("scroll", () => ScrollTrigger.update());
      ticker = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      const tick = ticker;
      removeTicker = () => gsap.ticker.remove(tick);

      ctx = gsap.context(() => {
        const progress = root.querySelector("[data-progress]");
        if (progress) {
          gsap.to(progress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.35 },
          });
        }

        if (!reduce) {
          root.querySelectorAll<HTMLElement>("[data-rise-group]").forEach((group) => {
            const items = group.querySelectorAll<HTMLElement>(":scope > [data-rise]");
            if (!items.length) return;
            gsap.from(items, {
              y: 40,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: group, start: "top 78%" },
            });
          });

          const photo = root.querySelector("[data-scroll-parallax]");
          const about = root.querySelector("#tentang");
          if (photo && about) {
            gsap.to(photo, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: about,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        }

        ["tentang", "keahlian", "karya", "kontak"].forEach((id) => {
          const trigger = root.querySelector(`#${id}`);
          if (!trigger) return;
          ScrollTrigger.create({
            trigger,
            start: "top 45%",
            end: "bottom 45%",
            onToggle: (self) => {
              root.querySelectorAll(`[data-nav="${id}"]`).forEach((link) => {
                link.classList.toggle("is-active", self.isActive);
              });
            },
          });
        });

        if (reduce || finished) return;

        const name = root.querySelector("[data-pre-name]");
        const panelTop = root.querySelector("[data-panel='top']");
        const panelBottom = root.querySelector("[data-panel='bottom']");
        const ui = root.querySelectorAll("[data-pre-ui]");
        const timeline = gsap.timeline({ onComplete: finish });
        if (name) timeline.to(name, { scale: 1.16, duration: 0.75, ease: "power2.inOut" });
        timeline
          .to(ui, { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in" }, "+=0.18")
          .add(() => {
            if (!disposed) setRevealed(true);
          })
          .to(panelTop, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "<")
          .to(panelBottom, { yPercent: 100, duration: 0.95, ease: "power4.inOut" }, "<");

        skipImpl.current = () => {
          timeline.progress(1);
        };
      }, root);

      void document.fonts?.ready.then(() => {
        if (!disposed) refresh();
      });

      if (reduce || finished) finish();
    };

    void boot();

    return () => {
      disposed = true;
      window.clearTimeout(failSafe);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("portfolio:lock", onLock);
      document.documentElement.classList.remove("has-cursor", "cursor-on");
      removeTicker?.();
      lenis?.destroy();
      ctx?.revert();
      resetMagnetic();
      resetTilt();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <div className="cursor-dot" data-cursor-dot="" />
      <div className="cursor-ring" data-cursor-ring="" />
      <div className="progress" data-progress="" />
      <div className="grain" aria-hidden="true" />
      {booting ? <Preloader onSkip={() => skipImpl.current()} /> : null}
      <div className={revealed ? "play-reveal" : undefined} inert={booting || undefined}>
        {children}
      </div>
    </div>
  );
}
