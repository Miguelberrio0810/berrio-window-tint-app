// Galería de imágenes
const gallery = document.querySelector('.galleryimg');
const groups = document.querySelectorAll('.group');
let currentIndex = 0;
let galleryTimer;

function showGroup(index) {
  if (index < 0) index = groups.length - 1;
  if (index >= groups.length) index = 0;
  currentIndex = index;
  gallery.style.transform = `translateX(-${index * 100}%)`;
}

function resetGalleryTimer() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(() => showGroup(currentIndex + 1), 4000);
}

document.querySelector('.prev').addEventListener('click', () => {
  showGroup(currentIndex - 1);
  resetGalleryTimer();
});
document.querySelector('.next').addEventListener('click', () => {
  showGroup(currentIndex + 1);
  resetGalleryTimer();
});

showGroup(0);
resetGalleryTimer();

// Galería de videos — uno por uno, muted, estilo Instagram
const videoGallery = document.querySelector('.videogalleryimg');
const videoGroups = document.querySelectorAll('.videogroup');
let videoIndex = 0;

// Poster de marca reutilizado por todos los videos, evita pantalla negra
// mientras se carga (data URI, sin petición de red, se aplica al instante).
const VIDEO_POSTER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='680' height='383' viewBox='0 0 680 383'%3E%3Crect width='680' height='383' fill='%230c1016'/%3E%3Ccircle cx='340' cy='176' r='54' fill='%2338B000'/%3E%3Cpath d='M322 150 L322 202 L366 176 Z' fill='%23090c0f'/%3E%3Ctext x='340' y='262' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='%23ffffff' text-anchor='middle' letter-spacing='1'%3EBERRIO WINDOW TINT%3C/text%3E%3C/svg%3E";

document.querySelectorAll('.videogroup video').forEach(video => {
  video.poster = VIDEO_POSTER;
});

// Carga perezosa: cada <source> guarda el archivo real en data-src y solo
// se asigna a src (y se llama a .load()) cuando el slide realmente se necesita,
// para no descargar los 11 videos de golpe.
function loadVideoSlide(index) {
  const group = videoGroups[index];
  if (!group) return;
  const source = group.querySelector('source[data-src]');
  if (!source) return;
  source.src = source.dataset.src;
  source.removeAttribute('data-src');
  group.querySelector('video').load();
}

function showVideoGroup(index) {
  const currentVideo = videoGroups[videoIndex]?.querySelector('video');
  if (currentVideo) currentVideo.pause();

  if (index < 0) index = videoGroups.length - 1;
  if (index >= videoGroups.length) index = 0;
  videoIndex = index;
  videoGallery.style.transform = `translateX(-${index * 100}%)`;

  // Precarga el slide actual y sus vecinos para que prev/next se sientan instantáneos
  loadVideoSlide(videoIndex);
  loadVideoSlide(videoIndex + 1 >= videoGroups.length ? 0 : videoIndex + 1);
  loadVideoSlide(videoIndex - 1 < 0 ? videoGroups.length - 1 : videoIndex - 1);

  const nextVideo = videoGroups[videoIndex]?.querySelector('video');
  if (nextVideo) {
    nextVideo.currentTime = 0;
    nextVideo.play().catch(() => {});
  }
}

// Solo empieza a cargar videos cuando la sección realmente entra en el viewport
// (la sección está bastante abajo en la página, así que no hay razón para
// descargar nada de video mientras el usuario ve el resto del sitio).
(function () {
  const videosSection = document.querySelector('.videos-section');
  if (!videosSection) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        loadVideoSlide(0);
        loadVideoSlide(1);
        const firstVideo = videoGroups[0]?.querySelector('video');
        if (firstVideo) firstVideo.play().catch(() => {});
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });
  obs.observe(videosSection);
})();

function flashTapIcon(wrapper, iconClass) {
  const tapIcon = wrapper.querySelector('.video-tap-icon');
  const icon = tapIcon.querySelector('i');
  icon.className = iconClass;
  tapIcon.classList.remove('flash');
  void tapIcon.offsetWidth;
  tapIcon.classList.add('flash');
}

