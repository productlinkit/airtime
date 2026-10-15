// ===== Data (edit freely; connect to your real API later) =====
const COUNTRIES = {
  ALL: { name: "" },
  ID: { name: "Indonesia", prefix: "+62", cur: "IDR" },
  TH: { name: "Thailand", prefix: "+66", cur: "THB" },
  MM: { name: "Myanmar", prefix: "+95", cur: "MMK" },
  KH: { name: "Cambodia", prefix: "+855", cur: "USD" },
  LA: { name: "Laos", prefix: "+856", cur: "LAK" },
  VN: { name: "Vietnam", prefix: "+84", cur: "VND" },
  PK: { name: "Pakistan", prefix: "+92", cur: "PKR" }
};

// price in IDR; "face" is the amount in local currency shown on the tile
const OPERATORS = [
  { id: "tsel", name: "Telkomsel", c: "ID", credit: [[10000, 12500], [25000, 28000], [50000, 52500], [100000, 102500]], data: [["Data 8 GB / 30d", 45000], ["Data 15 GB / 30d", 69000], ["Data 30 GB / 30d", 99000]] },
  { id: "indosat", name: "Indosat", c: "ID", credit: [[10000, 12000], [25000, 27500], [50000, 52000], [100000, 102000]], data: [["Data 10 GB / 30d", 50000], ["Data 25 GB / 30d", 85000]] },
  { id: "xl", name: "XL", c: "ID", credit: [[10000, 12000], [25000, 27500], [50000, 52000], [100000, 102000]], data: [["Data 12 GB / 30d", 55000], ["Data 30 GB / 30d", 95000]] },
  { id: "ais", name: "AIS", c: "TH", credit: [[50, 35303], [100, 70317], [300, 210720], [500, 351295]], data: [["Data 5 GB / 7d", 42000], ["Data 15 GB / 30d", 98000]] },
  { id: "dtac", name: "DTAC", c: "TH", credit: [[50, 35303], [100, 70317], [300, 210720], [500, 351295]], data: [["Data 6 GB / 7d", 44000]] },
  { id: "mytel", name: "Mytel", c: "MM", credit: [[1000, 8200], [3000, 24000], [5000, 40000], [10000, 79000]], data: [["Data 3 GB / 30d", 30000], ["Data 10 GB / 30d", 78000]] },
  { id: "atom", name: "Atom", c: "MM", credit: [[1000, 8200], [3000, 24000], [5000, 40000], [10000, 79000]], data: [["Data 5 GB / 30d", 45000]] },
  { id: "cellcard", name: "Cellcard", c: "KH", credit: [[1, 16500], [3, 49000], [5, 81000], [10, 160000]], data: [["Data 5 GB / 30d", 40000]] },
  { id: "metfone", name: "Metfone", c: "KH", credit: [[1, 16500], [3, 49000], [5, 81000], [10, 160000]], data: [["Data 8 GB / 30d", 52000]] },
  { id: "unitel", name: "Unitel", c: "LA", credit: [[10000, 7500], [20000, 14500], [50000, 36000], [100000, 71000]], data: [["Data 5 GB / 30d", 38000]] },
  { id: "viettel", name: "Viettel", c: "VN", credit: [[50000, 32000], [100000, 63000], [200000, 124000], [500000, 308000]], data: [["Data 6 GB / 30d", 47000]] },
  { id: "jazz", name: "Jazz", c: "PK", credit: [[100, 6000], [200, 12000], [500, 29500], [1000, 58000]], data: [["Data 10 GB / 30d", 60000]] }
];

// Indonesian number prefixes (local "08xx" format) -> operator id
const ID_PREFIXES = {
  tsel: ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"],
  indosat: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
  xl: ["0817", "0818", "0819", "0859", "0877", "0878"]
};

