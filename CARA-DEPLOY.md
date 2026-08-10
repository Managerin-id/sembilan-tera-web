# Cara Deploy Website Sembilan Tera (dari HP)

Website ini statis (HTML/CSS/JS biasa) + panel admin CMS di `/admin` biar konten
(teks, foto, personil, dsb) bisa diedit langsung dari browser HP tanpa buka
Replit atau kode sama sekali.

## Langkah 1 — Upload ke GitHub

Karena kamu kerja dari iPhone, cara paling gampang:

1. Buka **github.com** dari Safari/Chrome di HP, login.
2. Buat repo baru, misal `sembilan-tera-web` (public atau private, bebas).
3. Di halaman repo kosong, pilih **"uploading an existing file"**.
4. Upload semua file & folder dari paket ini (drag semua sekaligus kalau bisa,
   atau upload folder demi folder — GitHub mobile web mendukung upload folder
   di browser modern).
5. Commit langsung ke branch `main`.

> Alternatif: kalau kamu sudah biasa pakai Replit untuk MRequest, kamu juga
> bisa bikin Repl baru, paste semua file ini, lalu hubungkan ke GitHub repo
> baru dari situ (fitur "Connect to GitHub" di Replit).

## Langkah 2 — Connect ke Netlify

1. Buka **netlify.com**, login (bisa pakai akun GitHub yang sama).
2. **Add new site → Import an existing project → Deploy with GitHub**.
3. Pilih repo `sembilan-tera-web`.
4. Build command: **kosongkan**. Publish directory: **`.`** (titik saja).
5. Klik **Deploy**. Tunggu ~1 menit, situs langsung live di
   `nama-acak.netlify.app` (bisa diganti nama di Site settings → Domain).

## Langkah 3 — Aktifkan panel edit konten (/admin)

Ini yang bikin kamu bisa ganti teks/foto dari HP tanpa sentuh kode:

1. Di dashboard Netlify situs ini → **Site configuration → Identity → Enable Identity**.
2. Di bagian **Registration**, pilih **Invite only** (biar cuma kamu yang bisa login).
3. Scroll ke **Services → Git Gateway → Enable Git Gateway**.
4. Kembali ke tab **Identity → Invite users**, undang email kamu sendiri.
5. Cek email, klik link undangan, buat password.
6. Buka `https://situskamu.netlify.app/admin` di HP, login pakai email+password tadi.

Setelah itu, dari `/admin` kamu bisa:
- Ganti semua teks (bio, karakter musik, dll)
- Ganti/tambah foto personil & galeri dokumentasi
- Update link Spotify, Instagram, TikTok, dll
- Update nomor telepon booking

Setiap kali klik **Publish** di panel admin, otomatis ke-commit ke GitHub →
Netlify auto-redeploy dalam beberapa detik. Sama persis alur auto-deploy yang
kamu pakai di MRequest.

## Struktur file (kalau mau edit manual dari Replit)

```
index.html          → struktur halaman
styles.css           → semua styling (warna, font, layout)
script.js             → merender content/site.json ke halaman
content/site.json     → SEMUA teks & path foto (ini yang diedit CMS)
assets/img/           → semua foto band
admin/config.yml      → konfigurasi panel CMS
```

Kalau suatu saat mau ubah struktur section (bukan cuma teks/foto), edit
`index.html` + `styles.css` langsung dari Replit seperti biasa, lalu push ke
GitHub — Netlify auto-deploy.