document.querySelectorAll('.videogroup video').forEach(video => {
  video.addEventListener('ended', () => showVideoGroup(videoIndex + 1));
});

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const video = wrapper.querySelector('video');
    if (video.paused) {
      video.play().catch(() => {});
      flashTapIcon(wrapper, 'fas fa-play');
    } else {
      video.pause();
      flashTapIcon(wrapper, 'fas fa-pause');
    }
  });
});

document.querySelector('.video-prev').addEventListener('click', () => showVideoGroup(videoIndex - 1));
document.querySelector('.video-next').addEventListener('click', () => showVideoGroup(videoIndex + 1));


// Lightbox galería
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  document.querySelectorAll('.group img, .description-image img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();


// Diccionario de traducciones
const translations = {
  es: {
    servicios: "Servicios",
    galeria: "Galería",
    videos: "Videos",
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
    chipHeat: "-60% Calor",
    chipWarranty: "Garantía",
    locationTitle: "Visítanos",
    locationDesc: "Encuéntranos en Gainesville, Florida",
    getDirections: "Cómo llegar",
    openMaps: "Abrir en Google Maps",
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
    optElim: "Remoción de tinte",
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
    ventanasTitle: "Tipo de servicio",
    ventElimSin: "Remoción sin parabrisas",
    ventElimCon: "Remoción con parabrisas",
    ventCompSin: "Instalación completa sin parabrisas",
    ventCompCon: "Instalación completa con parabrisas",
    tipoLaminaTitle: "Tipo y porcentaje de lámina",
    tipoLaminaNote: "El porcentaje indica cuánta luz pasa a través del vidrio (VLT). Menor porcentaje = mayor oscuridad.",
    tipoLaminaLabel: "Tecnología de lámina",
    ceramicoTitle: "Cerámico",
    ceramicoDesc: "Máximo rechazo de calor y UV. Sin interferencia de señal.",
    nanocarbonTitle: "Nanocarbon",
    nanocarbonDesc: "Excelente durabilidad y tonos profundos de alta calidad.",
    porcentajeLabel: "Nivel de oscuridad (% VLT)",
    pct5: "Muy oscuro",
    pct15: "Oscuro",
    pct20: "Semi-oscuro",
    pct30: "Medio",
    pct35: "Moderado",
    pct50: "Claro",
    ventDelanteras: "Ventanas delanteras (2 puertas frontales)",
    ventTrLaterales: "Ventanas traseras (2 puertas traseras)",
    ventCuatro: "Cuatro ventanas de puertas (delanteras + traseras)",
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
    whatsappTooltip: "¡Escríbenos!",
    smsTooltip: "¡Envíanos un mensaje!",
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
    notasPH: "¿Algún requisito o pregunta especial?",
    videosTitle: "Nuestro Trabajo en Acción",
    videosSubtitle: "Mira cómo transformamos vehículos con nuestro servicio profesional",
    featuresEyebrow: "La diferencia Berrío",
    featuresH1: "Más que Solo Sombra.",
    featuresH2: "Rendimiento Ingenieril.",
    featuresDesc: "No solo tintamos ventanas — las mejoramos. Nuestras películas premium transforman el vidrio ordinario en barreras de alto rendimiento contra el calor, el deslumbramiento y el daño.",
    feat1Title: "Protección UV",
    feat1Desc: "Bloquea el 99% de los rayos UV dañinos, protegiendo tu piel y previniendo el desvanecimiento interior.",
    feat2Title: "Rechazo de Calor",
    feat2Desc: "La tecnología cerámica avanzada mantiene tu espacio considerablemente más fresco, reduciendo el consumo del AC.",
    feat3Title: "Privacidad Mejorada",
    feat3Desc: "Ve hacia afuera con total claridad mientras mantienes las miradas externas fuera de tu espacio.",
    statLabel: "RECHAZO UV",
    miniStat1: "Calificación",
    miniStat2: "Clientes",
    miniStat3: "Años Exp.",
    quoteSuccessTitle: "¡Cotización Enviada!",
    quoteSuccessDesc: "Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo muy pronto.",
    quoteSuccessTimeLabel: "Tiempo de respuesta estimado:",
    quoteSuccessTimeValue: "24 horas",
    quoteSuccessBtn: "Entendido",
    quoteErrorTerms: "Debes aceptar los términos y condiciones.",
    quoteErrorSubmit: "Hubo un error al enviar. Intenta de nuevo.",
    testimonios: "Testimonios",
    testimonialsBadgeReviews: "reseñas en Google",
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
    testimonialsSubtitle: "Calificación 5.0 basada en 50 reseñas verificadas en Google",
    leerMas: "Leer más",
    leerMenos: "Leer menos",
    testimonial1Text: "Tuve una excelente experiencia con esta compañía. Desde el principio fueron muy profesionales, puntuales y muy atentos. Me explicaron todo el proceso claramente.",
    testimonial2Text: "Quedé muy impresionado con su profesionalismo y la eficiencia con la que se completó el trabajo. La calidad de la instalación es excelente.",
    testimonial3Text: "Excelente atención y la calidad del trabajo 100/100 como cliente muy satisfecho, Sr Franklin el mejor definitivamente.",
    testimonial4Text: "Pensé que duraría en entregarme mi auto en 5 horas y fue en tiempo récord. 3 horas ya estaba listo. Recomendado.",
    testimonial5Text: "Me hizo dos vehículos el mismo día y su trabajo es fenomenal. Además, deja todo limpio y limpia tus ventanas al terminar.",
    testimonial6Text: "Muy buen servicio, puntual, muy atento, flexible con los precios y confiable. Lo recomiendo ampliamente.",
    testimonial7Text: "Mi amigo Franklin instaló el polarizado en mi Ford F-150. Todo quedó perfecto y la calidad es excelente.",
    testimonial8Text: "Berrios tiene el mejor servicio, un gran tipo; definitivamente búscalo para tus necesidades de polarizado.",
    testimonial9Text: "Escuché sobre este señor y decidí darle una oportunidad. Vaya sorpresa. Hizo un trabajo increíble en mi GMC Acadia 2017, así que volví para que también hiciera mi Town and Country 2007. Excelente servicio, acción rápida. Frankie conoce muy bien su oficio. Lo recomiendo ampliamente. #TopNotch.",
    testimonial10Text: "Quiero expresar mi más sincero agradecimiento al señor Franklin por el excelente trabajo realizado. Desde el primer momento demostró profesionalismo, puntualidad y atención a cada detalle.",
    testimonial11Text: "Una experiencia excepcional y sin complicaciones. Su atención al detalle en el trabajo de polarizado fue excelente, y el tiempo de entrega fue sorprendentemente rápido.",
    testimonial12Text: "Excelente servicio y atención, recomendado 100%, mi RAV4 quedó excelente.",
    testimonial13Text: "¡Muy rápido y confiable! Hizo un excelente trabajo y usa polarizado cerámico, que es mejor que el polarizado regular. ¡Sin quejas!",
    testimonial14Text: "Excelente servicio, muy amable y muy profesional. De verdad me encantó cómo me dejó el carro, lo recomiendo. Además tiene excelente precio.",
    testimonial15Text: "Lo hicieron muy rápido. Muy profesionales y con excelente comunicación.",
    testimonial16Text: "¡Berrío Window Tint hizo un trabajo increíble! El servicio fue profesional, amable y eficiente de principio a fin. Se nota que se sienten orgullosos de su trabajo, y la calidad del polarizado quedó excelente. Todo se ve limpio, parejo e instalado profesionalmente, sin bordes descuidados ni imperfecciones. Estoy muy contento con cómo quedó mi vehículo y definitivamente recomendaría Berrío Window Tint a cualquiera que busque un excelente servicio y trabajo de alta calidad.",
    testimonial17Text: "Experiencia increíble, muy buen precio, trabajo profesional. Definitivamente lo recomendaré a cualquiera que necesite polarizado.",
    testimonial18Text: "Hizo un trabajo excepcional, este es mi tercer vehículo y he quedado muy satisfecho. Siempre ha sido profesional y trabaja con integridad; puedo decir que es uno de los mejores de la ciudad.",
    testimonial19Text: "Me reemplazó el techo solar y no tuvo problema en que yo llevara mi propia pieza. Es muy flexible y puede hacer muchos otros trabajos personalizados bajo pedido. Mientras esperaba, lo vi polarizar una camioneta enorme y puedo dar fe de que es muy hábil en lo que hace.",
    testimonial20Text: "¡Servicio excepcional! Después de ver el fantástico trabajo que el Sr. Franklin Berrío hizo en nuestro Honda Accord 2008, inmediatamente llevamos nuestro Mitsubishi Outlander 2016 para polarizarlo también. Trabajo rápido, de alta calidad y con gran profesionalismo. El Sr. Franklin Berrío es un maestro en su oficio. ¡Lo recomendamos ampliamente!",
    testimonial21Text: "Berrío Window Tint es el mejor de Gainesville. Trabajo nítido, limpio y profesional, un polarizado increíble. El Sr. Franklin es el mejor del negocio del polarizado de autos. Muy satisfecho con su trabajo, ¡gracias! 👍",
    testimonial22Text: "Franklin es un duro tiñando vidrios. Trabajó en mi Toyota Camry 2026, excelente, dedicado, cuidadoso y limpio. Lo recomiendo al 100%. Muy satisfecha.",
    testimonial23Text: "Son los mejores, me encantó cómo luce mi carrito. Los recomiendo 💯 y los precios súper económicos. ¡Muchas gracias!",
    testimonial24Text: "Fue rápido, la comunicación fue excelente y muy amable. 10/10 lo recomiendo."
  },
  en: {
    servicios: "Services",
    galeria: "Gallery",
    videos: "Videos",
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
    chipHeat: "-60% Heat",
    chipWarranty: "Warranty",
    locationTitle: "Visit Us",
    locationDesc: "Find us in Gainesville, Florida",
    getDirections: "Get Directions",
    openMaps: "Open in Google Maps",
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
    ventanasTitle: "Service Type",
    ventElimSin: "Removal without windshield",
    ventElimCon: "Removal with windshield",
    ventCompSin: "Full installation without windshield",
    ventCompCon: "Full installation with windshield",
    tipoLaminaTitle: "Film Type & Tint Level",
    tipoLaminaNote: "The percentage indicates how much light passes through the glass (VLT). Lower percentage = darker tint.",
    tipoLaminaLabel: "Film Technology",
    ceramicoTitle: "Ceramic",
    ceramicoDesc: "Maximum heat and UV rejection. No signal interference.",
    nanocarbonTitle: "Nanocarbon",
    nanocarbonDesc: "Excellent durability and deep, premium-quality shades.",
    porcentajeLabel: "Darkness Level (% VLT)",
    pct5: "Very dark",
    pct15: "Dark",
    pct20: "Semi-dark",
    pct30: "Medium",
    pct35: "Moderate",
    pct50: "Light",
    ventDelanteras: "Front windows (2 front doors)",
    ventTrLaterales: "Rear side windows (2 rear doors)",
    ventCuatro: "Four door windows (front + rear)",
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
    whatsappTooltip: "Chat with us!",
    smsTooltip: "Send us a text!",
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
    notasPH: "Any special requirement or question?",
    videosTitle: "Our Work in Action",
    videosSubtitle: "See how we transform vehicles with our professional service",
    featuresEyebrow: "The Berrío Difference",
    featuresH1: "More Than Just Shade.",
    featuresH2: "Engineered Performance.",
    featuresDesc: "We don't just tint windows — we upgrade them. Our premium films transform ordinary glass into high-performance barriers against heat, glare, and damage.",
    feat1Title: "UV Protection",
    feat1Desc: "Block 99% of harmful UV rays, protecting your skin and preventing interior fading.",
    feat2Title: "Heat Rejection",
    feat2Desc: "Advanced ceramic tech keeps your space significantly cooler, reducing AC strain.",
    feat3Title: "Enhanced Privacy",
    feat3Desc: "See out clearly while keeping prying eyes from seeing in.",
    statLabel: "UV REJECTION",
    miniStat1: "Rating",
    miniStat2: "Clients",
    miniStat3: "Yrs Exp.",
    quoteSuccessTitle: "Quote Sent!",
    quoteSuccessDesc: "We have successfully received your request. We will contact you shortly.",
    quoteSuccessTimeLabel: "Estimated response time:",
    quoteSuccessTimeValue: "24 hours",
    quoteSuccessBtn: "Got it",
    quoteErrorTerms: "You must accept the terms and conditions.",
    quoteErrorSubmit: "There was an error sending your request. Please try again.",
    testimonios: "Testimonials",
    testimonialsBadgeReviews: "Google reviews",
    testimonialsTitle: "What Our Clients Say",
    testimonialsSubtitle: "5.0 rating based on 50 verified Google reviews",
    leerMas: "Read more",
    leerMenos: "Read less",
    testimonial1Text: "I had an excellent experience with this company. From the start they were very professional, punctual, and attentive. They explained the whole process clearly.",
    testimonial2Text: "I was very impressed with your professionalism and the efficiency with which the work was completed. The quality of the installation is excellent.",
    testimonial3Text: "Excellent service and the quality of the work is 100/100 — as a very satisfied customer, Mr. Franklin is definitely the best.",
    testimonial4Text: "I thought it would take 5 hours to get my car back, but it was done in record time — ready in just 3 hours. Highly recommended.",
    testimonial5Text: "Got two vehicles done in the same day and he does phenomenal work. He also cleans up after himself and cleans your windows when he is finished.",
    testimonial6Text: "Very good service, punctual, very helpful, very accommodating in pricing and trustworthy. Highly recommend.",
    testimonial7Text: "My friend Franklin installed window tint on my Ford F-150. Everything turned out perfect and the quality is excellent.",
    testimonial8Text: "Berrios has the best service, great guy, definitely see him for your window tinting needs.",
    testimonial9Text: "Heard about this gentleman and figured I'd give him a try. Man oh man. Did such an awesome job with my 2017 GMC Acadia, I went back and had him do my 2007 Town and Country. Great service, fast action. Frankie knows his business. Highly recommend him. #TopNotch.",
    testimonial10Text: "I want to express my sincere gratitude to Mr. Franklin for the excellent work done. From the very first moment he showed professionalism, punctuality, and attention to every detail.",
    testimonial11Text: "An exceptional, hassle-free experience. Their attention to detail on the tint job was outstanding, and the turnaround time was impressively fast.",
    testimonial12Text: "Excellent service and attention, 100% recommended — my RAV4 turned out excellent.",
    testimonial13Text: "Very fast and dependable! Did a great job and uses ceramic tint which is better than the regular tint! No complaints here!!",
    testimonial14Text: "Excellent service, very friendly and very professional. I truly loved how they left my car, I recommend them. Plus, they have excellent prices.",
    testimonial15Text: "Got it done very fast. Very professional and communicative.",
    testimonial16Text: "Berrio Window Tint did an amazing job! The service was professional, friendly, and efficient from start to finish. You can tell they take pride in their work, and the quality of the tint came out excellent. Everything looks clean, even, and professionally installed with no sloppy edges or imperfections. I'm very happy with how my vehicle turned out and would definitely recommend Berrio Window Tint to anyone looking for great service and high-quality work!",
    testimonial17Text: "Amazing experience, great price, professional job. Will definitely recommend to anyone who needs tinting.",
    testimonial18Text: "Did an outstanding job, this is my third vehicle and I was very pleased. Has always been professional and works with integrity and I can say one of the best in town.",
    testimonial19Text: "He replaced my sunroof, and had no issues that I brought my own part. He is super flexible and can do lots of other customized work upon request. While waiting, I saw him tint a huge pickup truck and can attest that he is skilled in what he does.",
    testimonial20Text: "Outstanding service! After seeing the fantastic job Mr. Franklin Berrio did on our 2008 Honda Accord, we immediately brought back our 2016 Mitsubishi Outlander for tinting. Fast work, high quality, and great professionalism. Mr. Franklin Berrio is a master of his craft. We highly recommend him!",
    testimonial21Text: "Berrio Window Tint is the best in Gainesville. Sharp, clean and professional work, awesome tinting. Mr Franklin is the best in the business of tinting cars. Very satisfied with his work, thanks 👍",
    testimonial22Text: "Franklin is the best when it comes to tinting car windows. He did an excellent job on my Toyota Camry 2026, clean, dedicated, careful. I recommend him 100%, number one. Very pleasant person.",
    testimonial23Text: "They are the best, I loved how my car looks. I recommend them 💯 and the prices are super affordable. Thank you so much!",
    testimonial24Text: "Was quick, communication was on point, and very kind. 10/10 would recommend."
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



let currentLang = "en";

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

  document.dispatchEvent(new CustomEvent('languagechange'));
}

// Cargar idioma inglés por defecto al iniciar
changeLanguage("en");

// ==========================================
// MODERN DYNAMIC ENHANCEMENTS
// ==========================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Menú móvil — botón hamburguesa con animación a X, panel deslizante y backdrop
(function () {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  const backdrop = document.getElementById('nav-backdrop');
  if (!toggle || !nav || !backdrop) return;

  function openMenu() {
    toggle.classList.add('open');
    nav.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    nav.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  // Cerrar al elegir una sección o el CTA, para no tapar el contenido al navegar
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });

  // Si la ventana vuelve a tamaño de escritorio con el menú abierto, lo cerramos
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) closeMenu();
  });
})();

