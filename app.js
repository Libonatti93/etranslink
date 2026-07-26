const regionData = {
  brasil: {
    diesel: "R$ 7,09", dieselTrend: "−0,4%",
    tire: "R$ 2.940", tireTrend: "+1,2%", tireGauge: "68%",
    arla: "R$ 92,40", arlaTrend: "−0,8%",
    insight: "O Centro-Oeste segue competitivo no diesel, enquanto pneus pressionam o custo fixo em todas as regiões."
  },
  norte: {
    diesel: "R$ 7,33", dieselTrend: "+0,2%",
    tire: "R$ 3.180", tireTrend: "+1,8%", tireGauge: "88%",
    arla: "R$ 105,90", arlaTrend: "+0,6%",
    insight: "Distâncias e disponibilidade elevam os três indicadores no Norte; consolidação de compras ganha importância."
  },
  nordeste: {
    diesel: "R$ 7,06", dieselTrend: "−0,1%",
    tire: "R$ 3.020", tireTrend: "+1,4%", tireGauge: "75%",
    arla: "R$ 96,80", arlaTrend: "−0,3%",
    insight: "O diesel permanece próximo da média nacional; pneus ainda carregam diferenças relevantes entre capitais."
  },
  "centro-oeste": {
    diesel: "R$ 6,94", dieselTrend: "−0,7%",
    tire: "R$ 2.960", tireTrend: "+1,1%", tireGauge: "70%",
    arla: "R$ 93,70", arlaTrend: "−0,5%",
    insight: "Diesel mais competitivo ajuda os corredores do agro, mas safra e demanda por pneus podem alterar a curva."
  },
  sudeste: {
    diesel: "R$ 7,01", dieselTrend: "−0,5%",
    tire: "R$ 2.790", tireTrend: "+0,8%", tireGauge: "54%",
    arla: "R$ 86,50", arlaTrend: "−1,1%",
    insight: "Maior oferta e concorrência mantêm pneus e Arla 32 abaixo da amostra nacional no Sudeste."
  },
  sul: {
    diesel: "R$ 6,93", dieselTrend: "−0,6%",
    tire: "R$ 2.850", tireTrend: "+0,9%", tireGauge: "60%",
    arla: "R$ 89,20", arlaTrend: "−0,9%",
    insight: "O Sul apresenta o menor diesel da referência e uma cesta de manutenção mais equilibrada."
  }
};

const spanish = document.documentElement.lang.startsWith("es");
const currentLanguage = spanish ? "es" : "pt";

function setPreferenceCookie(name, value) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

function getPreferenceCookie(name) {
  const prefix = `${name}=`;
  const item = document.cookie.split("; ").find((cookie) => cookie.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : null;
}

function browserLanguage() {
  return (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "es";
}

function languageFromCoordinates(latitude, longitude) {
  const isBrazil = latitude >= -34 && latitude <= 6 && longitude >= -74 && longitude <= -34;
  return isBrazil ? "pt" : "es";
}

function routeToLanguage(language) {
  const destination = language === "pt" ? "/pt-br/" : "/es/";
  if (location.pathname !== destination) location.replace(destination);
}

document.querySelectorAll(".language-nav a, .mobile-languages a").forEach((link) => {
  link.addEventListener("click", () => {
    setPreferenceCookie("etranslink_language", link.getAttribute("href").startsWith("/es") ? "es" : "pt");
  });
});

const consentBanner = document.querySelector("#consent-banner");
const consentCopy = {
  pt: {
    eyebrow: "PRIVACIDADE & EXPERIÊNCIA",
    title: "Cookies e idioma da sua região.",
    text: "Usamos apenas cookies de preferência. Com sua autorização, consultamos sua localização uma vez para escolher português ou espanhol. Sua localização não é enviada nem armazenada.",
    locate: "Aceitar e usar localização",
    essential: "Somente necessários"
  },
  es: {
    eyebrow: "PRIVACIDAD & EXPERIENCIA",
    title: "Cookies e idioma de tu región.",
    text: "Usamos únicamente cookies de preferencia. Con tu autorización, consultamos tu ubicación una vez para elegir portugués o español. Tu ubicación no se envía ni se almacena.",
    locate: "Aceptar y usar ubicación",
    essential: "Solo necesarios"
  }
};

function showConsentBanner() {
  const copy = consentCopy[browserLanguage()];
  document.querySelector("#consent-eyebrow").textContent = copy.eyebrow;
  document.querySelector("#consent-title").textContent = copy.title;
  document.querySelector("#consent-text").textContent = copy.text;
  document.querySelector("#consent-location").textContent = copy.locate;
  document.querySelector("#consent-essential").textContent = copy.essential;
  consentBanner.hidden = false;
}

function saveConsent(type) {
  setPreferenceCookie("etranslink_consent", type);
  consentBanner.hidden = true;
}

document.querySelector("#consent-essential").addEventListener("click", () => {
  saveConsent("essential");
  const preferred = getPreferenceCookie("etranslink_language") || browserLanguage();
  setPreferenceCookie("etranslink_language", preferred);
  routeToLanguage(preferred);
});

document.querySelector("#consent-location").addEventListener("click", () => {
  saveConsent("location");
  if (!navigator.geolocation) {
    const preferred = browserLanguage();
    setPreferenceCookie("etranslink_language", preferred);
    routeToLanguage(preferred);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const preferred = languageFromCoordinates(coords.latitude, coords.longitude);
      setPreferenceCookie("etranslink_language", preferred);
      routeToLanguage(preferred);
    },
    () => {
      const preferred = browserLanguage();
      setPreferenceCookie("etranslink_language", preferred);
      routeToLanguage(preferred);
    },
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 86400000 }
  );
});