// ===== UI text =====
// English page copy lives in index.html (data-i18n); only form/JS strings are listed under "en".
const STRINGS = {
  en: {
    langBtn: "EN", allCountries: "All countries", tabCredit: "Credit", tabData: "Data", country: "Country", operator: "Operator",
    phone: "Phone number", phonePh: "e.g. 0812 3456 7890", tabGift: "Gift cards", phoneHint: "Enter the number with country code or local format.",
    amount: "Amount", total: "Total payment", buy: "Buy now",
    needBoth: "Enter the phone number and choose an amount to continue.",
    needPhone: "Enter a valid phone number to continue.",
    needAmount: "Choose an amount to continue.",
    errLong: "This number is too long. Use 15 digits or fewer.",
    errShort: "This number is too short. Check that it has at least 8 digits.",
    detected: op => `${op} number detected.`,
    langLabel: "Language: English", openMenu: "Open menu", closeMenu: "Close menu",
    prev: "Previous", next: "Next", svcList: "Services",
    opLabel: (name, t) => `${name} ${t === "credit" ? "Credit" : "Data"}`,
    creditItem: (op, face) => `${op.name} ${face}`, feeLine: f => `Includes admin fee ${f}`,
    dataItem: (op, name) => `${op.name} ${name}`,
    close: "Close", processing: "Processing payment…",
    okTitle: "Top-up on its way", okText: (name, phone) => `${name} is being sent to ${phone}. Most top-ups arrive within a few minutes.`,
    okDone: "Done", okAgain: "Top up another number",
    failTitle: "Payment didn't go through",
    failRetry: "Try again", failHelp: "Chat on WhatsApp",
    failText: "We couldn't complete this payment. Try again. If you were charged, chat with us on WhatsApp and we'll refund it.",
    chooseCard: "Choose a card", showCard: n => `Show ${n}`,
    getsCredit: v => `${v} credit`, countryName: {}, ccGo: "Top up", ccAria: c => `Top up a number in ${c}`,
    recentRemove: n => `Remove ${n}`, recentGo: (op, n) => `Top up ${op} ${n} again`,
    orderRef: r => `Order ${r}`, trackPaid: "Payment received", trackSending: "Sending to operator", trackDone: "Delivered", trackFailed: "Delivery failed",
    deliveredTitle: "Top-up delivered", deliveredText: (name, phone) => `${name} has arrived on ${phone}.`,
    undelTitle: "Top-up couldn't be delivered", undelText: "Your payment went through, but the operator didn't accept the top-up. You'll get a full refund to your original payment method.",
    refundBtn: "Request refund on WhatsApp", waMsg: (ref, name, phone) => `Hi Airtime, I need help with order ${ref}: ${name} to ${phone}.`
  },
  id: {
    langBtn: "ID", allCountries: "Semua negara", tabCredit: "Pulsa", tabData: "Kuota", country: "Negara", operator: "Operator",
    phone: "Nomor HP", phonePh: "contoh 0812 3456 7890", tabGift: "Gift card",
    giftText: "Gift card untuk game, hiburan, dan belanja tersedia di halaman gift card kami, dengan harga yang terlihat sebelum Anda bayar.", giftBtn: "Lihat gift card", phoneHint: "Masukkan nomor dengan kode negara atau format lokal (08xx).",
    amount: "Nominal", total: "Total bayar", buy: "Beli sekarang",
    needBoth: "Isi nomor HP dan pilih nominal untuk melanjutkan.",
    needPhone: "Isi nomor HP yang valid untuk melanjutkan.",
    needAmount: "Pilih nominal untuk melanjutkan.",
    errLong: "Nomor terlalu panjang. Maksimal 15 digit.",
    errShort: "Nomor terlalu pendek. Pastikan minimal 8 digit.",
    detected: op => `Nomor ${op} terdeteksi.`,
    langLabel: "Bahasa: Indonesia", openMenu: "Buka menu", closeMenu: "Tutup menu",
    prev: "Sebelumnya", next: "Berikutnya", svcList: "Layanan",
    svcChip: "Layanan", ch1: "Isi ulang", ch2: "Internet", ch3: "Voucher", ch4: "Tagihan",
    // page copy
    title: "Airtime | Pulsa, Kuota, Gift Card & Tagihan",
    skip: "Langsung ke form pembelian",
    navCredit: "Kirim pulsa", navSvc: "Layanan", navBiz: "Untuk bisnis", navHelp: "Bantuan", login: "Masuk member",
    h1: "Kirim pulsa dan kuota <mark>ke nomor mana pun</mark>, dari mana saja",
    lead: "Isi pulsa atau kuota dalam beberapa langkah. Total harga terlihat sebelum Anda bayar.",
    as1: "Pembayaran aman", as2: "Pengiriman cepat", as3: "Tanpa biaya tersembunyi",
    cta1: "Isi pulsa sekarang", cta2: "Lihat gift card",
    works: "Mendukung Telkomsel, Indosat, XL, AIS, DTAC, Viettel, Jazz, dan 150+ operator lainnya.",
    svcH: "Pulsa, kuota, dan tagihan di satu tempat",
    svcSub: "Pulsa, paket data, gift card, dan tagihan bulanan, dibayar dalam satu checkout.",
    s1h: "Pulsa", s1p: "Isi pulsa nomor sendiri atau kirim ke keluarga dan teman di luar negeri.", s1a: "Kirim pulsa",
    s2h: "Paket data", s2p: "Paket internet dengan kuota dan masa aktif yang jelas sejak awal.", s2a: "Beli kuota",
    s3h: "Gift card", s3p: "Kode digital untuk game, hiburan, dan belanja.",
    s4h: "Tagihan", s4p: "Tagihan listrik, air, dan gas. Pembayaran online segera hadir.",
    howH: "Cara kerjanya",
    st1h: "Pilih produk", st1p: "Pulsa, paket data, gift card, atau tagihan.",
    st2h: "Isi data", st2p: "Nomor HP penerima, email, ID pelanggan, atau nomor meter.",
    st3h: "Periksa dan bayar", st3p: "Cek nominal, operator, dan total termasuk biaya sebelum konfirmasi.",
    st4h: "Terima struk", st4p: "Status pengiriman dan struk digital dikirim begitu transaksi selesai.",
    covH: "Negara tujuan", covSub: "150+ operator seluler di negara-negara ini, dan terus bertambah.",
    tabOps: "Operator seluler", tabUtils: "Tagihan", countryName: { KH: "Kamboja" }, ccGo: "Isi ulang", ccAria: c => `Isi ulang nomor di ${c}`,
    u1h: "Listrik", u1p: "Bayar tagihan listrik atau beli token listrik prabayar.",
    u2h: "Air", u2p: "Bayar tagihan air di wilayah yang didukung.",
    u3h: "Gas", u3p: "Bayar tagihan gas di checkout yang sama.", soon: "Segera hadir",
    trH: "Kenapa orang percaya Airtime",
    t1h: "Checkout aman", t1p: "Pembayaran dienkripsi dan diproses dengan aman.",
    t2h: "Harga transparan", t2p: "Semua biaya admin ditampilkan sebelum Anda bayar.",
    t3h: "Struk untuk setiap pembelian", t3p: "Lacak setiap transaksi dan simpan struk digitalnya.",
    faqH: "Pertanyaan",
    q1: "Apakah Airtime tersedia di seluruh dunia?", a1: "Saat ini Airtime mendukung beberapa negara di Asia, dan wilayah serta fitur baru terus ditambahkan.",
    q2: "Bisakah membeli tanpa akun?", a2: "Bisa. Cukup masukkan alamat email untuk menerima voucher atau struk.",
    q3: "Bagaimana jika transaksi gagal?", a3: "Jika pembayaran berhasil tetapi pengiriman gagal, sistem kami otomatis menandai transaksinya. Hubungi kami dan kami akan menyelesaikan atau mengembalikan dananya.",
    q4: "Apakah ada biaya tambahan?", a4: "Tidak ada biaya tersembunyi. Total bayar yang tampil sebelum pembayaran sudah termasuk semua biaya admin.",
    q5: "Berapa lama pulsa atau kuota masuk?", a5: "Sebagian besar isi ulang masuk dalam beberapa menit setelah pembayaran dikonfirmasi. Jika belum masuk setelah 30 menit, hubungi kami di WhatsApp dengan menyertakan struk.",
    q6: "Bagaimana proses refund?", a6: "Jika isi ulang tidak bisa dikirim, dana dikembalikan penuh ke metode pembayaran awal. Kirim nomor struk Anda lewat WhatsApp dan kami akan memprosesnya.",
    helpT: "Masih butuh bantuan?", helpBtn: "Chat di WhatsApp",
    helpP: 'Kirim nomor struk Anda lewat WhatsApp, atau email <a href="mailto:support@linkit360.co.id">support@linkit360.co.id</a>.',
    fTag: "Isi ulang prabayar, paket data, tagihan, dan gift card digital dengan pengiriman instan.",
    fProd: "Produk", fTopup: "Isi ulang Airtime", fCo: "Perusahaan", fVendor: "Masuk vendor", fContact: "Hubungi kami",
    fRights: "Hak cipta dilindungi.",
    opLabel: (name, t) => `${t === "credit" ? "Pulsa" : "Kuota"} ${name}`,
    creditItem: (op, face) => `Pulsa ${op.name} ${face}`, feeLine: f => `Sudah termasuk biaya admin ${f}`,
    dataItem: (op, name) => `${op.name} ${name.replace(/^Data/, "Kuota").replace(/(\d+)d$/, "$1 hari")}`,
    rvTitle: "Periksa pesanan", rvProduct: "Produk", rvEdit: "Ubah pesanan", rvPay: "Konfirmasi & bayar",
    rvNote: "Pastikan nomor tujuan sudah benar sebelum membayar. Total sudah termasuk semua biaya.",
    close: "Tutup", processing: "Memproses pembayaran…",
    okTitle: "Isi ulang sedang dikirim", okText: (name, phone) => `${name} sedang dikirim ke ${phone}. Biasanya masuk dalam beberapa menit.`,
    okDone: "Selesai", okAgain: "Isi nomor lain",
    failTitle: "Pembayaran belum berhasil", failText: "Pembayaran ini belum bisa diselesaikan. Coba lagi. Kalau saldo Anda sudah terpotong, chat kami di WhatsApp dan dananya akan kami kembalikan.",
    chooseCard: "Pilih kartu", showCard: n => `Tampilkan ${n}`,
    rvGets: "Diterima", rvFee: "Biaya admin", rvPrice: "Harga produk", getsCredit: v => `Pulsa ${v}`,
    recentTitle: "Isi ulang lagi", recentNote: "Hanya tersimpan di perangkat ini.", recentRemove: n => `Hapus ${n}`, recentGo: (op, n) => `Isi ulang ${op} ${n} lagi`,
    orderRef: r => `Pesanan ${r}`, trackPaid: "Pembayaran diterima", trackSending: "Dikirim ke operator", trackDone: "Terkirim", trackFailed: "Gagal terkirim",
    deliveredTitle: "Isi ulang sudah masuk", deliveredText: (name, phone) => `${name} sudah masuk ke ${phone}.`,
    undelTitle: "Isi ulang tidak bisa dikirim", undelText: "Pembayaran Anda berhasil, tapi operator menolak isi ulang ini. Dana akan dikembalikan penuh ke metode pembayaran awal.",
    refundBtn: "Minta refund di WhatsApp", waMsg: (ref, name, phone) => `Halo Airtime, saya butuh bantuan untuk pesanan ${ref}: ${name} ke ${phone}.`,
    buyHelp: 'Butuh bantuan? <a href="https://wa.me/6289655913961" target="_blank" rel="noopener">Chat di WhatsApp</a>, setiap hari 08.00–22.00 WIB',
    hours: "Layanan WhatsApp: setiap hari, 08.00–22.00 WIB",
    failRetry: "Coba lagi", failHelp: "Chat di WhatsApp"
  }
};