// Particle canvas
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : (Math.random() < 0.5 ? -4 : canvas.height + 4);
      this.r = Math.random() * 1.6 + 0.4;
      this.alpha = Math.random() * 0.55 + 0.08;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.green = Math.random() > 0.55;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -5 || this.x > canvas.width + 5 || this.y < -5 || this.y > canvas.height + 5) this.reset(false);
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.green ? '#38B000' : '#70E000';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    particles = Array.from({ length: 90 }, () => new Particle());
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.globalAlpha = (1 - d / 90) * 0.1;
          ctx.strokeStyle = '#38B000';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(() => { resize(); init(); });
  ro.observe(canvas.parentElement);
  resize(); init(); frame();
})();

// Hero 3D: la imagen gira siguiendo el mouse (o el giroscopio en celulares)
(function () {
  const scene = document.getElementById('hero3d');
  if (!scene) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX = 14; // grados máximos de inclinación
  let frame = null;

  function setTilt(x, y) {
    // x, y en rango -1..1
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      scene.style.setProperty('--ry', (x * MAX).toFixed(2) + 'deg');
      scene.style.setProperty('--rx', (-y * MAX).toFixed(2) + 'deg');
      scene.style.setProperty('--mx', ((x + 1) * 50).toFixed(1) + '%');
      scene.style.setProperty('--my', ((y + 1) * 50).toFixed(1) + '%');
    });
  }

  function reset() {
    scene.classList.remove('is-active');
    setTilt(0, 0);
  }

  scene.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = scene.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    scene.classList.add('is-active');
    setTilt(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
  });
  scene.addEventListener('pointerleave', reset);

  // En pantallas táctiles usamos la inclinación del teléfono
  if (window.matchMedia('(hover: none)').matches && 'DeviceOrientationEvent' in window) {
    function onOrientation(e) {
      if (e.gamma == null || e.beta == null) return;
      const x = Math.max(-1, Math.min(1, e.gamma / 30));
      const y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      scene.classList.add('is-active');
      setTilt(x, y);
    }
    // iOS pide permiso explícito, que solo se puede solicitar tras un toque
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      scene.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
          .then(state => { if (state === 'granted') window.addEventListener('deviceorientation', onOrientation); })
          .catch(() => {});
      }, { once: true });
    } else {
      window.addEventListener('deviceorientation', onOrientation);
    }
  }
})();

