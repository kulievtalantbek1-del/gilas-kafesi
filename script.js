/* ===== МЕНЮ МААЛЫМАТЫ =====
   Формат: [аталышы, сүрөттөмөсү, баасы (сом), сүрөт URL ('' болсо placeholder)]
   Төртүнчү жер — сүрөттүн аты: images/аты.jpg файлын салыңыз (мисалы images/plov.jpg).
   Файл жок болсо, автоматтык placeholder көрүнөт. Толук URL (https://...) да жазса болот.
   Бардык баалар — МИСАЛ, кафе өзү тактайт. */
const MENU = {
  'Улуттук тамактар': [
    ['Ош палоо (плов)', 'Күрүч, эт жана сабиз менен салттуу даярдалат.', 350, 'plov'],
    ['Лагман', 'Колго жасалган кесме, эт жана жашылчалар.', 300, 'lagman'],
    ['Манты', 'Буу менен бышырылган, эт жана пияз салынган.', 350, 'manty']],
  'Эт тамактары': [
    ['Куурдак', 'Жаңы эттен жасалган ысык куурдак.', 450, 'kuurdak'],
    ['Шашлык', 'Отто бышырылган жумшак эт.', 450, 'shashlyk']],
  'Шорполор': [
    ['Шорпо', 'Эт жана картошка менен жылуу шорпо.', 250, 'shorpo'],
    ['Мастава', 'Күрүч жана жашылчалар кошулган шорпо.', 250, 'mastava']],
  'Салаттар': [
    ['Жаңы салат', 'Жашылчалардан жасалган жеңил салат.', 250, 'salat'],
    ['Ачуу-чучук салат', 'Помидор жана пияз менен.', 200, 'achuu-salat']],
  'Гарнирлер': [
    ['Картошка фри', 'Кытырак картошка.', 200, 'fri'],
    ['Гречка', 'Ысык гарнир.', 150, 'grechka']],
  'Ысык тамактар': [
    ['Самса', 'Тандырда бышкан, эт салынган.', 100, 'samsa'],
    ['Дымлама', 'Эт жана жашылчалар кошулган ысык тамак.', 450, 'dymlama']],
  'Нан жана токочтор': [
    ['Тандыр нан', 'Жаңы бышкан жылуу нан.', 50, 'nan'],
    ['Токоч', 'Үй стилиндеги жумшак токоч.', 40, 'tokoch']],
  'Суусундуктар': [
    ['Чай', 'Жыпар жытташкан ысык чай.', 100, 'chai'],
    ['Компот', 'Кургатылган мөмөлөрдөн.', 150, 'kompot']],
  'Десерттер': [
    ['Чак-чак', 'Бал менен даярдалган таттуу.', 250, 'chak-chak'],
    ['Торт', 'Кофеге же чайга ылайыктуу.', 250, 'tort']]
};

/* ===== ГАЛЕРЕЯ: [аталышы, сүрөт URL] ('' болсо placeholder) ===== */
const GALLERY = ['','Лагман','Манты','Шорпо','Куурдак','Шашлык','Салат','Самса','Нан','Чай','Десерт'].map((n, i) => [n, ['plov', 'lagman', 'manty', 'shorpo', 'kuurdak', 'shashlyk', 'salat', 'samsa', 'nan', 'chai', 'desert'][i]]);

/* images/ папкасындагы файл же URL; табылбаса placeholder */
const IMG_DIR='images/';
const src = v => /^https?:/.test(v) ? v : IMG_DIR + v + '.jpg';
const fallback = (img, t, h, slug) => { img.onerror = null; img.src = placeholder(t, h, slug); };

/* Сүрөт жок болсо — ылайыктуу placeholder (SVG) */
const EMOJI = {plov:'🍛',lagman:'🍜',manty:'🥟',kuurdak:'🍳',shashlyk:'🍢',shorpo:'🍲',mastava:'🍲',salat:'🥗','achuu-salat':'🥗',fri:'🍟',grechka:'🍚',samsa:'🥧',dymlama:'🥘',nan:'🫓',tokoch:'🥯',chai:'🍵',kompot:'🍹','chak-chak':'🍯',tort:'🍰',desert:'🍰'};
function placeholder(text, h = 300, slug = '') {
  const e = EMOJI[slug] || '🍽️';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='${h}'><defs><radialGradient id='g' cx='50%' cy='40%' r='75%'><stop offset='0' stop-color='#f7ecd0'/><stop offset='1' stop-color='#d9c08a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><circle cx='200' cy='${h/2-14}' r='70' fill='#fff' opacity='.55'/><text x='50%' y='${h/2+14}' font-size='84' text-anchor='middle'>${e}</text><text x='50%' y='${h-22}' fill='#3b2a20' font-family='Georgia' font-size='20' text-anchor='middle'>${text}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/* ===== МЕНЮНУ КӨРСӨТҮҮ ===== */
const tabs = document.getElementById('tabs');
const grid = document.getElementById('menuGrid');

function showCategory(cat) {
  tabs.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.textContent === cat));
  grid.innerHTML = MENU[cat].map(([name, desc, price, img]) => `
    <article class="dish">
      <div class="dish__img"><img src="${src(img)}" alt="${name}" loading="lazy" onerror="fallback(this,'${name}',300,'${img}')"></div>
      <div class="dish__body"><h3>${name}</h3><p>${desc}</p><span class="price">${price} сом</span></div>
    </article>`).join('');
}
Object.keys(MENU).forEach(cat => {
  const b = document.createElement('button');
  b.textContent = cat;
  b.onclick = () => showCategory(cat);
  tabs.appendChild(b);
});
showCategory(Object.keys(MENU)[0]);

/* ===== ГАЛЕРЕЯ + LIGHTBOX ===== */
const gal = document.getElementById('galleryGrid');
const box = document.getElementById('lightbox');
const boxImg = box.querySelector('img');
gal.innerHTML = GALLERY.map(([n, s2], i) =>
  `<img src="${src(s2)}" alt="${n}" loading="lazy" onerror="fallback(this,'${n}',${200+(i%3)*80},'${s2}')">`).join('');
gal.addEventListener('click', e => {
  if (e.target.tagName !== 'IMG') return;
  boxImg.src = e.target.src; boxImg.alt = e.target.alt; box.hidden = false;
});
box.addEventListener('click', () => box.hidden = true);
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });

/* ===== MOBILE HAMBURGER ===== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.onclick = () => burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

/* ===== SCROLL REVEAL ===== */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
