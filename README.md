# 🪐 AstroFolio — Yogi Fernando Portfolio

Website portofolio personal bertema luar angkasa yang dirancang **bersih, elegan, modern**, dan **100% siap dihosting gratis selamanya di GitHub Pages** tanpa perlu mengeluarkan uang sepeser pun untuk hosting berbayar!

---

## ✨ Fitur Unggulan

1. **Desain Elegan & Bersih**: Tipografi modern (`Space Grotesk` & `Plus Jakarta Sans`), palet warna *Deep Cosmic Obsidian* yang nyaman di mata, kontras tinggi, dan tata letak profesional.
2. **Keahlian Utama**:
   - **Backend**: Laravel, PHP
   - **Frontend**: React, JavaScript
   - **Styling**: Tailwind CSS
   - **Database**: MySQL
3. **Interaktivitas Luar Angkasa Unik**:
   - **Simulasi Tata Surya (Orbit Keahlian)**: 4 planet teknologi (React, Laravel, MySQL, Tailwind) yang mengorbit matahari (*Sol Core*), satelit berputar, tombol *Warp Speed (3x)*, dan *HUD Telemetri* saat planet diklik.
   - **Interactive Canvas Starfield**: Bintang multi-kedalaman dengan efek gravitasi halus terhadap kursor mouse, bintang jatuh periodik, serta ripple bintang saat layar diklik.
   - **Cosmic Synthesizer Sound FX**: Efek audio lembut kosmik menggunakan **Web Audio API** bawaan browser (tanpa perlu download file MP3/WAV eksternal, hemat kuota dan 100% jalan di GitHub Pages).
4. **Showcase Dokumentasi Proyek & Lightbox**:
   - Khusus dirancang untuk menampilkan dokumentasi tangkapan layar (screenshot).
   - Tampilan frame browser mockup dengan tombol kontrol (merah, kuning, hijau).
   - Modal studi kasus lengkap: slider beberapa screenshot sekaligus (Desktop vs Mobile), metrik performa, daftar fitur utama, serta tantangan teknis & solusi.
   - Halaman arsip mandiri (`projects.html`) dengan fitur pencarian langsung (Live Search).
5. **Interactive Photo Cropper**:
   - Fitur potong foto langsung di browser dengan lingkaran panduan, zoom slider, dan geser (drag/pan) foto.
   - Dapat diunduh langsung sebagai file `profile.jpg` atau diterapkan secara instan ke website.
6. **Zero-Build & Zero-Cost**: Menggunakan Vanilla HTML5, CSS3 Modern, dan Vanilla JavaScript. Tidak perlu build step (`npm run build`), tidak akan pernah error dependensi di GitHub Pages!

---

## 🚀 Panduan 1: Cara Deploy ke GitHub Pages (Gratis 100%)

GitHub Pages adalah layanan gratis dari GitHub untuk menampilkan website langsung ke publik tanpa bayar domain/hosting.

### Langkah-langkah:
1. **Buat Repositori Baru di GitHub**:
   - Buka [github.com/new](https://github.com/new).
   - Beri nama repositori, misalnya: `portfolio` atau `yogif.github.io`.
   - Pilih **Public**, lalu klik **Create repository**.

2. **Upload / Push Folder Ini ke GitHub**:
   Buka terminal di dalam folder project ini, lalu jalankan perintah berikut:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio Yogi Fernando"
   git branch -M main
   git remote add origin https://github.com/username/portfolio.git
   git push -u origin main
   ```
   *(Atau Anda juga bisa mengunggah file langsung lewat tombol **Add file > Upload files** di web GitHub jika belum terbiasa dengan git CLI).*

3. **Aktifkan Fitur GitHub Pages**:
   - Di halaman repositori GitHub Anda, klik tab **Settings** (ikon gerigi).
   - Pada menu sebelah kiri, klik **Pages**.
   - Pada bagian **Build and deployment > Source**, pilih **Deploy from a branch**.
   - Pilih Branch: **main** dan folder: **/ (root)**.
   - Klik **Save**.

Dalam 1-2 menit, website Anda sudah aktif dan bisa diakses dunia melalui:
👉 `https://username.github.io/portfolio/`

---

## 📷 Panduan 2: Cara Memasang & Memotong Foto Anda (Crop)

Website ini memiliki alat pemotong foto (cropper) interaktif bawaan:

1. Di halaman beranda, klik tombol **"📷 Pasang / Crop Foto Saya"** di bawah nama Yogi Fernando.
2. Klik tombol pilih file foto dari komputer atau HP Anda.
3. Atur posisi wajah dengan **menggeser (drag)** foto ke tengah lingkaran panduan.
4. Sesuaikan ukuran wajah dengan **slider Zoom**.
5. Klik **"✂️ Potong & Terapkan Foto"** — foto akan otomatis diterapkan dan tersimpan di browser!
6. Anda juga bisa mengklik **"💾 Unduh profile.jpg"**, lalu letakkan file tersebut ke dalam folder:
   ```
   assets/profile.jpg
   ```
   Sehingga foto profil Anda langsung muncul permanen saat diunggah ke GitHub Pages!

---

## 🖼️ Panduan 3: Cara Mengganti / Menambah Dokumentasi Gambar Proyek

1. **Simpan Gambar Screenshot Anda**:
   Masukkan file screenshot gambar Anda ke dalam folder:
   ```
   assets/projects/nama-screenshot-kamu.png
   ```

2. **Buka & Sesuaikan File Data**:
   Buka file `data/projects-data.js`. Di sana Anda dapat menambah atau mengganti informasi proyek:
   ```javascript
   {
     id: "nama-proyek-kamu",
     title: "Nama Website yang Pernah Kamu Buat",
     subtitle: "Penjelasan singkat 1 kalimat tentang website ini",
     year: "2026",
     status: "Production Ready",
     bannerImage: "assets/projects/nama-screenshot-kamu.png",
     images: [
       {
         src: "assets/projects/nama-screenshot-kamu.png",
         caption: "Tampilan Halaman Utama"
       },
       {
         src: "assets/projects/screenshot-kedua.png",
         caption: "Tampilan Versi Mobile & Fitur Lainnya"
       }
     ],
     overview: "Jelaskan latar belakang website ini dibuat...",
     tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
     metrics: [
       { label: "Waktu Muat", value: "< 1s" }
     ],
     features: [
       "Fitur pertama website",
       "Fitur kedua website"
     ],
     challenges: [
       {
         challenge: "Tantangan teknis...",
         solution: "Solusi yang diterapkan..."
       }
     ],
     liveUrl: "https://link-demo-jika-ada.com",
     githubUrl: "https://github.com/username/repo-kamu"
   }
   ```
3. Simpan file `data/projects-data.js`, lalu refresh website. Semua kartu proyek dan modal galeri gambar dokumentasi akan ter-update secara otomatis!

---

## 📬 Kontak

- **Nama**: Yogi Fernando
- **Email**: yogifernando885@gmail.com
- **Keahlian**: Laravel, PHP, React, JavaScript, Tailwind CSS, MySQL