// ===== State =====
const $ = id => document.getElementById(id);
// one money format everywhere: Indonesian grouping ("10.000"); rupiah as "Rp", other currencies by code
const money = (n, cur = "IDR") => (cur === "IDR" ? "Rp" : cur) + "\u00a0" + n.toLocaleString("id-ID"); // no-break space keeps "Rp 10.000" on one line
const rp = n => money(n);
// TODO: placeholder admin fee until the pricing API returns one per product
const DEFAULT_FEE = 2500;
let type = "credit", selected = null, lastDetected = "", detectedOp = null, phoneTouched = false;

function storage(key, val) {
  try { return val === undefined ? localStorage.getItem(key) : localStorage.setItem(key, val); } catch { return null; }
}
function pickLang() {
  const q = new URLSearchParams(location.search).get("lang");
  const l = q || storage("lang") || (navigator.language || "").slice(0, 2).toLowerCase();
  return STRINGS[l] ? l : "en";
}
let lang = pickLang();
const EN_PAGE = {}; // English copy read from the HTML on first render
const t = key => STRINGS[lang][key] ?? STRINGS.en[key] ?? EN_PAGE[key];

// ===== Smart default: guess the visitor's country =====
// 1) explicit site language, 2) IP country injected by the server/CDN
//    (e.g. <html data-country="ID"> from Cloudflare's CF-IPCountry header),
// 3) browser languages, 4) device time zone.
const LANG_COUNTRY = { id: "ID", th: "TH", my: "MM", km: "KH", lo: "LA", vi: "VN", ur: "PK" };
const TZ_COUNTRY = {
  "Asia/Jakarta": "ID", "Asia/Pontianak": "ID", "Asia/Makassar": "ID", "Asia/Jayapura": "ID",
  "Asia/Bangkok": "TH", "Asia/Yangon": "MM", "Asia/Rangoon": "MM", "Asia/Phnom_Penh": "KH",
  "Asia/Vientiane": "LA", "Asia/Ho_Chi_Minh": "VN", "Asia/Saigon": "VN", "Asia/Karachi": "PK"
};
function guessCountry() {
  if (lang !== "en" && LANG_COUNTRY[lang]) return LANG_COUNTRY[lang];
  const ip = (document.documentElement.dataset.country || "").toUpperCase();
  if (COUNTRIES[ip] && ip !== "ALL") return ip;
  for (const l of navigator.languages || [navigator.language || ""]) {
    const c = LANG_COUNTRY[l.slice(0, 2).toLowerCase()];
    if (c) return c;
  }
  try { return TZ_COUNTRY[Intl.DateTimeFormat().resolvedOptions().timeZone] || "ALL"; } catch { return "ALL"; }
}

