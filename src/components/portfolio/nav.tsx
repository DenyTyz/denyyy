import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#tentang", id: "tentang", label: "Tentang" },
  { href: "#keahlian", id: "keahlian", label: "Keahlian" },
  { href: "#karya", id: "karya", label: "Karya" },
  { href: "#kontak", id: "kontak", label: "Kontak" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav-bar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
        <a href="#atas" data-magnetic="" className="text-base font-medium tracking-tight" data-nav="atas">
          Denyyy
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Utama">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-magnetic=""
              data-nav={link.id}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <p className="hidden items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase sm:flex">
            <span className="status-dot" aria-hidden="true" />
            Terbuka
          </p>
          <button
            type="button"
            className="grid size-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
            <span className="relative block size-5">
              <Menu
                strokeWidth={1.5}
                className={
                  "icon-swap absolute inset-0 size-5 " +
                  (open ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none")
                }
              />
              <X
                strokeWidth={1.5}
                className={
                  "icon-swap absolute inset-0 size-5 " +
                  (open ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]")
                }
              />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-mobile" className="nav-panel md:hidden" aria-label="Menu">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-nav={link.id}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
