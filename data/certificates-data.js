/**
 * ==============================================================================
 * DATA PENCAPAIAN, PRESTASI & SERTIFIKASI — YOGI FERNANDO
 * ==============================================================================
 * Berisi daftar prestasi kompetisi nasional serta sertifikasi profesional.
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
    image: "assets/certificates/lo-kreatif.jpg",
    fallbackIcon: "🏆",
    overview: "Meraih predikat Juara 1 Tingkat Nasional dalam ajang bergengsi LO KREATIF (Lomba Kreativitas Mahasiswa Nasional). Penghargaan ini mengakui keunggulan dalam perancangan produk digital, fungsionalitas arsitektur perangkat lunak, efisiensi database relasional, serta implementasi solusi teknologi yang tepat guna dan bernilai nyata bagi operasional bisnis dan industri.",
    highlights: [
      "Meraih Juara 1 Tingkat Nasional bersaing dengan puluhan universitas dan perguruan tinggi se-Indonesia",
      "Perancangan produk perangkat lunak terpadu dengan integrasi sistem kasir, manajemen inventaris, dan database relasional berkinerja tinggi",
      "Presentasi teknis dan live demo arsitektur sistem di hadapan dewan juri ahli industri teknologi nasional"
    ],
    skills: ["Inovasi Perangkat Lunak", "Fullstack Development", "Laravel", "MySQL", "Arsitektur Sistem", "UI/UX Design"],
    verifyUrl: "https://www.linkedin.com/in/yogi-fernando1"
  },
  {
    id: "dicoding-android-developer",
    title: "Pengembangan Aplikasi Android (Android Developer)",
    subtitle: "Sertifikasi Kompetensi Resmi Dicoding Academy — Google Developers Authorized Partner",
    category: "Sertifikasi Pemrograman",
    badge: "Dicoding Verified",
    issuer: "Dicoding Indonesia (Google Authorized Training Partner)",
    year: "2025",
    status: "Verified Certificate",
    image: "assets/certificates/dicoding-android.jpg",
    fallbackIcon: "📱",
    overview: "Sertifikasi kompetensi resmi dalam membangun aplikasi Android native modern berstandar industri. Memvalidasi keahlian dalam perancangan antarmuka responsif Material Design, manajemen lifecycle Activity & Fragment, penyimpanan basis data lokal, pemrosesan asynchronous di background, integrasi RESTful API, serta penerapan arsitektur MVVM dan Clean Architecture.",
    highlights: [
      "Membangun antarmuka aplikasi Android native yang responsif dan interaktif dengan prinsip Material Design",
      "Integrasi RESTful API secara asynchronous dengan error handling dan caching data lokal yang andal",
      "Lulus submission proyek aplikasi Android dengan standar review kode ketat dari reviewer profesional Dicoding"
    ],
    skills: ["Android Studio", "Kotlin / Java", "MVVM Architecture", "Retrofit REST API", "Room / SQLite Database", "Material Design"],
    verifyUrl: "https://www.linkedin.com/in/yogi-fernando1"
  },
  {
    id: "dicoding-flutter-developer",
    title: "Pengembangan Aplikasi Multi-Platform dengan Flutter & Dart",
    subtitle: "Sertifikasi Kompetensi Resmi Dicoding Academy — Mobile Cross-Platform Development",
    category: "Sertifikasi Pemrograman",
    badge: "Dicoding Verified",
    issuer: "Dicoding Indonesia (Google Authorized Training Partner)",
    year: "2024",
    status: "Verified Certificate",
    image: "assets/certificates/dicoding-flutter.jpg",
    fallbackIcon: "⚡",
    overview: "Sertifikasi kompetensi resmi dalam membangun aplikasi mobile multi-platform (Android & iOS) berkinerja tinggi dari satu basis kode (single codebase). Memvalidasi penguasaan Flutter SDK, bahasa pemrograman Dart, konstruksi hierarki Widget Tree modular, pengelolaan State Management terstruktur, konsumsi REST API, dan perancangan antarmuka pengguna yang adaptif.",
    highlights: [
      "Pengembangan aplikasi multi-platform berkinerja tinggi menggunakan Flutter SDK dan Dart",
      "Penerapan arsitektur State Management untuk pengelolaan alur data aplikasi yang terprediksi dan terisolasi",
      "Lulus evaluasi submission proyek aplikasi mobile Flutter dengan ulasan kode komprehensif dari reviewer Dicoding"
    ],
    skills: ["Flutter SDK", "Dart", "State Management (Provider/Bloc)", "Cross-Platform Mobile", "RESTful API Integration", "Custom Widgets"],
    verifyUrl: "https://www.linkedin.com/in/yogi-fernando1"
  },
  {
    id: "hacktiv8-ai-agent-programming",
    title: "IT - AI Agent for Programming",
    subtitle: "Program IBM SkillsBuild University Education bersama Hacktiv8 Indonesia · 9 jam",
    category: "Sertifikasi Pemrograman",
    badge: "IBM SkillsBuild × Hacktiv8",
    issuer: "IBM SkillsBuild — Hosted by Hacktiv8 Indonesia",
    year: "2026",
    status: "Certificate of Accomplishment",
    pdf: "assets/certificates/sertifikat hacktiv8.pdf",
    fallbackIcon: "🤖",
    previewLabel: "Certificate of Accomplishment",
    overview: "Menyelesaikan program IBM SkillsBuild University Education dengan course IT - AI Agent for Programming yang diselenggarakan oleh Hacktiv8 Indonesia, termasuk proyek akhir.",
    highlights: [
      "Menyelesaikan course IT - AI Agent for Programming",
      "Menyelesaikan proyek akhir sebagai bagian dari persyaratan program",
      "Periode pelatihan 23 Oktober 2026, total 9 jam; sertifikat diterbitkan 27 Oktober 2026"
    ],
    skills: ["AI Agents", "AI Programming", "Generative AI"],
    rotation: 0
  },
  {
    id: "ibm-intelligent-by-design-ai-agent",
    title: "Intelligent by Design: Build an AI Agent",
    subtitle: "IBM SkillsBuild completion certificate · 3 jam 30 menit",
    category: "Sertifikasi Pemrograman",
    badge: "IBM SkillsBuild",
    issuer: "IBM SkillsBuild",
    year: "2026",
    status: "Certificate of Completion",
    image: "assets/certificates/sertifikat ai.jpg",
    pdf: "assets/certificates/sertifikat ai.pdf",
    rotation: 90,
    fallbackIcon: "🤖",
    overview: "Sertifikat penyelesaian Intelligent by Design: Build an AI Agent dari IBM SkillsBuild, tercatat pada Adobe Learning Manager.",
    highlights: [
      "Menyelesaikan course Intelligent by Design: Build an AI Agent",
      "Kode course ALM-COURSE_3946359",
      "Durasi belajar 3 jam 30 menit",
      "Tanggal penyelesaian 21 Oktober 2026"
    ],
    skills: ["AI Agents", "Generative AI", "Large Language Models"]
  },
  {
    id: "ibm-build-ai-agent-badge",
    title: "Build an AI Agent",
    subtitle: "IBM SkillsBuild badge issued on 21 October 2026",
    category: "Sertifikasi Pemrograman",
    badge: "IBM SkillsBuild Badge",
    issuer: "IBM SkillsBuild",
    year: "2026",
    status: "Verified Badge",
    image: "assets/certificates/badge ai.jpg",
    pdf: "assets/certificates/badge ai.pdf",
    rotation: 0,
    fallbackIcon: "🤖",
    overview: "Badge IBM SkillsBuild untuk penyelesaian Build an AI Agent, diterbitkan kepada Yogi Fernando pada 21 Oktober 2026.",
    highlights: [
      "Menyelesaikan program Build an AI Agent dari IBM SkillsBuild",
      "Badge diterbitkan pada 21 Oktober 2026"
    ],
    skills: ["AI Agents", "Generative AI"],
    verifyUrl: "https://www.credly.com/go/otBIXMD4"
  },
  {
    id: "ibm-introduction-llm",
    title: "Introduction to Large Language Models",
    subtitle: "IBM SkillsBuild course completion certificate (1 hour 30 minutes)",
    category: "Sertifikasi Pemrograman",
    badge: "IBM SkillsBuild",
    issuer: "IBM SkillsBuild",
    year: "2026",
    status: "Certificate of Completion",
    image: "assets/certificates/intro.jpg",
    pdf: "assets/certificates/intro.pdf",
    rotation: 90,
    fallbackIcon: "📜",
    overview: "Sertifikat penyelesaian course Introduction to Large Language Models dari IBM SkillsBuild.",
    highlights: [
      "Menyelesaikan course Introduction to Large Language Models",
      "Durasi belajar tercantum 1 jam 30 menit",
      "Tanggal penyelesaian tercantum 17 Oktober 2026"
    ],
    skills: ["Large Language Models", "Generative AI"]
  },
  {
    id: "ibm-code-troubleshooting-lab",
    title: "Lab: Troubleshoot Your Code Using IBM Bob",
    subtitle: "IBM SkillsBuild lab completion certificate (30 minutes)",
    category: "Sertifikasi Pemrograman",
    badge: "IBM SkillsBuild",
    issuer: "IBM SkillsBuild",
    year: "2026",
    status: "Certificate of Completion",
    image: "assets/certificates/lab.jpg",
    pdf: "assets/certificates/lab.pdf",
    rotation: 90,
    fallbackIcon: "📜",
    overview: "Sertifikat penyelesaian lab Troubleshoot Your Code Using IBM Bob dari IBM SkillsBuild.",
    highlights: [
      "Menyelesaikan lab Troubleshoot Your Code Using IBM Bob",
      "Durasi belajar tercantum 30 menit",
      "Tanggal penyelesaian tercantum 17 Oktober 2026"
    ],
    skills: ["IBM Bob", "Code Troubleshooting"]
  }
];

if (typeof window !== "undefined") {
  window.CERTIFICATES_DATA = CERTIFICATES_DATA;
}
