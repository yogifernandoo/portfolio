/**
 * ==============================================================================
 * DATA PENCAPAIAN, PRESTASI & SERTIFIKASI — YOGI FERNANDO
 * ==============================================================================
 * Berisi daftar prestasi kompetisi nasional dan sertifikasi profesional Dicoding (Android & Flutter).
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
    year: "2024",
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
  }
];

if (typeof window !== "undefined") {
  window.CERTIFICATES_DATA = CERTIFICATES_DATA;
}