// ===== Detect country + operator from what the visitor types =====
function detectFromPhone(raw) {
  let d = raw.replace(/[^\d+]/g, "");
  if (d.startsWith("00")) d = "+" + d.slice(2);
  let country = null;
  if (d.startsWith("+")) {
    // longest prefix first so +855/+856 win over shorter codes
    const hit = Object.entries(COUNTRIES).filter(([, v]) => v.prefix)
      .sort((a, b) => b[1].prefix.length - a[1].prefix.length)
      .find(([, v]) => d.startsWith(v.prefix));
    if (!hit) return {};
    country = hit[0];
    d = d.slice(hit[1].prefix.length);
    if (country === "ID") d = "0" + d.replace(/^0/, "");
  } else if (d.startsWith("628")) {
    country = "ID"; d = "0" + d.slice(2);
  } else if (d.startsWith("08") && ["ID", "ALL"].includes($("country").value)) {
    country = "ID";
  }
  if (country !== "ID" || d.length < 4) return { country };
  const op = Object.keys(ID_PREFIXES).find(k => ID_PREFIXES[k].includes(d.slice(0, 4)));
  return { country, op };
}
function applyPhoneDetection() {
  const { country, op } = detectFromPhone($("phone").value);
  const key = `${country || ""}|${op || ""}`;
  if (key === lastDetected) return; // don't fight a manual choice on every keystroke
  lastDetected = key;
  detectedOp = op || null;
  if (country && $("country").value !== country) { $("country").value = country; renderOperators(); }
  if (op && $("operator").value !== op) { $("operator").value = op; renderAmounts(); }
}

