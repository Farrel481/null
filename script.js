const pages = [...document.querySelectorAll('.page')];
const video = document.querySelector('#cityVideo');
const startOverlay = document.querySelector('#startOverlay');
const planning = document.querySelector('#planning');
const soundToggle = document.querySelector('.sound-toggle');
let soundOn = !video.muted;
let activeTimer;
let finishWriting = null;

const letterPages = [
  `Bunda, Farrel sadar selama ini masih sering merepotkan Bunda dan kadang terlalu memikirkan diri sendiri. Padahal dari kecil sampai sekarang, Bunda selalu berusaha memberikan yang terbaik untuk Farrel.`,
  `Farrel mungkin tidak selalu pandai mengucapkannya, tetapi Farrel sangat bersyukur. Suatu hari nanti, Farrel ingin Bunda punya ruang untuk beristirahat tanpa harus terus memikirkan beban Farrel.`,
  `Untuk sampai ke sana, Farrel perlu belajar menanggung keputusan sendiri. Rencana ini bukan jalan pintas. Ada pengorbanan, risiko yang harus dihitung, dan pekerjaan yang harus dilakukan dengan konsisten. Website ini adalah cara Farrel menjelaskannya dengan jujur.`
];

const japanPages = [
  `Bunda, selama kuliah Farrel beberapa kali merasa cemas tentang arah hidup. Keinginan Farrel untuk mencoba jalur Jepang muncul dari kebutuhan untuk punya pengalaman kerja nyata, belajar bertanggung jawab, dan membangun masa depan dengan usaha sendiri.`,
  `Data LPEM FEB UI tentang transisi tenaga kerja mengingatkan bahwa masuk ke dunia kerja tidak selalu cepat, terutama tanpa pengalaman dan bukti keterampilan. Farrel tidak memakai data itu untuk meremehkan kuliah. Farrel memakainya sebagai pengingat bahwa pengalaman, sertifikasi, dan kesiapan kerja perlu dibangun dengan sungguh-sungguh.`,
  `Farrel paham pertanyaan Bunda: bagaimana kuliah, tempat tinggal, komunikasi, biaya, dan hidup jauh dari keluarga? Kalau Farrel memilih jalur ini, konsekuensinya besar. Karena itu tidak ada bagian yang boleh dibiarkan samar.`,
  `Rencana ini hanya layak dijalankan bila pekerjaan, kontrak, biaya, dokumen, dan tempat tinggal dapat diperiksa. Bila salah satunya belum jelas, Farrel harus siap menunda.`,
  `Farrel juga tidak ingin berhenti belajar teknologi. Sambil bekerja di manufaktur teknologi industri, Farrel ingin terus belajar, mengikuti tes kompetensi, dan mengumpulkan sertifikat yang benar-benar bisa dipertanggungjawabkan.`,
  `Ini bukan sekadar rencana mencari uang. Ini usaha untuk tumbuh, bekerja dengan disiplin, dan pulang membawa pilihan yang lebih baik. Farrel tidak meminta Bunda langsung setuju. Farrel hanya ingin Bunda tahu bahwa keputusan ini sedang disusun dengan serius.`
];

let letterIndex = 0;
let japanIndex = 0;
const letterBox = document.querySelector('#typewriter');
const japanBox = document.querySelector('#japanText');

function updateSoundControl() {
  soundToggle.textContent = soundOn ? 'VIDEO SOUND: ON' : 'VIDEO SOUND: OFF';
  soundToggle.setAttribute('aria-label', soundOn ? 'Matikan suara video' : 'Nyalakan suara video');
}

function write(element, text, progress, index, total) {
  clearInterval(activeTimer);
  element.textContent = '';
  let cursor = 0;
  const finish = () => {
    clearInterval(activeTimer);
    element.textContent = text;
    finishWriting = null;
  };

  finishWriting = finish;
  activeTimer = setInterval(() => {
    element.textContent += text.charAt(cursor);
    cursor += 1;
    if (cursor >= text.length) finish();
  }, 9);
  progress.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

function writeLetter() {
  write(letterBox, letterPages[letterIndex], document.querySelector('#textProgress'), letterIndex, letterPages.length);
  document.querySelector('#nextText').innerHTML = letterIndex === letterPages.length - 1 ? 'Ke Jepang <b>→</b>' : 'Lanjut <b>»</b>';
}

function writeJapan() {
  write(japanBox, japanPages[japanIndex], document.querySelector('#japanProgress'), japanIndex, japanPages.length);
  document.querySelector('#nextJapan').innerHTML = japanIndex === japanPages.length - 1 ? 'Lihat rencana <b>✓</b>' : 'Lanjut <b>»</b>';
}

function changePage(target) {
  const current = document.querySelector('.page.active');
  current.classList.add('is-leaving');
  window.setTimeout(() => {
    current.classList.remove('active', 'is-leaving');
    const next = document.querySelector(`[data-page="${target}"]`);
    next.classList.add('active');
    document.querySelector('#chapterNumber').textContent = `0${target}`;
    if (target === 2) {
      letterIndex = 0;
      writeLetter();
    }
    if (target === 3) {
      japanIndex = 0;
      writeJapan();
    }
    document.querySelector('#proposal').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 360);
}

function showPlan(number, shouldScroll = true) {
  document.querySelectorAll('.plan-page').forEach((page) => {
    page.classList.toggle('active', Number(page.dataset.plan) === number);
  });
  document.querySelector('#planIndex').textContent = String(number).padStart(2, '0');
  if (shouldScroll) planning.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openPlanning() {
  document.body.classList.add('planning-mode');
  planning.classList.add('active');
  planning.setAttribute('aria-hidden', 'false');
  showPlan(1, true);
}

function closePlanning() {
  document.body.classList.remove('planning-mode');
  planning.classList.remove('active');
  planning.setAttribute('aria-hidden', 'true');
  pages.forEach((page) => page.classList.toggle('active', Number(page.dataset.page) === 1));
  document.querySelector('#chapterNumber').textContent = '01';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('#chapterOverlay').classList.add('visible');
    document.querySelector('#acknowledgeButton').onclick = () => {
      document.querySelector('#chapterOverlay').classList.remove('visible');
      changePage(Number(button.dataset.next));
    };
  });
});