// Scroll reveal with Intersection Observer
(function () {
  const sels = [
    '.whychoosetitle', '.testimonialstitle', '.testimonials-subtitle', '.gallerytitle', '.videos-title', '.videos-subtitle',
    '.services h1', '.services > p', '.location-section h1', '.location-section > p', '.location-container',
    '.form-section h1', '.form-section > p'
  ];
  sels.forEach(s => document.querySelectorAll(s).forEach(el => el.classList.add('reveal')));

  document.querySelector('.description-text')?.classList.add('reveal-left');
  document.querySelector('.description-image')?.classList.add('reveal-right');

  document.querySelectorAll('.card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  document.querySelectorAll('.scard').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.12) + 's';
  });

  document.querySelectorAll('.testimonial-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (Math.min(i, 5) * 0.08) + 's';
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
})();

// Features section: in-view class + ring + counters
(function () {
  const section = document.querySelector('.features-section');
  if (!section) return;

  const ringArc  = section.querySelector('.ring-arc');
  const ringCount = section.querySelector('.ring-count');
  const miniCounts = section.querySelectorAll('.mini-count');
  const CIRC = 534; // 2π × 85

  function countUp(el, target, duration) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = Math.round(ease * target);
      el.textContent = val;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  let fired = false;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !fired) {
        fired = true;
        section.classList.add('in-view');

        // Animate SVG ring (99% filled → dashoffset = 534 × 0.01 ≈ 5.3)
        if (ringArc) {
          setTimeout(() => { ringArc.style.strokeDashoffset = (CIRC * 0.01).toFixed(2); }, 300);
        }

        // Count up main number
        if (ringCount) countUp(ringCount, parseInt(ringCount.dataset.target), 2000);

        // Count up mini stats
        miniCounts.forEach(el => {
          const target = parseInt(el.dataset.target);
          countUp(el, target, 1800);
        });

        obs.disconnect();
      }
    });
  }, { threshold: 0.25 });

  obs.observe(section);
})();

