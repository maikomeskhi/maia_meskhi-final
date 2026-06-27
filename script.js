// ==========================================
// 1. °C / °F
// ==========================================
const unitToggle = document.getElementById("unit-toggle");
const tempValueEl = document.getElementById("temp-value");
let isCelsius = true;

unitToggle.addEventListener("click", function () {
  const celsius = Number(tempValueEl.dataset.celsius);
  isCelsius = !isCelsius;
  if (isCelsius) {
    tempValueEl.textContent = celsius + "°";
    unitToggle.textContent = "°C";
  } else {
    const f = Math.round((celsius * 9) / 5 + 32);
    tempValueEl.textContent = f + "°";
    unitToggle.textContent = "°F";
  }
});

// ==========================================
// 2. CITY DROPDOWN
// ==========================================
const citySelectBtn = document.getElementById("city-select");
const cityDropdown = document.getElementById("city-dropdown");
const selectedCityLabel = document.getElementById("selected-city-label");

citySelectBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  const isOpen = cityDropdown.hidden === false;
  cityDropdown.hidden = isOpen;
  citySelectBtn.setAttribute("aria-expanded", String(!isOpen));
});

document.addEventListener("click", function () {
  cityDropdown.hidden = true;
  citySelectBtn.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".city-item").forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.stopPropagation();
    const cityName = item.dataset.city;
    const cityTemp = Number(item.dataset.temp);
    selectedCityLabel.textContent = cityName;
    document.getElementById("city-name-display").textContent = cityName;
    tempValueEl.textContent = cityTemp + "°";
    tempValueEl.dataset.celsius = cityTemp;
    isCelsius = true;
    unitToggle.textContent = "°C";
    cityDropdown.hidden = true;
    citySelectBtn.setAttribute("aria-expanded", "false");
  });
});

// ==========================================
// 3. ქალაქის ძებნა
// ==========================================
document
  .querySelector(".toolbar-search")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const val = document.getElementById("city-search").value.trim();
    if (val) {
      document.getElementById("city-name-display").textContent = val;
      document.getElementById("city-search").value = "";
    }
  });

// ==========================================
// 4. ენების switcher
// ==========================================
document.querySelectorAll(".lang-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

// ==========================================
// 5. FORECAST TABS
// ==========================================
document.querySelectorAll(".tab-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

// ==========================================
// 6. კონვერტორი
// ==========================================
const converterToggle = document.getElementById("converter-toggle");
const converterPanel = document.getElementById("converter-panel");

converterToggle.addEventListener("click", function () {
  const isOpen = converterPanel.hidden === false;
  converterPanel.hidden = isOpen;
  converterToggle.setAttribute("aria-expanded", String(!isOpen));
});

document.getElementById("celsius-input").addEventListener("input", function () {
  const c = Number(this.value);
  document.getElementById("fahrenheit-input").value =
    this.value !== "" ? ((c * 9) / 5 + 32).toFixed(1) : "";
});

document.getElementById("km-input").addEventListener("input", function () {
  document.getElementById("mile-input").value =
    this.value !== "" ? (Number(this.value) * 0.621371).toFixed(2) : "";
});

document.getElementById("usd-input").addEventListener("input", function () {
  document.getElementById("gel-from-usd-input").value =
    this.value !== "" ? (Number(this.value) * 2.6527).toFixed(2) : "";
});

document.getElementById("eur-input").addEventListener("input", function () {
  document.getElementById("gel-from-eur-input").value =
    this.value !== "" ? (Number(this.value) * 3.0408).toFixed(2) : "";
});

// ==========================================
// 7. CITY CAROUSEL
// ==========================================
const cities = [
  { name: "ბორჯომი", high: 26, low: 14 },
  { name: "სურამი", high: 22, low: 12 },
  { name: "მცხეთა", high: 28, low: 16 },
  { name: "გორი", high: 30, low: 17 },
  { name: "ახალციხე", high: 24, low: 11 },
  { name: "სიღნაღი", high: 27, low: 15 },
  { name: "თელავი", high: 29, low: 16 },
  { name: "ბათუმი", high: 25, low: 18 },
  { name: "გუდაური", high: 12, low: 4 },
  { name: "ქუთაისი", high: 26, low: 15 },
];

let carouselIndex = 0;
const visibleCount = 6;

function renderCarousel() {
  for (let i = 0; i < visibleCount; i++) {
    const city = cities[(carouselIndex + i) % cities.length];
    document.getElementById("city-name-" + i).textContent = city.name;
    document.getElementById("city-temps-" + i).textContent =
      city.high + "° / " + city.low + "°";
  }
}

document.getElementById("carousel-next").addEventListener("click", function () {
  carouselIndex = (carouselIndex + 1) % cities.length;
  renderCarousel();
});

document.getElementById("carousel-prev").addEventListener("click", function () {
  carouselIndex = (carouselIndex - 1 + cities.length) % cities.length;
  renderCarousel();
});

// ==========================================
// 8. ZODIAC
// ==========================================
const horoscopeTexts = [
  "ვერძებისთვის დღეს ენერგია მაღალია — კარგი დღე ახალი საქმეების დასაწყებად.",
  "კუროებისთვის სტაბილურობა და სიმშვიდე დღეს განსაკუთრებით მნიშვნელოვანია.",
  "ტყუპებისთვის კომუნიკაცია დღეს განსაკუთრებით მნიშვნელოვანია.",
  "კირჩხიბებისთვის ემოციური სტაბილურობა დღეს პრიორიტეტული იქნება.",
  "ლომებისთვის დღეს თავდაჯერებულობა გამოგადგებათ.",
  "ქალწულებისთვის დეტალებზე ფოკუსი დღეს წარმატებას მოგიტანთ.",
  "სასწორებისთვის ბალანსის პოვნა დღეს მნიშვნელოვანია.",
  "მორიელებისთვის ინტუიცია დღეს სწორ მიმართულებას გიჩვენებთ.",
  "მშვილდოსნებისთვის თავგადასავლის ძიება დღეს ახალ შესაძლებლობებს ხსნის.",
  "თხის რქებისთვის დისციპლინა და მოთმინება დღეს გამოგადგებათ.",
  "მერწყულებისთვის ორიგინალური იდეები დღეს განსაკუთრებით ფასობს.",
  "თევზებისთვის შემოქმედებითი ენერგია დღეს მაღალია — გამოიყენეთ.",
];

document
  .getElementById("zodiac-row")
  .addEventListener("click", function (event) {
    const btn = event.target.closest(".zodiac-btn");
    if (!btn) {
      return;
    }
    document.querySelectorAll(".zodiac-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    document.getElementById("horo-text").textContent =
      horoscopeTexts[Number(btn.dataset.sign)];
  });

// ==========================================
// INITIALIZATION
// ==========================================
renderCarousel();