// ===== Render =====
function renderCountries() {
  const cur = $("country").value || guessCountry();
  $("country").innerHTML = Object.entries(COUNTRIES).map(([k, v]) =>
    `<option value="${k}">${v.prefix ? `${v.name} (${v.prefix})` : t("allCountries")}</option>`).join("");
  $("country").value = cur;
}
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.dataset.i18n;
    if (!(k in EN_PAGE)) EN_PAGE[k] = el.innerHTML;
    el.innerHTML = t(k); // trusted copy from STRINGS / the page itself
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  if (!EN_PAGE.title) EN_PAGE.title = document.title;
  document.title = t("title");
  $("langBtn").textContent = t("langBtn");
  $("langBtn").setAttribute("aria-label", t("langLabel"));
  $("burger").setAttribute("aria-label", t($("nav").classList.contains("open") ? "closeMenu" : "openMenu"));
  sheet.querySelectorAll(".icon-btn").forEach(b => b.setAttribute("aria-label", t("close")));
  if (typeof renderRecent === "function" && $("recentList")) renderRecent();
  if ($("countryGrid")) renderCountryGrid();
  if ($("svcTrack")) { renderDots(); updateSlider(curSlide); } // applyLang only runs after the slider is set up
  ["svcPrev:prev", "svcNext:next", "svcTrack:svcList"].forEach(p => { const [id, k] = p.split(":"); if ($(id)) $(id).setAttribute("aria-label", t(k)); });
}
function renderOperators() {
  const c = $("country").value;
  const list = OPERATORS.filter(o => c === "ALL" || o.c === c);
  const prev = $("operator").value;
  $("operator").innerHTML = list.map(o => `<option value="${o.id}">${t("opLabel")(o.name, type)}</option>`).join("");
  if (list.some(o => o.id === prev)) $("operator").value = prev;
  renderAmounts();
}
function currentOp() { return OPERATORS.find(o => o.id === $("operator").value); }
function items() {
  const op = currentOp(); if (!op) return [];
  // admin fee in IDR, already inside the price. Rupiah credit: price minus face value; otherwise from the pricing data
  const cur = COUNTRIES[op.c].cur, fees = (op.fees && op.fees[type]) || [];
  const feeOf = (i, price, face) => fees[i] ?? (type === "credit" && cur === "IDR" ? price - face : DEFAULT_FEE);
  if (type === "credit") return op.credit.map(([face, price], i) => ({ name: t("creditItem")(op, money(face, cur)), price, fee: feeOf(i, price, face),
    gets: t("getsCredit")(money(face, cur)) }));
  return op.data.map(([name, price], i) => ({ name: t("dataItem")(op, name), price, fee: feeOf(i, price), gets: t("dataItem")({ name: "" }, name).trim() }));
}
function renderAmounts() {
  selected = null;
  $("amounts").innerHTML = items().map((it, i) =>
    `<button type="button" class="amt" role="radio" aria-checked="false" tabindex="${i ? -1 : 0}" data-i="${i}"><span>${it.name}</span><b>${rp(it.price)}</b></button>`).join("");
  update();
}
function update() {
  const list = items();
  $("total").textContent = selected !== null ? rp(list[selected].price) : "Rp 0";
  $("feeLine").textContent = selected !== null ? t("feeLine")(rp(list[selected].fee)) : "";
  const digits = $("phone").value.replace(/\D/g, "");
  const okPhone = digits.length >= 8 && digits.length <= 15;
  const ready = okPhone && selected !== null;
  $("buy").disabled = !ready;
  $("buyHint").textContent = ready ? "" : t(!okPhone && selected === null ? "needBoth" : !okPhone ? "needPhone" : "needAmount");
  // errors are spelled out in text, not shown by border colour alone
  const err = digits.length > 15 ? "errLong" : phoneTouched && digits.length > 0 && digits.length < 8 ? "errShort" : null;
  $("phoneErr").textContent = err ? t(err) : "";
  $("phone").classList.toggle("bad", !!err);
  $("phone").setAttribute("aria-invalid", !!err);
  const op = currentOp();
  $("hint").textContent = detectedOp && op && op.id === detectedOp ? t("detected")(op.name) : t("phoneHint");
}

// ===== Events =====
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
  const gift = b.dataset.type === "gift"; // gift cards are sold on their own page, so show a link instead of the top-up fields
  $("giftPanel").hidden = !gift;
  $("topupFields").hidden = gift;
  if (gift) return;
  type = b.dataset.type;
  renderOperators();
}));
$("country").addEventListener("change", renderOperators);
$("operator").addEventListener("change", renderAmounts);
$("phone").addEventListener("input", () => { applyPhoneDetection(); update(); });
$("phone").addEventListener("blur", () => { phoneTouched = true; update(); });
function pickAmount(b) {
  selected = +b.dataset.i;
  document.querySelectorAll(".amt").forEach(x => { const on = x === b; x.setAttribute("aria-checked", on); x.tabIndex = on ? 0 : -1; });
  update();
}
$("amounts").addEventListener("click", e => { const b = e.target.closest(".amt"); if (b) pickAmount(b); });
// radio group keyboard pattern (WAI-ARIA APG): arrows move and select
$("amounts").addEventListener("keydown", e => {
  const all = [...document.querySelectorAll(".amt")], i = all.indexOf(document.activeElement);
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  const jump = { Home: 0, End: all.length - 1 }[e.key];
  if (i < 0 || (!step && jump === undefined)) return;
  e.preventDefault();
  const next = jump !== undefined ? all[jump] : all[(i + step + all.length) % all.length];
  pickAmount(next); next.focus();
});
// ===== Checkout: review sheet → loading → success / failure → delivery tracking =====
const sheet = $("sheet");
const WA = "https://wa.me/6289655913961";
let order = null, paying = false;
const demo = new URLSearchParams(location.search).get("demo"); // ?demo=fail | undelivered previews those paths