// Botón flotante de contacto: en móvil (sin hover real) se hace una vista previa
// automática que muestra WhatsApp + SMS un momento y luego colapsa a un solo botón.
// Después, el primer toque solo revela las dos opciones (sin redirigir); el usuario
// debe tocar de nuevo una de ellas para abrir WhatsApp o SMS.
(function () {
  const wrapper = document.getElementById('contact-float');
  if (!wrapper) return;
  const mainBtn = wrapper.querySelector('.whatsapp-float');
  if (!mainBtn) return;

  const isTouch = window.matchMedia('(hover: none)').matches;
  if (!isTouch) return;

  setTimeout(() => {
    wrapper.classList.add('expanded');
    setTimeout(() => wrapper.classList.remove('expanded'), 2200);
  }, 1200);

  mainBtn.addEventListener('click', (e) => {
    if (!wrapper.classList.contains('expanded')) {
      e.preventDefault();
      wrapper.classList.add('expanded');
    }
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('expanded');
    }
  });
})();

// Testimonios: mostrar "Leer más" solo si el texto se trunca, y alternar expandido
(function () {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  function checkOverflow() {
    cards.forEach(card => {
      const text = card.querySelector('.testimonial-text');
      const toggle = card.querySelector('.testimonial-toggle');
      if (!text || !toggle || card.classList.contains('expanded')) return;
      toggle.classList.toggle('visible', text.scrollHeight > text.clientHeight + 1);
    });
  }

  cards.forEach(card => {
    const toggle = card.querySelector('.testimonial-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const expanded = card.classList.toggle('expanded');
      const key = expanded ? 'leerMenos' : 'leerMas';
      toggle.setAttribute('data-i18n', key);
      toggle.textContent = translations[currentLang][key];
    });
  });

  window.addEventListener('load', checkOverflow);
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkOverflow, 200);
  }, { passive: true });
  document.addEventListener('languagechange', () => setTimeout(checkOverflow, 0));
})();

// 3D tilt on cards
document.querySelectorAll('.card, .scard').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    card.style.transform = `perspective(700px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});