const savedConsent = getPreferenceCookie("etranslink_consent");
const savedLanguage = getPreferenceCookie("etranslink_language");
if (!savedConsent) {
  showConsentBanner();
} else if (savedLanguage && savedLanguage !== currentLanguage) {
  routeToLanguage(savedLanguage);
}

const spanishInsights = {
  brasil: "El Centro-Oeste sigue competitivo en diésel, mientras los neumáticos presionan el costo fijo en todas las regiones.",
  norte: "Las distancias y la disponibilidad elevan los tres indicadores en el Norte; consolidar compras gana importancia.",
  nordeste: "El diésel permanece cerca del promedio nacional; los neumáticos aún muestran diferencias relevantes entre capitales.",
  "centro-oeste": "El diésel competitivo favorece los corredores del agro, pero la cosecha y la demanda de neumáticos pueden cambiar la curva.",
  sudeste: "La mayor oferta y competencia mantienen neumáticos y ARLA 32 por debajo de la muestra nacional en el Sudeste.",
  sul: "El Sur presenta el menor diésel de la referencia y una canasta de mantenimiento más equilibrada."
};

const regionButtons = document.querySelectorAll("[data-region]");
const dieselPrice = document.querySelector("#diesel-price");
const dieselTrend = document.querySelector("#diesel-trend");
const tirePrice = document.querySelector("#tire-price");
const tireTrend = document.querySelector("#tire-trend");
const tireGauge = document.querySelector("#tire-gauge");
const arlaPrice = document.querySelector("#arla-price");
const arlaTrend = document.querySelector("#arla-trend");
const regionInsight = document.querySelector("#region-insight");

regionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const data = regionData[button.dataset.region];
    regionButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    dieselPrice.textContent = data.diesel;
    dieselTrend.textContent = data.dieselTrend;
    tirePrice.textContent = data.tire;
    tireTrend.textContent = data.tireTrend;
    tireGauge.style.width = data.tireGauge;
    arlaPrice.textContent = data.arla;
    arlaTrend.textContent = data.arlaTrend;
    regionInsight.textContent = spanish ? spanishInsights[button.dataset.region] : data.insight;
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}));

const dialog = document.querySelector("#connection-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const profileType = document.querySelector("#profile-type");
document.querySelectorAll("[data-open-form]").forEach((button) => {
  button.addEventListener("click", () => {
    const carrier = button.dataset.openForm === "carrier";
    profileType.value = carrier
      ? (spanish ? "Transportista" : "Transportador")
      : (spanish ? "Cargador" : "Embarcador");
    dialogTitle.textContent = spanish
      ? (carrier ? "Presenta tu operación." : "Cuéntanos sobre tu carga.")
      : (carrier ? "Apresente sua operação." : "Conte sobre sua carga.");
    dialogDescription.textContent = spanish
      ? (carrier ? "Indica tu área de operación y el tipo de oportunidad que buscas." : "Indica origen, destino y los primeros detalles de la operación.")
      : (carrier ? "Informe sua área de atuação e o tipo de oportunidade que procura." : "Informe origem, destino e os primeiros detalhes da operação.");
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector("#connection-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = spanish
    ? [
        "¡Hola! Llegué por el portal Etranslink en español.",
        `Perfil: ${profileType.value}`,
        `Nombre/empresa: ${document.querySelector("#contact-name").value}`,
        `Origen: ${document.querySelector("#cargo-origin").value}`,
        `Destino: ${document.querySelector("#cargo-destination").value}`,
        `Necesidad: ${document.querySelector("#cargo-details").value}`
      ].join("\n")
    : [
        "Olá! Vim pelo novo portal Etranslink.",
        `Perfil: ${profileType.value}`,
        `Nome/empresa: ${document.querySelector("#contact-name").value}`,
        `Origem: ${document.querySelector("#cargo-origin").value}`,
        `Destino: ${document.querySelector("#cargo-destination").value}`,
        `Necessidade: ${document.querySelector("#cargo-details").value}`
      ].join("\n");
  window.open(`https://wa.me/5517997114450?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  dialog.close();
});

const toast = document.querySelector("#toast");
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  toast.textContent = spanish
    ? "Registro guardado para la próxima etapa de Etranslink."
    : "Cadastro registrado para a próxima etapa da Etranslink.";
  toast.classList.add("show");
  event.target.reset();
  window.setTimeout(() => toast.classList.remove("show"), 3500);
});
