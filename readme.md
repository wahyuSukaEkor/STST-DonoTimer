# STST DonoTimer ( Saweria Trakteer Sociabuzz Tako Donathon Timer Webhook )

Jadi, gini. Rata - rata streamer atau vtuber kan punya banyak tempat donet. Terutama 4 platform ini, yaitu Saweria, Trakteer, Streamlabs, dan Tako. Nah, pas donathon kan setiap platform ada overlay timernya kan? ya kali, harus pasang empat - empatnya?. Nah, kalo pake ini bisa cuma pasang satu overlay doang.

Aplikasi ini mah, buat pembelajaran ku aja. Dan selama ini, berjalan lancar di PC ku. Kalau mau pakai tinggal clone ataupun download dari realase jika² beberapa package npmnya dihapus.

# Demonstrasi dan Tutorial Video
- [Short Version](https://youtube.com/)
- [Long Version](https://youtube.com/)

# Alat yang digunakan
- Saweria, Trakteer, Sociabuzz, dan Tako sebagai platform donasi
- OBS ataupun semua streaming software yang bisa baca text dari file sebagai penampil overlay
- Node.js - sebagai jantung hatiku

# Persiapan
- Install Node.js [LTS versi 22.11.0 pada saat pembuatan script ](https://nodejs.org/en/download/prebuilt-installer)
- Download semua file yang ada di repository ini
- Kumpulkan dalam satu folder yang sama
- Klik Shift + klik kanan mouse dalam folder tersebut, lalu klik "Open PowerShell window here" 
- Terus ketik perintah di bawah pada powershell:
```
npm install

exit
````

# Cara menggunakan
- Klik shift + klik kanan mouse terus klik "Open PowerShell window here" seperti sebelumnya.
- Terus ketik perintah
```
npm run uwu
```
- Kalau pertama kali open file tersebut dimintai konfigurasi
- Bisa langsung enter² saja(nanti bisa diedit kembali) atau sesuaikan keinginan kalian
- Pilih no.4
- Copy link url webhook di poin 4 dan paste di ke empat platform tadi
- Buka OBS atau streaming software kalian lalu create a text source dan checklist connect to local file kemudian pilih 'clock.txt' di dalam folder tadi
- Selesai

# Kelebihan aplikasi ini
- Tidak perlu mengingat waktu terakhir ketika mau offstream dan melakukan setup overlay kembali setiap mau stream.
- Tidak perlu menambahkan waktu manual kalau ada yang donate beda platform donasi
- Kalau ada donate selain rupiah di sociabuzz auto di convert jadi rupiah dan tambah waktunya tidak perlu manual lagi
- Cuma satu kali setup webhook url di empat platform
- User friendly menurutku hehe~
- Gratis dan Open source

# Kekurangan aplikasi ini
- Tidak 1 aplikasi exe
- Perlu install nodejs
- Javascript
- Developernya noobs

# Ada masalah?
Hubungi aja ekadeva di discord dengan username ekadeva :3 atau YT: @EkaDeva . Bakal dibantu selagi dia paham :v .

# Inspiration
- subathon-timer by [fajrulfx](https://github.com/fajrulfx/subathon-timer/)