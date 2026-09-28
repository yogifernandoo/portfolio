/**
 * ==============================================================================
 * DATA DOKUMENTASI PROYEK PORTOFOLIO — YOGI FERNANDO
 * ==============================================================================
 * Stack Utama: Laravel, PHP, MySQL, JavaScript, Tailwind CSS
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "aplikasi-kasir-cafe-unico-jambi",
    title: "Aplikasi Kasir Cafe Unico Jambi",
    subtitle: "Aplikasi kasir Android dengan akses khusus Admin, Kasir, dan Pelanggan",
    year: "2026",
    status: "Aplikasi Android",
    bannerImage: "assets/projects/uniqo/home.jpeg",
    images: [
      {
        src: "assets/projects/uniqo/home.jpeg",
        caption: "Beranda aplikasi Cafe Unico"
      },
      {
        src: "assets/projects/uniqo/dashboard_admin.jpeg",
        caption: "Dashboard admin untuk memantau operasional cafe"
      },
      {
        src: "assets/projects/uniqo/dashboard kasir.jpeg",
        caption: "Dashboard kasir untuk operasional transaksi"
      },
      {
        src: "assets/projects/uniqo/dashboardpelanggan.jpeg",
        caption: "Dashboard pelanggan untuk melihat menu dan aktivitas pesanan"
      },
      {
        src: "assets/projects/uniqo/daftar.jpeg",
        caption: "Daftar menu yang tersedia di Cafe Unico"
      },
      {
        src: "assets/projects/uniqo/deskripsi.jpeg",
        caption: "Detail menu dan informasi produk"
      },
      {
        src: "assets/projects/uniqo/specialoffers.jpeg",
        caption: "Penawaran spesial Cafe Unico"
      },
      {
        src: "assets/projects/uniqo/detailpesanan.jpeg",
        caption: "Rincian pesanan pelanggan"
      },
      {
        src: "assets/projects/uniqo/konfirmasi.jpeg",
        caption: "Konfirmasi pesanan sebelum diproses"
      },
      {
        src: "assets/projects/uniqo/riwayat.jpeg",
        caption: "Riwayat pesanan pelanggan"
      },
      {
        src: "assets/projects/uniqo/editprofile.jpeg",
        caption: "Pengaturan profil pengguna"
      },
      {
        src: "assets/projects/uniqo/cetaklaporan.jpeg",
        caption: "Cetak laporan operasional dan transaksi"
      }
    ],
    overview: "Aplikasi kasir berbasis Android untuk mendukung operasional Cafe Unico Jambi. Aplikasi menyediakan tiga jenis akses: admin, kasir, dan pelanggan. Pelanggan dapat melihat menu, penawaran, serta pesanan; sementara dashboard admin dan kasir mendukung pengelolaan operasional cafe.",
    tags: ["Android", "Aplikasi Kasir", "Point of Sale", "Multi-Role", "Cafe Unico Jambi"],
    metrics: [
      { label: "Platform", value: "Android" },
      { label: "Hak Akses", value: "3 Role" },
      { label: "Dokumentasi", value: "12 Layar" }
    ],
    features: [
      "Hak akses terpisah untuk admin, kasir, dan pelanggan",
      "Pelanggan dapat menjelajahi menu, melihat penawaran, dan mengelola pesanan",
      "Dashboard khusus untuk kebutuhan operasional admin dan kasir",
      "Rincian, konfirmasi, dan riwayat pesanan pelanggan",
      "Pengelolaan profil serta fitur cetak laporan operasional dan transaksi"
    ],
    challenges: [
      {
        challenge: "Menyajikan pengalaman yang relevan untuk tiga jenis pengguna dengan kebutuhan berbeda.",
        solution: "Menyediakan dashboard dan alur tersendiri untuk Admin, Kasir, dan Pelanggan."
      },
      {
        challenge: "Memudahkan pelanggan dan staf menelusuri pesanan dari proses pemesanan hingga riwayat.",
        solution: "Menyediakan layar rincian, konfirmasi, dan riwayat pesanan."
      }
    ],
    liveUrl: "",
    githubUrl: ""
  },
  {
    id: "siakad-smk-kelapa-sawit",
    title: "SIAKAD SMK Kelapa Sawit",
    subtitle: "Sistem Informasi Akademik Terintegrasi dengan Manajemen Multi-Role",
    year: "2024",
    status: "Production Ready",
    bannerImage: "assets/projects/siakad/home.png",
    images: [
      {
        src: "assets/projects/siakad/home.png",
        caption: "Halaman Utama (Landing Page) & Portal Login Terpusat SIAKAD"
      },
      {
        src: "assets/projects/siakad/admin.png",
        caption: "Dashboard Administrator: Kendali Penuh Sistem, Manajemen Data Master & Akses Pengguna"
      },
      {
        src: "assets/projects/siakad/guru.png",
        caption: "Portal Guru: Manajemen Kelas, Input Nilai Akademik, dan Kehadiran Siswa"
      },
      {
        src: "assets/projects/siakad/siswa.png",
        caption: "Portal Siswa: Akses Jadwal Pelajaran, Transkrip Nilai, dan Informasi Akademik"
      },
      {
        src: "assets/projects/siakad/tu.png",
        caption: "Portal Tata Usaha (TU): Administrasi Keuangan, Pembayaran, dan Manajemen Arsip Sekolah"
      }
    ],
    overview: "Sistem Informasi Akademik (SIAKAD) SMK Kelapa Sawit adalah platform manajemen operasional sekolah yang komprehensif. Aplikasi ini dirancang khusus untuk digitalisasi proses akademik dan administrasi dengan memisahkan hak akses (Role-Based Access Control) menjadi empat entitas utama: Admin, Guru, Siswa, dan Tata Usaha (TU). Sistem ini memastikan kelancaran alur informasi antar civitas akademika.",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Sistem Akademik", "Multi-Role"],
    metrics: [
      { label: "Keamanan Akses", value: "Role-Based (4 Level)" },
      { label: "Data Akademik", value: "Tersentralisasi" },
      { label: "UI / UX", value: "Responsif & Modern" }
    ],
    features: [
      "Sistem login terpusat dengan Middleware untuk otorisasi akses (Admin, Guru, Siswa, TU)",
      "Modul akademik komprehensif: penjadwalan kelas, rekap absensi, dan penginputan nilai rapor",
      "Modul administrasi Tata Usaha: pencatatan pembayaran SPP dan manajemen arsip/dokumen",
      "Portal akses mandiri untuk siswa guna memantau perkembangan akademik secara real-time",
      "Antarmuka pengguna yang bersih dan adaptif (Mobile-Friendly) menggunakan utilitas Tailwind CSS"
    ],
    challenges: [
      {
        challenge: "Mengelola isolasi data dan logika otorisasi yang kompleks di antara 4 tingkatan akses pengguna (role) agar privasi data terjamin.",
        solution: "Menerapkan struktur otentikasi kustom dan Middleware Gate/Policy dari Laravel untuk membatasi akses endpoint dan tampilan secara ketat berbasis peran pengguna."
      },
      {
        challenge: "Membangun antarmuka dashboard yang spesifik namun tetap mempertahankan konsistensi desain secara keseluruhan sistem.",
        solution: "Menggunakan sistem komponen Blade dari Laravel dan desain sistem Tailwind CSS untuk menciptakan layout dashboard yang modular, dapat digunakan ulang, namun khusus untuk tiap role."
      }
    ],
    liveUrl: "",
    githubUrl: ""
  },
  {
    id: "pos-toko-yogi",
    title: "POS TOKO YOGI",
    subtitle: "Aplikasi Point of Sale (POS) & Manajemen Kasir Toko berbasis Laravel, PHP, MySQL, JavaScript, dan Tailwind CSS",
    year: "2026",
    status: "Production Ready",
    bannerImage: "assets/projects/pos/pos (7).png",
    images: [
      {
        src: "assets/projects/pos/pos (7).png",
        caption: "Riwayat Lengkap Log Transaksi & Mutasi Kas Masuk / Keluar"
      },
      {
        src: "assets/projects/pos/pos (6).png",
        caption: "Pratinjau Cetak Struk Nota Belanja & Invoice Transaksi Kasir"
      },
      {
        src: "assets/projects/pos/pos (5).png",
        caption: "Pengaturan Profil, Manajemen Akun Kasir, & Hak Akses Admin"
      },
      {
        src: "assets/projects/pos/pos (4).png",
        caption: "Rekapitulasi Laporan Penjualan, Keuntungan, & Grafik Arus Kas"
      },
      {
        src: "assets/projects/pos/pos (3).png",
        caption: "Katalog & Manajemen Stok Barang / Produk Toko"
      },
      {
        src: "assets/projects/pos/pos (2).png",
        caption: "Menu Kasir Interaktif (Point of Sale) & Keranjang Belanja Transaksi Cepat"
      },
      {
        src: "assets/projects/pos/pos (1).png",
        caption: "Tampilan Utama Dashboard Manajemen Transaksi & Ringkasan Toko"
      }
    ],
    overview: "POS TOKO YOGI adalah sistem Point of Sale (POS) dan manajemen toko yang dirancang untuk mempermudah transaksi kasir harian, pelacakan stok produk secara real-time, pencatatan mutasi kas, serta pembuatan laporan penjualan dan keuangan toko secara cepat, akurat, dan terstruktur.",
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Point of Sale"],
    metrics: [
      { label: "Transaksi", value: "Realtime" },
      { label: "Stok Barang", value: "Sinkron Otomatis" },
      { label: "Laporan", value: "Cepat & Akurat" }
    ],
    features: [
      "Sistem transaksi kasir cepat (POS) dengan kalkulasi belanja otomatis dan multi-metode pembayaran",
      "Manajemen data master produk, kategori barang, barcode/SKU, dan notifikasi stok menipis",
      "Laporan penjualan harian/bulanan, rekapitulasi laba-rugi, serta fitur cetak struk kasir",
      "Desain antarmuka modern yang responsif dan mudah dioperasikan di berbagai perangkat",
      "Keamanan autentikasi role-based (Admin & Kasir) dengan database relasional MySQL"
    ],
    challenges: [
      {
        challenge: "Menjaga integritas data stok dan kalkulasi transaksi saat volume pembelian tinggi.",
        solution: "Menerapkan database transactions (DB::transaction) pada Laravel & MySQL InnoDB guna memastikan seluruh mutasi stok dan pembayaran tercatat konsisten."
      },
      {
        challenge: "Menyajikan antarmuka kasir yang cepat, intuitif, dan responsif tanpa reload halaman.",
        solution: "Memadukan manipulasi DOM JavaScript yang efisien serta utilitas Tailwind CSS untuk pengalaman input kasir yang instan dan proporsional."
      }
    ],
    liveUrl: "",
    githubUrl: ""
  }
];

if (typeof window !== "undefined") {
  window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
}
