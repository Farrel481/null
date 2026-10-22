const pages = [...document.querySelectorAll('.page')];
const chapterNumber = document.querySelector('#chapterNumber');
const audio = document.querySelector('#introAudio');
const video = document.querySelector('#cityVideo');
const startOverlay = document.querySelector('#startOverlay');
let soundOn = true;
let activeTypeTimer;

const letterPages = [
  `Bunda, Farrel selama ini sering ngerepotin Bunda, dan Farrel kadang-kadang cukup egois.\n\nBunda selalu mengusahakan yang terbaik buat Farrel, ingin yang terbaik untuk Farrel. Bunda sekolahin Farrel di SD Islami, ngajarin Farrel bicara dari kecil, huruf Arab hijaiyah, ngajarin jalan dari kecil, menghitung, sampai masih nyusuin Farrel walau Farrel udah gede.`,
  `Farrel selalu merasa senang dan bersyukur akan hal itu, walau kadang diam-diam aja. Tapi, akan ada saatnya Bunda sudah lelah dan ingin istirahat. Saat waktu itu datang, Farrel mau kita—BUNDA—juga bisa punya tempat istirahat untuk pulang yang nyaman tanpa harus khawatir soal banyak hal lagi, bisa belanja tanpa terlalu banyak berpikir.`,
  `Tapi, untuk keluarga kita, hal itu butuh pengorbanan dan pengambilan risiko yang dikalkulasi dengan matang, konsistensi, dan perencanaan yang jelas. Untuk hal itu website ini Farrel bangun dari 0.`
];
const japanPages = [
  `Bunda, selama kuliah ini, Farrel selalu merasa janggal. Farrel merasa kurang worth it. Farrel benar-benar merasakan rasa cemasnya. Hampir 80rb fresh-graduate di Jakarta menganggur, gak langsung produktif setelah lulus. inti dari website ini adalah Farrel mau merubah arah kehidupan Farrel. Jepang, sebuah peluang yang ingin Farrel perjuangkan di usia 19 tahun ini. Dari tahun - tahun sebelumnya, Farrel sudah selalu memikirkan hal ini. Farrel punya keinginan, ambisi, dan tujuan yang ingin diwujudkan. Farrel ingin mulai membangun kemandirian, bekerja, mengembangkan diri, dan mencari kesempatan untuk menciptakan masa depan yang lebih baik. Apakah worth it? Ya. Farrel sudah research soal itu.`,
  `Farrel paham Bunda mungkin bertanya-tanya, “Bukannya Farrel sekarang masih kuliah? Bagaimana pendidikannya nanti? Apa Farrel sudah siap hidup jauh dari keluarga? Bagaimana komunikasinya? Internet gimana? Tempat tinggal?”\n\nFarrel ingin jujur sejak awal. Jika Farrel memilih berangkat melalui jalur yang mengharuskan Farrel meninggalkan pendidikan saat ini, kuliah Farrel akan berhenti. Farrel juga harus siap hidup jauh dari keluarga, bekerja setiap hari, menghadapi kesulitan, dan bertanggung jawab atas kehidupan Farrel sendiri.`,
  `Farrel mengerti bahwa ini bukan keputusan kecil. Ada pengorbanan dan risiko yang harus dipertimbangkan, sebagaimana yang telah Farrel sampaikan sebelumnya. Namun, Farrel ingin mencoba memperjuangkan peluang ini dengan serius, bukan sekadar bermodalkan keinginan atau keberanian. Farrel butuh dukungan Bunda dan diskusi soal ini dengan Bunda.`,
  `Bunda juga tidak perlu khawatir bahwa Farrel mengambil keputusan ini tanpa memikirkan kehidupan sehari-hari. Mulai dari komunikasi dengan keluarga, makanan, minuman, internet, tempat tinggal, jenis pekerjaan, hingga kebutuhan dan biaya hidup, semuanya akan dibahas dan dipertimbangkan secara terperinci di halaman-halaman berikutnya. Farrel ingin Bunda bisa melihat sendiri bagaimana rencana ini disusun, apa saja risikonya, dan bagaimana Farrel mempersiapkan diri untuk menghadapinya.\n\nFarrel tidak meminta Bunda untuk langsung menyetujui semuanya. Farrel hanya ingin Bunda memahami alasan di balik keinginan ini dan melihat bahwa Farrel sedang berusaha memikirkan masa depan dengan lebih serius.`,
  `Ini bukan sekadar keinginan untuk mencari uang. Ini adalah langkah yang ingin Farrel perjuangkan. Walau egois, INGIN sekali Farrel ambil untuk belajar mandiri, menghadapi tantangan, berusaha yang benar-benar berusaha dan membangun masa depan dengan usaha Farrel sendiri disertai support Bunda. Farrel ingin mulai cara hidup untuk Farrel sendiri. Untuk memenuhi ekspektasi Farrel sendiri, dan berkeringat untuk Farrel sendiri, dan membawa kebahagiaan untuk orang-orang terdekat Farrel. Karena selama ini, Farrel sadar bahwa kehidupan Farrel selalu bergantung ke Bunda. Namun, Farrel ga bisa selamanya seperti itu, Farrel mau mulai menjalaninya dengan tangan dan usaha Farrel sendiri.`
];