// TODO: replace with the real payment API. Resolve { ok, ref } where ref is the order number from the backend.
function processOrder(o) {
  return new Promise(res => setTimeout(() => res({ ok: demo !== "fail", ref: "DEMO-" + Math.floor(1000 + Math.random() * 9000) }), 1600));
}
// TODO: replace with polling / webhooks on the order status API. Calls onStatus("sending" | "delivered" | "failed").
function trackOrder(ref, onStatus) {
  onStatus("sending");
  setTimeout(() => onStatus(demo === "undelivered" ? "failed" : "delivered"), 2500);
}
function showView(view) {
  $("reviewView").hidden = view !== "review";
  $("resultView").hidden = view === "review";
  $("reviewTitle").hidden = view !== "review"; // the result has its own heading
  sheet.setAttribute("aria-labelledby", view === "review" ? "reviewTitle" : "resultTitle");
}
function setPaying(on) {
  paying = on;
  $("payBtn").setAttribute("aria-busy", on);
  $("payBtn").setAttribute("aria-disabled", on);
  $("payLabel").textContent = on ? t("processing") : t("rvPay");
  sheet.querySelectorAll("[data-close]").forEach(b => b.disabled = on);
  $("payStatus").textContent = on ? t("processing") : "";
}
function openReview() {
  const it = items()[selected], op = currentOp();
  order = { country: $("country").value, type, op: op.id, idx: selected, phone: $("phone").value.trim(), item: it };
  $("rvProduct").textContent = it.name;
  $("rvOperator").textContent = op.name;
  $("rvPhone").textContent = order.phone;
  $("rvGets").textContent = it.gets;
  $("rvPrice").textContent = rp(it.price - it.fee);
  $("rvFee").textContent = rp(it.fee);
  $("rvTotal").textContent = rp(it.price);
  showView("review");
  if (!sheet.open) { sheet.showModal(); history.pushState({ sheet: 1 }, ""); }
  $("payBtn").focus();
}
const waLink = () => `${WA}?text=${encodeURIComponent(t("waMsg")(order.ref || "-", order.item.name, order.phone))}`;
function renderTracker(status) {
  const steps = [["paid", t("trackPaid")], ["sending", t("trackSending")], status === "failed" ? ["failed", t("trackFailed")] : ["delivered", t("trackDone")]];
  const at = { sending: 1, delivered: 3, failed: 2 }[status];
  $("tracker").innerHTML = steps.map(([k, label], i) => {
    const state = k === "failed" ? "failed" : i < at ? "done" : i === at ? "active" : "pending";
    const icon = { done: "i-check", active: "i-clock", failed: "i-alert", pending: "i-clock" }[state];
    return `<li class="${state}"${state === "active" ? ' aria-current="step"' : ""}><span class="bar" aria-hidden="true"></span><span class="lbl"><svg class="i" aria-hidden="true"><use href="#${icon}"/></svg>${label}</span></li>`;
  }).join("");
  $("tracker").hidden = false;
}
function setActions(html) { $("resultActions").innerHTML = html; }
function showResult(res) {
  setPaying(false);
  const ok = res.ok;
  order.ref = res.ref;
  $("resultView").classList.toggle("is-fail", !ok);
  $("resultIcon").querySelector("use").setAttribute("href", ok ? "#i-clock" : "#i-alert");
  $("resultTitle").textContent = t(ok ? "okTitle" : "failTitle");
  $("resultText").textContent = ok ? t("okText")(order.item.name, order.phone) : t("failText");
  $("resultRef").hidden = !ok;
  $("resultRef").textContent = ok ? t("orderRef")(order.ref) : "";
  $("tracker").hidden = true;
  setActions(ok
    ? `<button type="button" class="btn btn-primary" data-act="done">${t("okDone")}</button><button type="button" class="btn btn-ghost" data-act="again">${t("okAgain")}</button>`
    : `<button type="button" class="btn btn-primary" data-act="retry">${t("failRetry")}</button><a class="btn btn-ghost" href="${waLink()}" target="_blank" rel="noopener">${t("failHelp")}</a>`);
  showView("result");
  $("resultTitle").focus(); // move focus so screen readers announce the outcome
  if (ok) { saveRecent(order); trackOrder(order.ref, onTrack); }
}
function onTrack(status) {
  if (!sheet.open || $("resultView").hidden) return;
  renderTracker(status);
  if (status === "delivered") {
    $("resultIcon").querySelector("use").setAttribute("href", "#i-check");
    $("resultTitle").textContent = t("deliveredTitle");
    $("resultText").textContent = t("deliveredText")(order.item.name, order.phone);
    $("payStatus").textContent = t("deliveredTitle");
  }
  if (status === "failed") { // paid but not delivered: refund path right in the flow
    $("resultView").classList.add("is-fail");
    $("resultIcon").querySelector("use").setAttribute("href", "#i-alert");
    $("resultTitle").textContent = t("undelTitle");
    $("resultText").textContent = t("undelText");
    $("payStatus").textContent = t("undelTitle");
    setActions(`<a class="btn btn-primary" href="${waLink()}" target="_blank" rel="noopener">${t("refundBtn")}</a><button type="button" class="btn btn-ghost" data-act="done">${t("okDone")}</button>`);
  }
}
function resetForm(keepAmount) {
  $("phone").value = ""; phoneTouched = false; lastDetected = ""; detectedOp = null;
  if (keepAmount) update(); else renderAmounts();
}

