# ElexMart - Marketplace Barang Elektronik

Selamat datang di kode sumber website **ElexMart**! Website marketplace jual-beli barang elektronik modern bernuansa *Electric Blue*, siap dipublikasikan langsung ke GitHub Pages.

## 🚀 Fitur Utama
- **Desain Modern Electric Blue**: Tampilan futuristik dengan Tailwind CSS & Font Awesome.
- **Autentikasi & Akun**: Sistem Login & Register pengguna.
- **Buka Toko & Jual Barang**: Pengguna dapat mengaktifkan toko dan mempublikasikan produk elektronik milik mereka sendiri.
- **Keranjang Belanja & Checkout**: Fitur cart realtime dengan kalkulasi total harga.
- **Sistem Notifikasi**: Notifikasi realtime saat pendaftaran, pembuatan toko, posting barang, dan transaksi.
- **Dukungan CNAME / GitHub Pages**: Siap di-deploy langsung ke domain kustom Anda.

## 📂 Struktur File ZIP
- `index.html` : Halaman utama, struktur UI, modal login/register, dan form toko.
- `styles.css` : Custom CSS, scrollbar, dan efek glow electric.
- `app.js` : Logika interaktif JavaScript (Cart, Auth, Toko, Notifikasi, Produk).
- `CNAME` : File konfigurasi domain kustom untuk GitHub Pages.
- `README.md` : Panduan instalasi dan deployment.

## 🌐 Cara Deploy ke GitHub Pages & CNAME
1. Ekstrak file ZIP ini ke komputer Anda.
2. Buat repositori baru di GitHub (misal: `elexmart`).
3. Upload seluruh file (`index.html`, `styles.css`, `app.js`, `CNAME`, `README.md`) ke repositori GitHub Anda.
4. Buka **Settings** -> **Pages** di repositori GitHub Anda.
5. Pilih branch `main` dan folder `/root`, lalu klik **Save**.
6. Jika Anda menggunakan custom domain, edit isi file `CNAME` sesuai nama domain Anda (misal: `toko-elexmart.com`) dan atur DNS A Record/CNAME Record di penyedia domain Anda.

---
Created for ElexMart Marketplace.