function typeInto(element, text, progress, index, total = 3) {
  clearInterval(activeTypeTimer);
  element.textContent = '';
  let i = 0;
  const speed = 9;
  activeTypeTimer = setInterval(() => {
    element.textContent += text.charAt(i++);
    if (i >= text.length) clearInterval(activeTypeTimer);
  }, speed);
  if (progress) progress.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
let letterIndex = 0, japanIndex = 0;
const letterBox = document.querySelector('#typewriter');
const japanBox = document.querySelector('#japanText');
function writeLetter(){ typeInto(letterBox, letterPages[letterIndex], document.querySelector('#textProgress'), letterIndex); document.querySelector('#nextText').innerHTML = letterIndex === 2 ? 'Ke Jepang <b>→</b>' : 'Lanjut <b>»</b>'; }
function writeJapan(){ typeInto(japanBox, japanPages[japanIndex], document.querySelector('#japanProgress'), japanIndex, japanPages.length); document.querySelector('#nextJapan').innerHTML = japanIndex === japanPages.length - 1 ? 'Selesai <b>✓</b>' : 'Lanjut <b>»</b>'; }
function changePage(target) {
  const current = document.querySelector('.page.active');
  current.classList.add('is-leaving');
  setTimeout(() => { current.classList.remove('active','is-leaving'); const next = document.querySelector(`[data-page="${target}"]`); next.classList.add('active'); chapterNumber.textContent = `0${target}`; if(target === 2) { letterIndex=0; writeLetter(); } if(target === 3) { japanIndex=0; writeJapan(); } document.querySelector('#proposal').scrollIntoView({behavior:'smooth',block:'start'}); }, 360);
}
document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => { document.querySelector('#chapterOverlay').classList.add('visible'); document.querySelector('#acknowledgeButton').onclick = () => { document.querySelector('#chapterOverlay').classList.remove('visible'); changePage(+btn.dataset.next); }; }));
document.querySelectorAll('[data-back]').forEach(btn => btn.addEventListener('click', () => changePage(+btn.dataset.back)));
document.querySelector('#nextText').addEventListener('click', () => { if(letterIndex < 2) { letterIndex++; writeLetter(); } else changePage(3); });
document.querySelector('#nextJapan').addEventListener('click', () => { if(japanIndex < japanPages.length - 1) { japanIndex++; writeJapan(); } else window.scrollTo({top:0,behavior:'smooth'}); });
document.querySelector('#startButton').addEventListener('click', async () => { startOverlay.style.opacity='0'; startOverlay.style.pointerEvents='none'; setTimeout(()=>startOverlay.remove(),450); try { await video.play(); if(soundOn){ audio.currentTime=0; await audio.play(); setTimeout(()=>{ audio.pause(); audio.currentTime=0; },5000); } } catch(e){} });
document.querySelector('.sound-toggle').addEventListener('click', e => { soundOn=!soundOn; audio.muted=!soundOn; e.currentTarget.textContent = soundOn ? 'SOUND: ON' : 'SOUND: OFF'; });
document.querySelector('#fullscreenVideo').addEventListener('click', () => { if(video.requestFullscreen) video.requestFullscreen(); });
video.addEventListener('error',()=>document.querySelector('.video-fallback').style.display='grid');