// ===== Saved numbers: one-click repeat top-up (stored only in this browser) =====
const RECENT_KEY = "airtime.recent";
function loadRecent() { try { return JSON.parse(storage(RECENT_KEY) || "[]"); } catch { return []; } }
function saveRecent(o) {
  const key = r => [r.phone, r.op, r.type, r.idx].join("|");
  const list = [{ country: o.country, type: o.type, op: o.op, idx: o.idx, phone: o.phone }, ...loadRecent().filter(r => key(r) !== key(o))].slice(0, 3);
  storage(RECENT_KEY, JSON.stringify(list));
  renderRecent();
}
const maskPhone = p => p.length > 7 ? `${p.slice(0, 4)} •••• ${p.slice(-4)}` : p;
function recentItem(r) {
  const op = OPERATORS.find(o => o.id === r.op); if (!op) return null;
  const row = (r.type === "credit" ? op.credit : op.data)[r.idx]; if (!row) return null;
  const name = r.type === "credit" ? t("creditItem")(op, money(row[0], COUNTRIES[op.c].cur)) : t("dataItem")(op, row[0]);
  return { op, name, price: row[1] };
}
function renderRecent() {
  const list = loadRecent().map((r, i) => ({ r, i, it: recentItem(r) })).filter(x => x.it);
  $("recent").hidden = !list.length;
  $("recentList").innerHTML = list.map(({ r, i, it }) => `<li>
    <button type="button" class="recent-go" data-i="${i}" aria-label="${t("recentGo")(it.op.name, r.phone)}"><span class="r-num">${maskPhone(r.phone)}</span><span class="r-meta">${it.name}, ${rp(it.price)}</span></button>
    <button type="button" class="recent-del" data-del="${i}" aria-label="${t("recentRemove")(r.phone)}"><svg class="i" aria-hidden="true"><use href="#i-x"/></svg></button></li>`).join("");
}
$("recentList").addEventListener("click", e => {
  const del = e.target.closest("[data-del]"), go = e.target.closest(".recent-go");
  const all = loadRecent();
  if (del) {
    all.splice(+del.dataset.del, 1); storage(RECENT_KEY, JSON.stringify(all)); renderRecent();
    (document.querySelector(".recent-go") || $("phone")).focus();
    return;
  }
  if (!go) return;
  const r = all[+go.dataset.i];
  document.querySelector(`.tab[data-type="${r.type}"]`).click();
  $("country").value = r.country; renderOperators();
  $("operator").value = r.op; renderAmounts();
  $("phone").value = r.phone; lastDetected = `${r.country}|${r.op}`; // keep the saved operator
  pickAmount(document.querySelectorAll(".amt")[r.idx]);
  openReview(); // one click to the review sheet; paying still needs a confirm
});

$("quick-purchase").addEventListener("submit", e => { e.preventDefault(); openReview(); });
$("payBtn").addEventListener("click", () => {
  if (paying) return;
  setPaying(true);
  processOrder(order).then(showResult);
});
$("resultActions").addEventListener("click", e => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (act === "retry") { showView("review"); $("payBtn").focus(); $("payBtn").click(); }
  if (act === "done") { sheet.close(); resetForm(false); saveDraft(); $("phone").focus(); }
  if (act === "again") { sheet.close(); resetForm(true); saveDraft(); $("phone").focus(); } // same amount, new number
});
sheet.addEventListener("click", e => {
  if (e.target.closest("[data-close]") && !paying) sheet.close();
  if (e.target === sheet && !paying && !$("reviewView").hidden) sheet.close(); // click on backdrop
});
sheet.addEventListener("cancel", e => { if (paying) e.preventDefault(); }); // no Esc mid-payment
// one history entry per open sheet: Back closes it, and closing it any other way pops that entry
sheet.addEventListener("close", () => { if (history.state && history.state.sheet) history.back(); });
addEventListener("popstate", () => {
  if (!sheet.open) return;
  if (paying) { history.pushState({ sheet: 1 }, ""); return; } // never drop an in-flight payment
  sheet.close(); $("buy").focus();
});

// draft: keep what the visitor entered for this tab session, so going back or reloading never asks again
const DRAFT_KEY = "airtime.draft";
function saveDraft() {
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ type, country: $("country").value, op: $("operator").value, phone: $("phone").value, idx: selected })); } catch {}
}
function restoreDraft() {
  let d; try { d = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null"); } catch {}
  if (!d) return;
  const tab = document.querySelector(`.tab[data-type="${d.type}"]`); if (tab && d.type !== "credit") tab.click();
  if (COUNTRIES[d.country]) { $("country").value = d.country; renderOperators(); }
  if ([...$("operator").options].some(o => o.value === d.op)) { $("operator").value = d.op; renderAmounts(); }
  $("phone").value = d.phone || ""; lastDetected = `${d.country}|${d.op}`;
  const amt = document.querySelectorAll(".amt")[d.idx]; if (d.idx != null && amt) pickAmount(amt); else update();
}
["change", "input", "click"].forEach(t => $("quick-purchase").addEventListener(t, () => setTimeout(saveDraft)));

// header: language + mobile menu
function setLangMenu(open) { $("langMenu").hidden = !open; $("langBtn").setAttribute("aria-expanded", open); }
$("langBtn").addEventListener("click", () => setLangMenu($("langMenu").hidden));
document.addEventListener("click", e => { if (!e.target.closest(".lang")) setLangMenu(false); });
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (!$("langMenu").hidden) { setLangMenu(false); $("langBtn").focus(); }
  if ($("nav").classList.contains("open")) { setMenu(false); $("burger").focus(); }
});
$("langMenu").addEventListener("click", e => {
  const a = e.target.closest("[data-lang]"); if (!a) return;
  e.preventDefault();
  lang = a.dataset.lang; storage("lang", lang);
  setLangMenu(false);
  applyLang(); renderCountries(); renderOperators();
});
function setMenu(open) {
  $("nav").classList.toggle("open", open);
  $("burger").setAttribute("aria-expanded", open);
  $("burger").setAttribute("aria-label", t(open ? "closeMenu" : "openMenu"));
}
$("burger").addEventListener("click", () => setMenu(!$("nav").classList.contains("open")));
$("nav").addEventListener("click", () => setMenu(false));

