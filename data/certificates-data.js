/**
 * ==============================================================================
 * DATA PENCAPAIAN, PRESTASI & SERTIFIKASI — YOGI FERNANDO
 * ==============================================================================
 * Berisi daftar prestasi kompetisi nasional dan sertifikasi profesional Dicoding.
 * Anda dapat dengan mudah meletakkan foto sertifikat di folder "assets/certificates/"
 * (misal: lo-kreatif.png, dicoding-web.png, dicoding-pemrograman.png).
 */

const CERTIFICATES_DATA = [
  {
    id: "lo-kreatif-juara-1",
    title: "Juara 1 Tingkat Nasional — LO KREATIF",
    subtitle: "Lomba Kreativitas Mahasiswa Tingkat Nasional Bidang Inovasi Teknologi & Perangkat Lunak",
    category: "Penghargaan & Prestasi",
    badge: "🏆 Juara 1 Nasional",
    issuer: "LO KREATIF (APTISI Wilayah VII / Kemendikbudristek)",
    year: "2024",
    status: "Verified Champion",
    image: "assets/certificates/lo-kreatif.png",
    fallbackIcon: "🏆",
    overview: "Meraih predikat Juara 1 Tingkat Nasional dalam ajang bergengsi LO KREATIF (Lomba Kreativitas Mahasiswa Nasional). Penghargaan ini mengakui keunggulan dalam perancangan produk digital, fungsionalitas arsitektur perangkat lunak, serta implementasi solusi teknologi yang tepat guna dan bernilai nyata bagi masyarakat dan industri.",
    highlights: [
      "Juara 1 Tingkat Nasional bersaing dengan puluhan universitas dan politeknik se-Indonesia",
      "Perancangan produk digital terpadu dengan integrasi backend dan database yang efisien",
      "Presentasi teknis dan live demo arsitektur sistem di hadapan dewan juri ahli industri teknologi"
    ],
    skills: ["Inovasi Perangkat Lunak", "Fullstack Development", "Laravel", "MySQL", "Problem Solving", "UI/UX Design"],
    verifyUrl: "https://www.linkedin.com/in/yogi-fernando1"
  },
  {
    id: "dicoding-web-developer",
    title: "Belajar Membuat Aplikasi Web dengan React / Modern Web",
    subtitle: "Sertifikasi Kompetensi Front-End Web Developer & Modern JavaScript",
    category: "Sertifikasi Pemrograman",
    badge: "Dicoding Verified",
    issuer: "Dicoding Indonesia (Google Developers Authorized Partner)",
    year: "2024",
    status: "Verified Certificate",
    image: "assets/certificates/dicoding-web.png",
    fallbackIcon: "📜",
    overview: "Sertifikasi resmi penyelesaian kurikulum berstandar industri global dari Dicoding Indonesia. Memvalidasi kemampuan dalam membangun antarmuka web modern, manipulasi DOM interaktif, modularitas komponen, pengelolaan state, dan konsumsi RESTful API.",
    highlights: [
      "Penguasaan standar ES6+ JavaScript, asynchronous programming (Promise, Async/Await), dan Fetch API",
      "Pembangunan komponen UI yang modular, efisien, dan responsif di berbagai perangkat",
      "Lulus submission proyek akhir dengan review kode komprehensif dari tim reviewer profesional Dicoding"
    ],
    skills: ["React.js", "Modern JavaScript (ES6+)", "RESTful API Integration", "Modular Components", "Clean Code"],
    verifyUrl: "https://www.dicoding.com"
  },
  {
    id: "dicoding-dasar-pemrograman",
    title: "Belajar Dasar Pemrograman & Software Engineering",
    subtitle: "Sertifikasi Kompetensi Logika Pemrograman, Algoritma, & Arsitektur Kode",
    category: "Sertifikasi Pemrograman",
    badge: "Dicoding Verified",
    issuer: "Dicoding Indonesia",
    year: "2024",
    status: "Verified Certificate",
    image: "assets/certificates/dicoding-dasar.png",
    fallbackIcon: "🎓",
    overview: "Sertifikasi kelulusan kurikulum dasar rekayasa perangkat lunak terakreditasi industri. Memvalidasi pemahaman mendalam tentang logika komputasional, struktur data, paradigma pemrograman terstruktur, dan best practices software development.",
    highlights: [
      "Pemahaman konsep dasar komputasi, algoritma pemecahan masalah, dan struktur data",
      "Prinsip clean code, penamaan variabel semantik, dan modularitas fungsi",
      "Fondasi kokoh dalam transisi ke framework enterprise seperti Laravel dan library modern seperti React"
    ],
    skills: ["Software Engineering", "Algoritma & Struktur Data", "Logic & Problem Solving", "Git & GitHub"],
    verifyUrl: "https://www.dicoding.com"
  }
];

if (typeof window !== "undefined") {
  window.CERTIFICATES_DATA = CERTIFICATES_DATA;
}
