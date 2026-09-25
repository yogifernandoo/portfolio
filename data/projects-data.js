/**
 * ==============================================================================
 * DATA DOKUMENTASI PROYEK PORTOFOLIO — YOGI FERNANDO
 * ==============================================================================
 * Stack Utama: Laravel, PHP, MySQL, JavaScript, Tailwind CSS
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "pos-toko-yogi",
    title: "POS TOKO YOGI",
    subtitle: "Aplikasi Point of Sale (POS) & Manajemen Kasir Toko berbasis Laravel, PHP, MySQL, JavaScript, dan Tailwind CSS",
    year: "2026",
    status: "Production Ready",
    bannerImage: "assets/projects/pos (7).png",
    images: [
      {
        src: "assets/projects/pos (7).png",
        caption: "Riwayat Lengkap Log Transaksi & Mutasi Kas Masuk / Keluar"
      },
      {
        src: "assets/projects/pos (6).png",
        caption: "Pratinjau Cetak Struk Nota Belanja & Invoice Transaksi Kasir"
      },
      {
        src: "assets/projects/pos (5).png",
        caption: "Pengaturan Profil, Manajemen Akun Kasir, & Hak Akses Admin"
      },
      {
        src: "assets/projects/pos (4).png",
        caption: "Rekapitulasi Laporan Penjualan, Keuntungan, & Grafik Arus Kas"
      },
      {
        src: "assets/projects/pos (3).png",
        caption: "Katalog & Manajemen Stok Barang / Produk Toko"
      },
      {
        src: "assets/projects/pos (2).png",
        caption: "Menu Kasir Interaktif (Point of Sale) & Keranjang Belanja Transaksi Cepat"
      },
      {
        src: "assets/projects/pos (1).png",
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