document.querySelectorAll('[data-back]').forEach((button) => {
  button.addEventListener('click', () => changePage(Number(button.dataset.back)));
});

document.querySelector('#nextText').addEventListener('click', () => {
  if (letterIndex < letterPages.length - 1) {
    letterIndex += 1;
    writeLetter();
    return;
  }
  changePage(3);
});

document.querySelector('#nextJapan').addEventListener('click', () => {
  if (japanIndex < japanPages.length - 1) {
    japanIndex += 1;
    writeJapan();
    return;
  }
  document.querySelector('#decisionOverlay').classList.add('visible');
});

document.querySelectorAll('.typewriter').forEach((element) => {
  element.title = 'Klik untuk menampilkan seluruh teks';
  element.addEventListener('click', () => finishWriting?.());
});

document.querySelector('#startButton').addEventListener('click', async () => {
  startOverlay.style.opacity = '0';
  startOverlay.style.pointerEvents = 'none';
  window.setTimeout(() => startOverlay.remove(), 450);
  try {
    await video.play();
  } catch {
    // Browser may require another direct media interaction before it plays.
  }
});

soundToggle.addEventListener('click', async () => {
  soundOn = !soundOn;
  video.muted = !soundOn;
  updateSoundControl();
  try {
    await video.play();
  } catch {
    soundOn = false;
    video.muted = true;
    updateSoundControl();
  }
});

document.querySelector('#fullscreenVideo').addEventListener('click', () => {
  if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
});

document.querySelector('#decisionNo').addEventListener('click', () => {
  document.querySelector('#decisionOverlay').classList.remove('visible');
});

document.querySelector('#decisionYes').addEventListener('click', () => {
  document.querySelector('#decisionOverlay').classList.remove('visible');
  openPlanning();
});

document.querySelectorAll('[data-plan-next]').forEach((button) => {
  button.addEventListener('click', () => showPlan(Number(button.dataset.planNext)));
});

document.querySelectorAll('[data-plan-back]').forEach((button) => {
  button.addEventListener('click', () => showPlan(Number(button.dataset.planBack)));
});

document.querySelector('.plan-complete').addEventListener('click', closePlanning);
document.querySelector('.brand').addEventListener('click', (event) => {
  if (!document.body.classList.contains('planning-mode')) return;
  event.preventDefault();
  closePlanning();
});

const questionText = `Halo Kak, saya ingin meminta rincian tertulis untuk persiapan SSW. Sebelum mendaftar, boleh dibantu jawab beberapa hal ini?\n\n1. Program dan kelas apa yang paling sesuai untuk target manufaktur teknologi industri?\n2. Berapa rincian seluruh biaya dari pendaftaran sampai berangkat, termasuk biaya yang tidak masuk paket?\n3. Mana biaya yang dibayar sendiri, ditanggung perusahaan, atau dapat ditalang?\n4. Jika ada talangan, berapa pokok, bunga atau biaya tambahan, jadwal potongan gaji, dan ketentuan bila peserta gagal berangkat?\n5. Tes bahasa serta tes keterampilan apa yang dibutuhkan, dan apakah biayanya termasuk?\n6. Setelah job matching, dokumen apa yang diurus oleh FTI dan apa yang harus disiapkan peserta?\n7. Bagaimana status kontrak kerja, gaji pokok, lembur, potongan, tempat tinggal, serta biaya awal di Jepang dapat dilihat sebelum berangkat?\n8. Kepada siapa peserta dapat menghubungi bila ada masalah selama proses atau setelah tiba di Jepang?\n\nTerima kasih.`;

document.querySelector('#copyQuestions').addEventListener('click', async () => {
  const status = document.querySelector('#copyStatus');
  try {
    await navigator.clipboard.writeText(questionText);
    status.textContent = 'Daftar pertanyaan sudah disalin. Bunda dapat membacanya sebelum Farrel mengirimkannya.';
  } catch {
    status.textContent = 'Salin otomatis tidak tersedia di browser ini. Pertanyaan tetap dapat dibaca dari halaman ini saat diperlukan.';
  }
});

const readinessItems = [...document.querySelectorAll('[data-readiness]')];
const savedReadiness = JSON.parse(localStorage.getItem('farrel-ssw-readiness') || '[]');
readinessItems.forEach((item, index) => {
  item.checked = Boolean(savedReadiness[index]);
});

function updateReadiness() {
  const selected = readinessItems.filter((item) => item.checked).length;
  document.querySelector('#readinessCount').textContent = `${selected} dari ${readinessItems.length}`;
  localStorage.setItem('farrel-ssw-readiness', JSON.stringify(readinessItems.map((item) => item.checked)));
}

readinessItems.forEach((item) => item.addEventListener('change', updateReadiness));
updateReadiness();
updateSoundControl();
video.addEventListener('error', () => {
  document.querySelector('.video-fallback').style.display = 'grid';
});
