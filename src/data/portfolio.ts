export const profile = {
  name: "Denyyy",
  role: "Creative Frontend Developer",
  location: "Surakarta",
  x: "https://x.com/DenyOxfort",
  handle: "@DenyOxfort",
};

export const skills = [
  "React",
  "TypeScript",
  "GSAP",
  "ScrollTrigger",
  "Tailwind",
  "Lenis",
  "Figma",
  "WebGL",
  "Aksesibilitas",
  "Desain gerak",
] as const;

export const hotSkills = new Set<string>(["GSAP", "React", "WebGL"]);

export type Project = {
  id: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  image: string;
  alt: string;
  summary: string;
  role: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "arunika",
    index: "01",
    title: "Arunika",
    kind: "Studi roastery",
    year: "2026",
    image: "/media/arunika.jpg",
    alt: "Cangkir kopi hitam dengan uap tipis dan garis cahaya cyan di bibirnya",
    summary:
      "Halaman untuk roastery yang tidak berteriak. Foto diam dulu, nama merek besar, lalu scroll membuka proses sangrai seperti bab — bukan katalog yang buru-buru menjual.",
    role: "Arah visual, antarmuka, gerak",
    stack: ["React", "GSAP", "Tailwind"],
  },
  {
    id: "lar",
    index: "02",
    title: "Lar",
    kind: "Studi rumah batik",
    year: "2026",
    image: "/media/lar.jpg",
    alt: "Lipatan kain batik nila dengan tekstur malam dan cahaya samping",
    summary:
      "Antarmuka rumah batik. Kainnya yang bicara; situs hanya memberi ruang. Transisi mengikuti lipatan, lambat di awal, lalu membuka detail motif tanpa memotong ritme baca.",
    role: "Sistem visual dan narasi gulir",
    stack: ["React", "Lenis", "Figma"],
  },
  {
    id: "nol",
    index: "03",
    title: "Nol Derajat",
    kind: "Studi galeri arsitektur",
    year: "2026",
    image: "/media/nol.jpg",
    alt: "Interior beton gelap dengan celah cahaya vertikal dan lantai yang memantul",
    summary:
      "Portofolio arsitektur yang diperlakukan seperti galeri. Sedikit kata, banyak bidang kosong. Cahaya menjadi hierarki — bukan badge, bukan kartu yang seragam.",
    role: "Tata letak editorial",
    stack: ["TypeScript", "Tailwind", "GSAP"],
  },
  {
    id: "signal",
    index: "04",
    title: "Signal",
    kind: "Studi radio komunitas",
    year: "2026",
    image: "/media/signal.jpg",
    alt: "Mikrofon siaran vintage di studio yang hampir gelap, dengan titik cahaya cyan di kejauhan",
    summary:
      "Pemutar untuk radio komunitas. Kontrolnya besar, status siaran terbaca dalam satu kedipan, dan gerak gelombang tidak pernah lebih keras daripada yang sedang didengar.",
    role: "Antarmuka pemutar dan status",
    stack: ["React", "Web Audio", "GSAP"],
  },
];
