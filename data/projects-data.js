/**
 * ==============================================================================
 * DATA DOKUMENTASI PROYEK PORTOFOLIO
 * ==============================================================================
 * Stack Utama: Laravel, PHP, React, JavaScript, Tailwind CSS, MySQL
 * Kamu bisa dengan mudah menambahkan atau mengganti screenshot gambar di folder "assets/projects/", 
 * lalu sesuaikan nilai "images", "title", dan "overview" di bawah ini.
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "apex-commerce",
    title: "ApexStore E-Commerce & Marketplace Web",
    subtitle: "Aplikasi e-commerce berbasis Laravel, PHP, dan MySQL dengan styling modern menggunakan Tailwind CSS",
    year: "2026",
    status: "Production Ready",
    bannerImage: "assets/projects/project1-ecommerce.svg",
    images: [
      {
        src: "assets/projects/project1-ecommerce.svg",
        caption: "Tampilan Utama Dashboard Manajemen Produk, Pesanan, dan Grafik Penjualan"
      },
      {
        src: "assets/projects/project1-mobile.svg",
        caption: "Dokumentasi Tampilan Mobile Responsive & Halaman Katalog Belanja"
      }
    ],
    overview: "ApexStore dibangun untuk memenuhi kebutuhan jual-beli online dengan sistem manajemen inventaris yang cepat. Menggunakan framework Laravel dan database MySQL, sistem ini mampu menangani transaksi pemesanan secara efisien dengan tampilan yang elegan dan responsif menggunakan Tailwind CSS.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    metrics: [
      { label: "Waktu Muat", value: "< 0.9s" },
      { label: "Efisiensi Query", value: "Optimal" },
      { label: "Responsive", value: "Mobile First" }
    ],
    features: [
      "Katalog produk interaktif dengan pencarian cepat menggunakan JavaScript",
      "Sistem keranjang belanja, checkout, dan manajemen status pembayaran",
      "Panel dashboard admin untuk mengelola stok produk, kategori, dan laporan pesanan",
      "Perancangan basis data relasional MySQL dengan skema yang terorganisir rapi"
    ],
    challenges: [
      {
        challenge: "Pengelolaan relasi antar tabel (produk, kategori, pengguna, pesanan) yang semakin kompleks.",
        solution: "Mengoptimalkan relasi Eloquent ORM Laravel dengan teknik Eager Loading (with()) untuk mencegah masalah query berulang (N+1 query problem)."
      },
      {
        challenge: "Membuat tampilan antarmuka yang modern dan responsif di berbagai resolusi layar.",
        solution: "Memanfaatkan utilitas Tailwind CSS dengan prinsip mobile-first serta integrasi komponen interaktif JavaScript."
      }
    ],
    liveUrl: "https://example.com/demo-apexstore",
    githubUrl: "https://github.com/yogif/apexstore-laravel"
  },
  {
    id: "sim-dashboard",
    title: "Sistem Informasi Manajemen & Telemetri Server",
    subtitle: "Web aplikasi dashboard analitik berbasis React, JavaScript, Tailwind CSS, dan backend Laravel REST API",
    year: "2025 - 2026",
    status: "Live Deployment",
    bannerImage: "assets/projects/project2-dashboard.svg",
    images: [
      {
        src: "assets/projects/project2-dashboard.svg",
        caption: "Visualisasi Topologi Jaringan, Monitor Kesehatan Node, dan Log Aktivitas"
      }
    ],
    overview: "Platform web dashboard untuk memonitor operasional data dan status server. Frontend dibangun dengan React dan Tailwind CSS untuk pengalaman pengguna yang dinamis, terhubung ke backend Laravel yang mengelola data di database MySQL.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Laravel API", "MySQL"],
    metrics: [
      { label: "Respon API", value: "< 50ms" },
      { label: "Komponen", value: "Modular React" },
      { label: "Styling", value: "Tailwind CSS" }
    ],
    features: [
      "Antarmuka pengguna interaktif berbasis React Components yang modular dan reusable",
      "Penyajian data analitik dengan grafik visual interaktif dan panel ringkasan performa",
      "RESTful API backend Laravel dengan format response JSON terstandarisasi",
      "Penyimpanan log dan histori metrik secara terstruktur di database MySQL"
    ],
    challenges: [
      {
        challenge: "Sinkronisasi state frontend React dengan data dari API Laravel tanpa lag.",
        solution: "Penerapan state management berbasis React Hooks dan caching fetch request agar data tetap sinkron dan hemat bandwidth."
      },
      {
        challenge: "Penyusunan tabel database log yang memiliki jutaan baris data.",
        solution: "Membuat indeks pada kolom timestamp dan status di database MySQL untuk mempercepat proses filter data."
      }
    ],
    liveUrl: "https://example.com/demo-dashboard",
    githubUrl: "https://github.com/yogif/react-laravel-dashboard"
  },
  {
    id: "astronova-explorer",
    title: "AstroNova Interactive Space Explorer",
    subtitle: "Aplikasi penjelajah edukasi luar angkasa dengan visualisasi 3D planet berbasis React, JavaScript & Tailwind CSS",
    year: "2025",
    status: "Open Source",
    bannerImage: "assets/projects/project3-orbit.svg",
    images: [
      {
        src: "assets/projects/project3-orbit.svg",
        caption: "Tampilan Spektrometri dan Visualisasi 3D Planet Ekstrasurya"
      }
    ],
    overview: "Sebagai penggemar astronomi, saya merancang platform edukasi interaktif ini untuk memvisualisasikan katalog planet ekstrasurya (exoplanet). Menggunakan React dan JavaScript untuk merender interaksi antarmuka yang halus serta Tailwind CSS untuk tata letak visual bernuansa luar angkasa.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Canvas API", "MySQL Data"],
    metrics: [
      { label: "Animasi", value: "Smooth 60 FPS" },
      { label: "Katalog", value: "500+ Planet" },
      { label: "Antarmuka", value: "Dark Cosmic" }
    ],
    features: [
      "Visualisasi orbit planet interaktif dengan perhitungan sudut rotasi astronomis",
      "Pencarian cerdas data planet berdasarkan jarak tahun cahaya dan suhu",
      "Komponen React terstruktur rapi untuk mempermudah penambahan data baru",
      "Tampilan gelap kosmik yang dirancang presisi dengan utilitas Tailwind CSS"
    ],
    challenges: [
      {
        challenge: "Menjaga animasi orbit dan kanvas partikel bintang tetap ringan di perangkat spesifikasi standar.",
        solution: "Mengoptimalkan requestAnimationFrame dan meminimalisir re-render React yang tidak perlu pada elemen kanvas."
      }
    ],
    liveUrl: "https://example.com/demo-astronova",
    githubUrl: "https://github.com/yogif/astronova-react"
  },
  {
    id: "pos-finance",
    title: "Sistem Kasir & Manajemen Keuangan Usaha",
    subtitle: "Aplikasi kasir (Point of Sale) & pencatatan transaksi kas berbasis Laravel, PHP, MySQL, dan Tailwind CSS",
    year: "2024 - 2025",
    status: "Client Delivery",
    bannerImage: "assets/projects/project4-fintech.svg",
    images: [
      {
        src: "assets/projects/project4-fintech.svg",
        caption: "Tampilan Ringkasan Kas Usaha, Manajemen Transaksi, dan Riwayat Mutasi Keuangan"
      }
    ],
    overview: "Aplikasi pencatatan arus kas dan transaksi kasir harian untuk pelaku usaha. Memudahkan rekap pendapatan dan pengeluaran harian, cetak invoice nota transaksi, serta laporan keuangan berkala.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    metrics: [
      { label: "Validasi", value: "Form Request" },
      { label: "Database", value: "MySQL InnoDB" },
      { label: "Keamanan", value: "CSRF & Auth" }
    ],
    features: [
      "Input transaksi kasir cepat dengan perhitungan total belanja dan diskon otomatis",
      "Pencatatan riwayat transaksi mutasi debet/kredit yang tercatat rapi di database MySQL",
      "Fitur export laporan keuangan dalam format cetak nota dan file spreadsheet",
      "Antarmuka bersih dan responsif berkat styling utilitas Tailwind CSS"
    ],
    challenges: [
      {
        challenge: "Integritas data transaksi keuangan saat terjadi banyak pencatatan secara bersamaan.",
        solution: "Menggunakan database transactions (DB::transaction) pada Laravel dan engine InnoDB MySQL untuk memastikan data tersimpan secara konsisten."
      }
    ],
    liveUrl: "https://example.com/demo-pos-finance",
    githubUrl: "https://github.com/yogif/laravel-pos-system"
  }
];

if (typeof window !== "undefined") {
  window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
}