// coverage sub-tabs
const subtabs = [...document.querySelectorAll(".subtab")];
function showPane(b) {
  subtabs.forEach(x => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; });
  $("ops").hidden = b.dataset.pane !== "ops"; $("utils").hidden = b.dataset.pane !== "utils";
}
subtabs.forEach(b => b.addEventListener("click", () => showPane(b)));
document.querySelector(".subtabs").addEventListener("keydown", e => {
  const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!step) return;
  const next = subtabs[(subtabs.indexOf(document.activeElement) + step + subtabs.length) % subtabs.length];
  showPane(next); next.focus();
});

// services slider: arrows scroll one card, counter follows the scroll position
const track = $("svcTrack"), slides = [...track.children];
function currentSlide() {
  const x = track.scrollLeft;
  return slides.reduce((best, s, i) => Math.abs(s.offsetLeft - track.offsetLeft - x) < Math.abs(slides[best].offsetLeft - track.offsetLeft - x) ? i : best, 0);
}
let curSlide = 0;
function renderDots() {
  $("svcDots").setAttribute("aria-label", t("chooseCard"));
  $("svcDots").innerHTML = slides.map((s, i) => `<button type="button" class="seg-btn" data-go="${i}" aria-controls="svcTrack" aria-label="${t("showCard")(s.querySelector("h3").textContent)}"></button>`).join("");
}
$("svcDots").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) goSlide(+b.dataset.go - curSlide); });
// renders the counter/buttons for slide i; with no index it reads the scroll position (swipe, trackpad)
function updateSlider(i) {
  if (i == null) i = curSlide = currentSlide();
  document.querySelector(".count-now").textContent = String(i + 1).padStart(2, "0");
  $("svcNote").textContent = slides[i].querySelector("h3").textContent; // mirrors the card title, already translated
  $("svcPrev").disabled = i === 0;
  $("svcNext").disabled = i === slides.length - 1;
  document.querySelectorAll(".seg-btn").forEach((b, k) => b.setAttribute("aria-current", k === i));
}
function goSlide(step) {
  // step from the remembered slide, not the scroll position, so fast repeat presses each move one card
  curSlide = Math.max(0, Math.min(slides.length - 1, curSlide + step));
  track.scrollTo({ left: slides[curSlide].offsetLeft - track.offsetLeft });
  updateSlider(curSlide);
}
$("svcPrev").addEventListener("click", () => goSlide(-1));
$("svcNext").addEventListener("click", () => goSlide(1));
let scrollTimer;
track.addEventListener("scroll", () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(() => updateSlider(), 120); }, { passive: true });
track.addEventListener("scrollend", () => updateSlider());
track.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") { e.preventDefault(); goSlide(1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); goSlide(-1); }
});

// keep the focused element clear of the sticky header (WCAG 2.4.11 Focus Not Obscured)
document.addEventListener("focusin", e => {
  const el = e.target;
  if (!(el instanceof Element) || el.closest(".header, dialog") || el.classList.contains("skip")) return;
  requestAnimationFrame(() => {
    const top = el.getBoundingClientRect().top, hb = document.querySelector(".header").getBoundingClientRect().bottom;
    if (top < hb + 8) scrollBy({ top: top - hb - 16, behavior: "instant" });
  });
});
// ===== Coverage: one card per country, built from the same data as the form =====
const cName = code => t("countryName")[code] || COUNTRIES[code].name;
function renderCountryGrid() {
  $("countryGrid").innerHTML = Object.entries(COUNTRIES).filter(([k]) => k !== "ALL").map(([k, c]) => {
    const ops = OPERATORS.filter(o => o.c === k).map(o => o.name).join(", ");
    return `<li class="cc">
      <div class="cc-top"><svg class="flag" aria-hidden="true"><use href="#flag-${k}"/></svg><span class="cc-code">${c.prefix}</span></div>
      <h3 class="cc-name">${cName(k)}</h3>
      <p class="cc-ops">${ops}</p>
      <button type="button" class="cc-go" data-c="${k}" aria-label="${t("ccAria")(cName(k))}"><span>${t("ccGo")}</span><svg class="i" aria-hidden="true"><use href="#i-arrow"/></svg></button>
    </li>`;
  }).join("");
}
$("countryGrid").addEventListener("click", e => {
  const b = e.target.closest(".cc-go"); if (!b) return;
  if (document.querySelector('.tab[aria-pressed="true"]').dataset.type === "gift") document.querySelector('.tab[data-type="credit"]').click();
  $("country").value = b.dataset.c; renderOperators(); lastDetected = ""; saveDraft();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("quick-purchase").scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  $("phone").focus({ preventScroll: true });
  const form = $("quick-purchase"); form.classList.remove("flash"); void form.offsetWidth; form.classList.add("flash");
});

// header gets a hairline only once the page scrolls
addEventListener("scroll", () => document.querySelector(".header").style.borderBottomColor = scrollY > 8 ? "var(--line-soft)" : "transparent", { passive: true });

$("year").textContent = new Date().getFullYear();
renderRecent();
updateSlider();
applyLang(); renderCountries(); renderOperators();
restoreDraft();
