const gallery = document.querySelector('.galleryimg');
const groups = document.querySelectorAll('.group');
let currentIndex = 0;

function showGroup(index) {
  if (index < 0) index = groups.length - 1;
  if (index >= groups.length) index = 0;
  currentIndex = index;
  gallery.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector('.prev').addEventListener('click', () => {
  showGroup(currentIndex - 1);
});
document.querySelector('.next').addEventListener('click', () => {
  showGroup(currentIndex + 1);
});

// Inicial
showGroup(0);


// Diccionario de traducciones
const translations = {
  es: {
    servicios: "Servicios",
    galeria: "Galería",
    contacto: "Contacto",
    cotizar: "Cotizar",
    llamanos: "Llámanos",
    schedule: "Agenda tu cita",
    descripcionTitle: "Te presentamos Berrío Window Tint, una empresa nueva en Gainesville, Florida, dedicada al tinte profesional de ventanas para vehículos, residencias y espacios comerciales.",
    descripcionText: "Nuestro propósito es simple: ayudarte a vivir y conducir con mayor comodidad, seguridad y privacidad.",
    whychooseus: "Por Qué Elegirnos",
    card1title: "Instaladores Certificados",
    card1desc: "Profesionales capacitados en fábrica",
    card2title: "Servicio el Mismo Día",
    card2desc: "Tiempo de respuesta rápido",
    card3title: "Calificación 5 Estrellas",
    card3desc: "Confianza de miles",
    gallerytitle: "Galería",
    servicestitle: "Servicios",
    servicesdesc: "Soluciones profesionales de polarizado para cada necesidad",
    serviceAuto: "Tintado Automotriz",
    auto1: "Bloquea rayos UV y protege la tapicería.",
    auto2: "Reduce el calor interior y ahorra combustible.",
    auto3: "Mayor privacidad y seguridad en el vehículo.",
    serviceRes: "Tintado Residencial",
    res1: "Disminuye el consumo de energía en casa.",
    res2: "Protege muebles y pisos de la decoloración.",
    res3: "Refuerza la seguridad y brinda privacidad.",
    serviceCom: "Tintado Comercial",
    com1: "Mejora la eficiencia energética en oficinas.",
    com2: "Protege equipos y mobiliario.",
    com3: "Privacidad y estética profesional.",
    formtitle: "Solicita un presupuesto",
    formdesc: "Rellena el formulario de abajo y te devolveremos un presupuesto personalizado para tus necesidades.",
    tipoCita: "Tipo de cita",
    selectOption: "Selecciona una opción",
    optAuto: "Tintado de ventanas automotrices",
    optElim: "Eliminación de tinte",
    optProt: "Película de protección de pintura",
    optRes: "Película para ventanas residenciales",
    optCom: "Película comercial para ventanas",
    personalInfo: "Datos personales",
    nombre: "Nombre",
    apellido: "Apellido",
    email: "Correo electrónico",
    telefono: "Teléfono",
    vehInfo: "Información del vehículo",
    anio: "Año del vehículo",
    selectYear: "Selecciona el año",
    marca: "Marca del vehículo",
    modelo: "Modelo del vehículo",
    ventanasTitle: "Seleccionar ventanas",
    ventElim: "Eliminar el tinte existente",
    ventCompSin: "Vehículo completo (excepto parabrisas)",
    ventCompCon: "Vehículo completo (incluye parabrisas)",
    ventPuertas: "Puertas principales",
    ventParabrisas: "Solo parabrisas",
    ventTrasera: "Solo ventana trasera",
    ventTecho: "Techo solar",
    ventTechoPan: "Techo solar panorámico",
    ventUna: "Solo una ventana",
    ventSunstrip: "Sunstrip (cejas, tira de parabrisas)",
    contactPref: "Método de contacto preferido *",
    contactText: "Mensaje de texto",
    contactCall: "Llamada telefónica",
    contactEmail: "Correo electrónico",
    notesTitle: "Notas adicionales",
    terms: "Acepto los Términos de Servicio y la Política de Privacidad. Consiento recibir comunicaciones respecto a mi solicitud.",
    sendBtn: "Enviar solicitud de presupuesto",
    quicklinks: "Enlaces rápidos",
    footerServices: "Servicios",
    footerAuto: "Polarizado de automóviles",
    footerPaint: "Película protectora de pintura",
    footerCom: "Tintado comercial",
    footerRes: "Polarizado residencial",
    contactInfo: "Información de contacto",
    footerPhone: "Berrio Window Tint: (352) 214-4948",
    footerLocation: "Gainesville, Florida",
    footerHours: "Horario disponible por la tarde y los fines de semana",
    footerRights: "© 2026 Berrio Window Tint - Todos los derechos reservados.",
    footerDesc: "Berrío Window Tint, es una empresa en Gainesville, Florida, dedicada al tinte profesional de ventanas para vehículos, residencias y espacios comerciales.",
    nombrePH: "Tu nombre",
    apellidoPH: "Tu apellido",
    emailPH: "ejemplo@correo.com",
    telefonoPH: "Tu número de contacto",
    marcaPH: "Ejemplo: BMW",
    modeloPH: "Ejemplo: M3",
    notasPH: "¿Algún requisito o pregunta especial?"
  },
  en: {
    servicios: "Services",
    galeria: "Gallery",
    contacto: "Contact",
    cotizar: "Get a Quote",
    llamanos: "Call Us",
    schedule: "Schedule a meeting",
    descripcionTitle: "Introducing Berrío Window Tint, a new company in Gainesville, Florida, dedicated to professional window tinting for vehicles, residences, and commercial spaces.",
    descripcionText: "Our purpose is simple: to help you live and drive with greater comfort, safety, and privacy.",
    whychooseus: "Why Choose Us",
    card1title: "Certified Installers",
    card1desc: "Factory-trained professionals",
    card2title: "Same-Day Service",
    card2desc: "Fast response time",
    card3title: "5-Star Rating",
    card3desc: "Trusted by thousands",
    gallerytitle: "Gallery",
    servicestitle: "Services",
    servicesdesc: "Professional tinting solutions for every need",
    serviceAuto: "Automotive Tinting",
    auto1: "Blocks UV rays and protects upholstery.",
    auto2: "Reduces interior heat and saves fuel.",
    auto3: "Greater privacy and vehicle security.",
    serviceRes: "Residential Tinting",
    res1: "Reduces energy consumption at home.",
    res2: "Protects furniture and floors from fading.",
    res3: "Enhances security and provides privacy.",
    serviceCom: "Commercial Tinting",
    com1: "Improves energy efficiency in offices.",
    com2: "Protects equipment and furniture.",
    com3: "Privacy and professional aesthetics.",
    formtitle: "Request a Quote",
    formdesc: "Fill out the form below and we will send you a personalized quote for your needs.",
    tipoCita: "Appointment Type",
    selectOption: "Select an option",
    optAuto: "Automotive window tinting",
    optElim: "Tint removal",
    optProt: "Paint protection film",
    optRes: "Residential window film",
    optCom: "Commercial window film",
    personalInfo: "Personal Information",
    nombre: "First Name",
    apellido: "Last Name",
    email: "Email",
    telefono: "Phone",
    vehInfo: "Vehicle Information",
    anio: "Vehicle Year",
    selectYear: "Select year",
    marca: "Vehicle Make",
    modelo: "Vehicle Model",
    ventanasTitle: "Select Windows",
    ventElim: "Remove existing tint",
    ventCompSin: "Full vehicle (except windshield)",
    ventCompCon: "Full vehicle (includes windshield)",
    ventPuertas: "Front doors",
    ventParabrisas: "Windshield only",
    ventTrasera: "Rear window only",
    ventTecho: "Sunroof",
    ventTechoPan: "Panoramic sunroof",
    ventUna: "Single window",
    ventSunstrip: "Sunstrip (visor, windshield strip)",
    contactPref: "Preferred contact method *",
    contactText: "Text message",
    contactCall: "Phone call",
    contactEmail: "Email",
    notesTitle: "Additional notes",
    terms: "I accept the Terms of Service and Privacy Policy. I consent to receive communications regarding my request.",
    sendBtn: "Submit quote request",
    quicklinks: "Quick Links",
    footerServices: "Services",
    footerAuto: "Automotive tinting",
    footerPaint: "Paint protection film",
    footerCom: "Commercial tinting",
    footerRes: "Residential tinting",
    contactInfo: "Contact Information",
    footerPhone: "Berrio Window Tint: (352) 214-4948",
    footerLocation: "Gainesville, Florida",
    footerHours: "Available afternoons and weekends",
    footerRights: "© 2026 Berrio Window Tint - All rights reserved.",
    footerDesc: "Berrío Window Tint is a company in Gainesville, Florida, dedicated to professional window tinting for vehicles, residences, and commercial spaces.",
    nombrePH: "Your first name",
    apellidoPH: "Your last name",
    emailPH: "example@email.com",
    telefonoPH: "Your contact number",
    marcaPH: "Example: BMW",
    modeloPH: "Example: M3",
    notasPH: "Any special requirement or question?"
  }
};

// // Lógica de cambio de idioma
// let currentLang = "es";

// document.getElementById("lang-btn").addEventListener("click", () => {
//   currentLang = currentLang === "es" ? "en" : "es";
//   changeLanguage(currentLang);
// });

// function changeLanguage(lang) {
//   document.querySelectorAll("[data-i18n]").forEach(el => {
//     const key = el.getAttribute("data-i18n");
//     if (translations[lang][key]) {
//       el.textContent = translations[lang][key];
//     }
//   });

//   // Cambiar el texto del botón
//   document.getElementById("lang-btn").textContent = lang === "es" ? "🌐EN" : "🌐ES";
// }



let currentLang = "es";

document.querySelector(".idioma button").addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  changeLanguage(currentLang);
});

function changeLanguage(lang) {
  // Cambiar textos normales
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Cambiar placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  // Cambiar el texto del botón
  document.querySelector(".idioma button").textContent = lang === "es" ? "🌐EN" : "🌐ES";
}



