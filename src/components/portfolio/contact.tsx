import { useState, type FormEvent } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { XBrandIcon } from "@/components/portfolio/icons";

type Fields = {
  nama: string;
  email: string;
  pesan: string;
};

const empty: Fields = { nama: "", email: "", pesan: "" };

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Contact() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  function update(key: keyof Fields, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Fields> = {};
    if (values.nama.trim().length < 2) next.nama = "Nama perlu setidaknya 2 huruf.";
    if (!isEmail(values.email.trim())) next.email = "Masukkan email yang bisa dibalas.";
    if (values.pesan.trim().length < 8) next.pesan = "Pesan masih terlalu pendek.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(true);
    setCopied(false);
  }

  async function copyMessage() {
    const body = `Dari: ${values.nama.trim()} <${values.email.trim()}>\n\n${values.pesan.trim()}`;
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="kontak" className="section-block mx-auto max-w-7xl px-5 pt-24 pb-16 md:px-10 md:pt-32">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-mono text-xs tracking-widest text-accent uppercase">05 — Kontak</p>
          <h2 className="mt-4 text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            Mari bicara.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Ceritakan proyek, tenggat, atau sekadar arah visualnya. Pesan ini tersimpan di perangkatmu
            — salin, lalu kirim lewat jalur yang kamu pakai.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              className="social"
              data-magnetic=""
              href={profile.x}
              target="_blank"
              rel="noreferrer"
              aria-label={`X ${profile.handle}`}
            >
              <span className="float-social" style={{ animationDelay: "0s" }}>
                <XBrandIcon className="size-4" />
              </span>
            </a>
            <button
              type="button"
              className="social"
              data-magnetic=""
              aria-label="Fokus ke formulir"
              onClick={() => document.getElementById("nama")?.focus()}
            >
              <span className="float-social" style={{ animationDelay: "0.4s" }}>
                <Mail strokeWidth={1.5} className="size-4" aria-hidden="true" />
              </span>
            </button>
            <a className="social" data-magnetic="" href="#atas" aria-label="Kembali ke atas">
              <span className="float-social" style={{ animationDelay: "0.8s" }}>
                <ArrowUp strokeWidth={1.5} className="size-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
        <div className="md:col-span-7">
          {sent ? (
            <div className="note-panel border border-border bg-surface p-8" role="status">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">Tercatat</p>
              <h3 className="mt-3 text-3xl font-medium tracking-tight">Terima kasih, {values.nama.trim()}.</h3>
              <p className="mt-4 leading-relaxed text-muted">
                Pesanmu tidak dikirim ke server. Salin teksnya, lalu teruskan sendiri — lewat X{" "}
                {profile.handle} kalau mau langsung.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" data-magnetic="" onClick={copyMessage}>
                  {copied ? "Tersalin" : "Salin pesan"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  data-magnetic=""
                  onClick={() => {
                    setSent(false);
                    setValues(empty);
                  }}
                >
                  Tulis lagi
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="field">
                  <label htmlFor="nama" className="font-mono text-xs tracking-widest text-muted uppercase">
                    Nama
                  </label>
                  <input
                    id="nama"
                    name="nama"
                    autoComplete="name"
                    placeholder="Nama kamu"
                    value={values.nama}
                    aria-invalid={Boolean(errors.nama)}
                    aria-describedby={errors.nama ? "nama-error" : undefined}
                    onChange={(event) => update("nama", event.target.value)}
                    suppressHydrationWarning
                  />
                  <span className="focus-line" aria-hidden="true" />
                  {errors.nama ? (
                    <p id="nama-error" className="pt-2 text-sm text-accent">
                      {errors.nama}
                    </p>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="email" className="font-mono text-xs tracking-widest text-muted uppercase">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    value={values.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    onChange={(event) => update("email", event.target.value)}
                    suppressHydrationWarning
                  />
                  <span className="focus-line" aria-hidden="true" />
                  {errors.email ? (
                    <p id="email-error" className="pt-2 text-sm text-accent">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <label htmlFor="pesan" className="font-mono text-xs tracking-widest text-muted uppercase">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={4}
                  placeholder="Proyek, tenggat, atau arah visualnya"
                  value={values.pesan}
                  aria-invalid={Boolean(errors.pesan)}
                  aria-describedby={errors.pesan ? "pesan-error" : undefined}
                  onChange={(event) => update("pesan", event.target.value)}
                  suppressHydrationWarning
                />
                <span className="focus-line" aria-hidden="true" />
                {errors.pesan ? (
                  <p id="pesan-error" className="pt-2 text-sm text-accent">
                    {errors.pesan}
                  </p>
                ) : null}
              </div>
              <div>
                <button type="submit" className="btn btn-primary" data-magnetic="">
                  Kirim catatan
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs tracking-widest text-muted uppercase">
        <p>© 2026 Denyyy · Surakarta</p>
        <a className="nav-link" href={profile.x} target="_blank" rel="noreferrer">
          {profile.handle}
        </a>
      </footer>
    </section>
  );
}
