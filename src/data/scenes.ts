export type SceneData = {
  audio: string;
  // kalimat versi TTS (ejaan suara), dipakai untuk menghitung waktu
  tts: string[];
  // kalimat versi ejaan asli, dipakai untuk subtitle (jumlah sama persis)
  subtitle: string[];
};

export const SCENES: SceneData[] = [
  {
    audio: "audio/scene01.mp3",
    tts: [
      "Setahun setelah hampir degradasi, Lester juara liga.",
      "Padahal peluangnya lima ribu banding satu.",
    ],
    subtitle: [
      "Setahun setelah hampir degradasi, Leicester juara liga.",
      "Padahal peluangnya 5.000 banding 1.",
    ],
  },
  {
    audio: "audio/scene02.mp3",
    tts: [
      "Lester lahir tahun delapan belas delapan puluh empat dengan nama Lester Foss.",
      "Lebih dari seratus tahun mereka naik turun dan tidak pernah juara liga teratas di Inggris.",
      "Tahun dua ribu delapan, mereka jatuh ke kasta ketiga untuk pertama kalinya.",
      "Delapan belas tahun kemudian, sejarah terulang.",
      "Di musim dua ribu dua puluh enam dua puluh tujuh, mereka kembali ke kasta ketiga.",
    ],
    subtitle: [
      "Leicester lahir tahun 1884 dengan nama Leicester Fosse.",
      "Lebih dari 100 tahun mereka naik turun dan tidak pernah juara liga teratas di Inggris.",
      "Tahun 2008, mereka jatuh ke kasta ketiga untuk pertama kalinya.",
      "18 tahun kemudian, sejarah terulang.",
      "Di musim 2026/27, mereka kembali ke kasta ketiga.",
    ],
  },
  {
    audio: "audio/scene03.mp3",
    tts: [
      "Tapi Lester pernah bangkit dari jurang.",
      "Musim dua ribu empat belas lima belas, mereka terpuruk di dasar klasemen.",
      "Mereka lalu menang tujuh dari sembilan laga terakhir dan selamat dari degradasi.",
    ],
    subtitle: [
      "Tapi Leicester pernah bangkit dari jurang.",
      "Musim 2014/15, mereka terpuruk di dasar klasemen.",
      "Mereka lalu menang 7 dari 9 laga terakhir dan selamat dari degradasi.",
    ],
  },
  {
    audio: "audio/scene04.mp3",
    tts: [
      "Musim berikutnya, Klaudio Ranyeri datang sebagai pelatih baru.",
      "Peluang Lester juara dipatok lima ribu banding satu.",
      "Nyaris tidak ada yang percaya.",
    ],
    subtitle: [
      "Musim berikutnya, Claudio Ranieri datang sebagai pelatih baru.",
      "Peluang Leicester juara dipatok 5.000 banding 1.",
      "Nyaris tidak ada yang percaya.",
    ],
  },
  {
    audio: "audio/scene05.mp3",
    tts: [
      "Skuad mereka termasuk yang bergaji paling rendah di liga.",
      "Jamie Vardi datang dari kasta bawah Inggris, Riyad Mahres dari kasta kedua Prancis.",
      "Ngolo Kante direkrut dari Kaen.",
    ],
    subtitle: [
      "Skuad mereka termasuk yang bergaji paling rendah di liga.",
      "Jamie Vardy datang dari kasta bawah Inggris, Riyad Mahrez dari kasta kedua Prancis.",
      "N'Golo Kanté direkrut dari Caen.",
    ],
  },
  {
    audio: "audio/scene06.mp3",
    tts: [
      "Rahasianya sederhana.",
      "Bertahan rapat, lalu serang balik secepat kilat.",
      "Lawan bahkan tidak sempat bernapas.",
    ],
    subtitle: [
      "Rahasianya sederhana.",
      "Bertahan rapat, lalu serang balik secepat kilat.",
      "Lawan bahkan tidak sempat bernapas.",
    ],
  },
  {
    audio: "audio/scene07.mp3",
    tts: [
      "Tanggal dua Mei dua ribu enam belas, gelar juara resmi milik mereka.",
      "Dengan dua laga tersisa, mimpi yang mustahil itu jadi nyata.",
    ],
    subtitle: [
      "Tanggal 2 Mei 2016, gelar juara resmi milik mereka.",
      "Dengan dua laga tersisa, mimpi yang mustahil itu jadi nyata.",
    ],
  },
  {
    audio: "audio/scene08.mp3",
    tts: [
      "Sepuluh tahun berlalu, tapi ceritanya belum selesai.",
      "Di Futbol Manejer dua puluh tujuh, saya mau membawa mereka naik lagi ke puncak.",
    ],
    subtitle: [
      "Sepuluh tahun berlalu, tapi ceritanya belum selesai.",
      "Di Football Manager 27, saya mau membawa mereka naik lagi ke puncak.",
    ],
  },
  {
    audio: "audio/scene09.mp3",
    tts: [
      "Setiap pertandingan, taktik, dan drama akan saya ceritakan di sini.",
      "Keajaiban kedua dimulai sekarang.",
    ],
    subtitle: [
      "Setiap pertandingan, taktik, dan drama akan saya ceritakan di sini.",
      "Keajaiban kedua dimulai sekarang.",
    ],
  },
];
