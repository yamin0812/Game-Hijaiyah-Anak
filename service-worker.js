// Nama cache untuk versi aplikasi ini
const CACHE_NAME = 'hijaiyah-game-v1';
// Daftar aset yang akan di-cache saat instalasi
const urlsToCache = [
  '/', // Root path
  '/game_hijaiyah.html',
  '/style.css', // Jika Anda memiliki file CSS terpisah
  // Tambahkan semua URL audio Anda di sini
  // Contoh:
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078280/1._A_uyy5qe.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078280/2._Ba_ncsg0j.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078280/3._ta_zqjpng.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078280/4._tsa_vro8jq.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078280/5._ja_njbn5s.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078280/6._ha_boaj9n.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078284/7._kho_nih1nx.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078284/8._da_shytpz.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078284/9._dza_z0ctpl.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078284/10._ra_txhclr.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078285/11._dza_it26hq.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078285/12._sa_ijwqqd.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078289/13._sya_nysuje.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078289/14._sho_pxqjor.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078289/15._dzho_arlcff.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078289/16._to_mm386u.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078289/17._dzooo_znc5e4.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078290/18._a_l0lxof.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078293/19._gho_eserc5.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078294/20._fa_e3i3tb.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078294/21._Qo_letumd.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078294/22_ka_u8ryfm.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078294/23._la_kxa9ks.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078295/24._ma_lfvarh.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078298/25._na_o3m09t.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078299/27._He_oypqqw.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078298/26._wa_daxzol.mp3',
  // 'https://res.cloudinary.com/defhizor0/video/upload/v1753078299/28._ya_dftlj7.mp3',

  // URL suara benar dan salah:
  'https://res.cloudinary.com/defhizor0/video/upload/v1753075099/benar_1_oy0zzh.mp3',
  'https://res.cloudinary.com/defhizor0/video/upload/v1753075099/salah_1_j97fqi.mp3',
  // Tambahkan URL untuk semua ikon Anda
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Event: Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Menambahkan semua URL ke cache
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache:', error);
      })
  );
});

// Event: Fetch (saat browser meminta resource)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak ada di cache, ambil dari jaringan
        return fetch(event.request);
      })
  );
});

// Event: Activate Service Worker (membersihkan cache lama)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Hapus cache lama
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
