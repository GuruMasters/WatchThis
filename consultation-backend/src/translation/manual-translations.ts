/**
 * Manual Translation Dictionary
 * Comprehensive fallback translations for AI responses
 * Supports: Serbian, Spanish, French, German, Russian, and more
 */

export interface TranslationDictionary {
  [text: string]: {
    [languageCode: string]: string;
  };
}

export const manualTranslations: TranslationDictionary = {
  // ========================================
  // GREETING & WELCOME MESSAGES
  // ========================================
  "Hello! Welcome to WatchThis. I'm here to help you with any questions about our web development, mobile app development, or digital marketing services. What brings you here today?": {
    sr: "Здраво! Добродошли у WatchThis. Ту сам да вам помогнем са било којим питањима о нашим услугама веб развоја, развоја мобилних апликација или дигиталног маркетинга. Шта вас доводи овде данас?",
    es: "¡Hola! Bienvenido a WatchThis. Estoy aquí para ayudarte con cualquier pregunta sobre nuestros servicios de desarrollo web, desarrollo de aplicaciones móviles o marketing digital. ¿Qué te trae aquí hoy?",
    fr: "Bonjour! Bienvenue chez WatchThis. Je suis là pour vous aider avec toutes questions sur nos services de développement web, développement d'applications mobiles ou marketing digital. Qu'est-ce qui vous amène ici aujourd'hui?",
    de: "Hallo! Willkommen bei WatchThis. Ich bin hier, um Ihnen bei Fragen zu unseren Webentwicklungs-, Mobile-App-Entwicklungs- oder Digital-Marketing-Diensten zu helfen. Was führt Sie heute hierher?",
    ru: "Здравствуйте! Добро пожаловать в WatchThis. Я здесь, чтобы помочь вам с любыми вопросами о наших услугах веб-разработки, разработки мобильных приложений или цифрового маркетинга. Что привело вас сюда сегодня?",
  },

  "Hi! I'm your AI assistant. I can help you with questions about our services, pricing, or getting started. How can I assist you today?": {
    sr: "Здраво! Ја сам ваш АИ асистент. Могу да вам помогнем са питањима о нашим услугама, ценама или како почети. Како могу да вам помогнем данас?",
    es: "¡Hola! Soy tu asistente de IA. Puedo ayudarte con preguntas sobre nuestros servicios, precios o cómo empezar. ¿Cómo puedo asistirte hoy?",
    fr: "Salut! Je suis votre assistant IA. Je peux vous aider avec des questions sur nos services, nos tarifs ou comment démarrer. Comment puis-je vous assister aujourd'hui?",
    de: "Hallo! Ich bin Ihr KI-Assistent. Ich kann Ihnen bei Fragen zu unseren Dienstleistungen, Preisen oder dem Einstieg helfen. Wie kann ich Ihnen heute behilflich sein?",
    ru: "Привет! Я ваш ИИ-помощник. Я могу помочь вам с вопросами о наших услугах, ценах или как начать. Чем могу помочь вам сегодня?",
  },

  // ========================================
  // SERVICES
  // ========================================
  "We offer comprehensive technology solutions: web development, mobile app development (iOS/Android), digital marketing, SEO, and business consulting. Our team specializes in creating modern, scalable solutions tailored to your business goals. What type of project are you considering?": {
    sr: "Нудимо свеобухватна технолошка решења: веб развој, развој мобилних апликација (iOS/Android), дигитални маркетинг, SEO и пословне консултације. Наш тим се специјализује за креирање модерних, скалабилних решења прилагођених вашим пословним циљевима. Који тип пројекта разматрате?",
    es: "Ofrecemos soluciones tecnológicas integrales: desarrollo web, desarrollo de aplicaciones móviles (iOS/Android), marketing digital, SEO y consultoría empresarial. Nuestro equipo se especializa en crear soluciones modernas y escalables adaptadas a sus objetivos comerciales. ¿Qué tipo de proyecto estás considerando?",
    fr: "Nous offrons des solutions technologiques complètes: développement web, développement d'applications mobiles (iOS/Android), marketing digital, SEO et conseil en affaires. Notre équipe se spécialise dans la création de solutions modernes et évolutives adaptées à vos objectifs commerciaux. Quel type de projet envisagez-vous?",
    de: "Wir bieten umfassende Technologielösungen: Webentwicklung, Mobile-App-Entwicklung (iOS/Android), digitales Marketing, SEO und Unternehmensberatung. Unser Team ist spezialisiert auf die Erstellung moderner, skalierbarer Lösungen, die auf Ihre Geschäftsziele zugeschnitten sind. Welche Art von Projekt erwägen Sie?",
    ru: "Мы предлагаем комплексные технологические решения: веб-разработку, разработку мобильных приложений (iOS/Android), цифровой маркетинг, SEO и бизнес-консультирование. Наша команда специализируется на создании современных масштабируемых решений, адаптированных к вашим бизнес-целям. Какой тип проекта вы рассматриваете?",
  },

  // ========================================
  // PRICING
  // ========================================
  "Our pricing is tailored to each project's requirements. We work with various budgets - from small business packages to enterprise solutions. The best way to get an accurate quote is through a free consultation where we can understand your needs. Would you like to schedule a call?": {
    sr: "Наше цене су прилагођене захтевима сваког пројекта. Радимо са различитим буџетима - од пакета за мале бизнисе до enterprise решења. Најбољи начин да добијете тачну понуду је кроз бесплатну консултацију где можемо разумети ваше потребе. Желите ли да закажете позив?",
    es: "Nuestros precios se adaptan a los requisitos de cada proyecto. Trabajamos con varios presupuestos, desde paquetes para pequeñas empresas hasta soluciones empresariales. La mejor manera de obtener un presupuesto preciso es a través de una consulta gratuita donde podamos entender sus necesidades. ¿Le gustaría programar una llamada?",
    fr: "Nos tarifs sont adaptés aux exigences de chaque projet. Nous travaillons avec divers budgets - des forfaits pour petites entreprises aux solutions d'entreprise. La meilleure façon d'obtenir un devis précis est une consultation gratuite où nous pouvons comprendre vos besoins. Souhaitez-vous planifier un appel?",
    de: "Unsere Preise sind auf die Anforderungen jedes Projekts zugeschnitten. Wir arbeiten mit verschiedenen Budgets - von Paketen für kleine Unternehmen bis zu Unternehmenslösungen. Der beste Weg, ein genaues Angebot zu erhalten, ist eine kostenlose Beratung, bei der wir Ihre Bedürfnisse verstehen können. Möchten Sie einen Anruf vereinbaren?",
    ru: "Наши цены адаптированы к требованиям каждого проекта. Мы работаем с различными бюджетами - от пакетов для малого бизнеса до корпоративных решений. Лучший способ получить точную цитату - это бесплатная консультация, где мы можем понять ваши потребности. Хотите запланировать звонок?",
  },

  // ========================================
  // BOOKING / CONSULTATION
  // ========================================
  "Great! I'd be happy to help you schedule a free consultation. Our booking system at /booking lets you choose a time that works best for you, or I can help coordinate with our team directly. When would be convenient for you?": {
    sr: "Одлично! Радо ћу вам помоћи да закажете бесплатну консултацију. Наш систем за заказивање на /booking вам омогућава да изаберете време које вам најбоље одговара, или могу да вам помогнем да координирамо са нашим тимом директно. Када би вам одговарало?",
    es: "¡Genial! Estaría encantado de ayudarte a programar una consulta gratuita. Nuestro sistema de reservas en /booking te permite elegir el horario que mejor te convenga, o puedo ayudarte a coordinar directamente con nuestro equipo. ¿Cuándo te vendría bien?",
    fr: "Génial! Je serais ravi de vous aider à planifier une consultation gratuite. Notre système de réservation sur /booking vous permet de choisir un horaire qui vous convient le mieux, ou je peux vous aider à coordonner directement avec notre équipe. Quand cela vous conviendrait-il?",
    de: "Großartig! Ich helfe Ihnen gerne, eine kostenlose Beratung zu vereinbaren. Unser Buchungssystem unter /booking ermöglicht es Ihnen, eine Zeit zu wählen, die am besten für Sie funktioniert, oder ich kann Ihnen helfen, direkt mit unserem Team zu koordinieren. Wann würde es Ihnen passen?",
    ru: "Отлично! Я буду рад помочь вам запланировать бесплатную консультацию. Наша система бронирования на /booking позволяет выбрать удобное для вас время, или я могу помочь вам координировать с нашей командой напрямую. Когда вам было бы удобно?",
  },

  "Perfect! I'm glad you're ready to get started. You can book your consultation at /booking, or I can help you coordinate with our team. Would you like me to send you a direct booking link?": {
    sr: "Савршено! Драго ми је што сте спремни да почнете. Можете заказати вашу консултацију на /booking, или могу да вам помогнем да координишете са нашим тимом. Желите ли да вам пошаљем директан линк за заказивање?",
    es: "¡Perfecto! Me alegra que estés listo para comenzar. Puedes reservar tu consulta en /booking, o puedo ayudarte a coordinar con nuestro equipo. ¿Te gustaría que te enviara un enlace directo de reserva?",
    fr: "Parfait! Je suis content que vous soyez prêt à commencer. Vous pouvez réserver votre consultation sur /booking, ou je peux vous aider à coordonner avec notre équipe. Souhaitez-vous que je vous envoie un lien de réservation direct?",
    de: "Perfekt! Ich freue mich, dass Sie bereit sind anzufangen. Sie können Ihre Beratung unter /booking buchen, oder ich kann Ihnen helfen, mit unserem Team zu koordinieren. Möchten Sie, dass ich Ihnen einen direkten Buchungslink sende?",
    ru: "Отлично! Я рад, что вы готовы начать. Вы можете забронировать консультацию на /booking, или я могу помочь вам координировать с нашей командой. Хотите, чтобы я отправил вам прямую ссылку для бронирования?",
  },

  // ========================================
  // TIMELINE
  // ========================================
  "Project timelines vary based on scope and complexity - typically 4-12 weeks for most projects. We respond to inquiries within 24 hours and can start planning immediately after our consultation. Would you like to schedule a free call to discuss your project timeline?": {
    sr: "Временски рокови пројеката варирају на основу обима и сложености - обично 4-12 недеља за већину пројеката. Одговарамо на упите у року од 24 сата и можемо почети планирање одмах након наше консултације. Желите ли да закажете бесплатан позив да разговарамо о временском року вашег пројекта?",
    es: "Los plazos del proyecto varían según el alcance y la complejidad, generalmente de 4 a 12 semanas para la mayoría de los proyectos. Respondemos a las consultas en 24 horas y podemos comenzar a planificar inmediatamente después de nuestra consulta. ¿Te gustaría programar una llamada gratuita para discutir el cronograma de tu proyecto?",
    fr: "Les délais de projet varient en fonction de la portée et de la complexité - généralement 4-12 semaines pour la plupart des projets. Nous répondons aux demandes dans les 24 heures et pouvons commencer à planifier immédiatement après notre consultation. Souhaitez-vous planifier un appel gratuit pour discuter du calendrier de votre projet?",
    de: "Die Projektzeitpläne variieren je nach Umfang und Komplexität - in der Regel 4-12 Wochen für die meisten Projekte. Wir antworten innerhalb von 24 Stunden auf Anfragen und können sofort nach unserer Beratung mit der Planung beginnen. Möchten Sie einen kostenlosen Anruf vereinbaren, um Ihren Projektzeitplan zu besprechen?",
    ru: "Сроки проекта варьируются в зависимости от объема и сложности - обычно 4-12 недель для большинства проектов. Мы отвечаем на запросы в течение 24 часов и можем начать планирование сразу после нашей консультации. Хотите запланировать бесплатный звонок для обсуждения сроков вашего проекта?",
  },

  // ========================================
  // CONTACT
  // ========================================
  "You can reach us at busines.watch.this@gmail.com - we typically respond within one business day. For faster assistance, you can also use this chat or book a consultation call directly at /booking. How else can I help you today?": {
    sr: "Можете нас контактирати на busines.watch.this@gmail.com - обично одговарамо у року од једног радног дана. За бржу помоћ, можете такође користити овај чет или заказати консултациони позив директно на /booking. Како још могу да вам помогнем данас?",
    es: "Puedes comunicarte con nosotros en busines.watch.this@gmail.com - generalmente respondemos dentro de un día hábil. Para asistencia más rápida, también puedes usar este chat o reservar una llamada de consulta directamente en /booking. ¿En qué más puedo ayudarte hoy?",
    fr: "Vous pouvez nous joindre à busines.watch.this@gmail.com - nous répondons généralement dans un jour ouvrable. Pour une assistance plus rapide, vous pouvez également utiliser ce chat ou réserver un appel de consultation directement sur /booking. Comment puis-je vous aider d'autre aujourd'hui?",
    de: "Sie können uns unter busines.watch.this@gmail.com erreichen - wir antworten in der Regel innerhalb eines Werktages. Für schnellere Hilfe können Sie auch diesen Chat nutzen oder direkt unter /booking ein Beratungsgespräch buchen. Wie kann ich Ihnen heute noch helfen?",
    ru: "Вы можете связаться с нами по адресу busines.watch.this@gmail.com - мы обычно отвечаем в течение одного рабочего дня. Для более быстрой помощи вы также можете использовать этот чат или забронировать консультационный звонок напрямую на /booking. Чем еще я могу вам помочь сегодня?",
  },

  // ========================================
  // THANKS
  // ========================================
  "You're very welcome! If you have any other questions about our services, pricing, or want to schedule a consultation, I'm here to help. Is there anything else you'd like to know?": {
    sr: "Нема на чему! Ако имате било каква друга питања о нашим услугама, ценама, или желите да закажете консултацију, ту сам да помогнем. Има ли још нешто што бисте желели да знате?",
    es: "¡De nada! Si tienes alguna otra pregunta sobre nuestros servicios, precios o quieres programar una consulta, estoy aquí para ayudar. ¿Hay algo más que te gustaría saber?",
    fr: "De rien! Si vous avez d'autres questions sur nos services, nos tarifs ou si vous souhaitez planifier une consultation, je suis là pour vous aider. Y a-t-il autre chose que vous aimeriez savoir?",
    de: "Gern geschehen! Wenn Sie weitere Fragen zu unseren Dienstleistungen, Preisen haben oder eine Beratung vereinbaren möchten, bin ich hier, um zu helfen. Gibt es noch etwas, das Sie wissen möchten?",
    ru: "Пожалуйста! Если у вас есть другие вопросы о наших услугах, ценах или вы хотите запланировать консультацию, я здесь, чтобы помочь. Есть ли еще что-то, что вы хотели бы узнать?",
  },

  // ========================================
  // GETTING STARTED
  // ========================================
  "Getting started is simple! Here's our process: 1) Schedule a free consultation at /booking, 2) Discuss your project goals and requirements, 3) Receive a detailed proposal and timeline, 4) Start building! Would you like to book a call now?": {
    sr: "Почетак је једноставан! Ево нашег процеса: 1) Закажите бесплатну консултацију на /booking, 2) Разговарајте о циљевима и захтевима вашег пројекта, 3) Примите детаљан предлог и временски оквир, 4) Почните градњу! Желите ли да закажете позив сада?",
    es: "¡Comenzar es simple! Aquí está nuestro proceso: 1) Programa una consulta gratuita en /booking, 2) Discute los objetivos y requisitos de tu proyecto, 3) Recibe una propuesta detallada y un cronograma, 4) ¡Comienza a construir! ¿Te gustaría reservar una llamada ahora?",
    fr: "Commencer est simple! Voici notre processus: 1) Planifiez une consultation gratuite sur /booking, 2) Discutez de vos objectifs et exigences de projet, 3) Recevez une proposition détaillée et un calendrier, 4) Commencez à construire! Souhaitez-vous réserver un appel maintenant?",
    de: "Der Einstieg ist einfach! Hier ist unser Prozess: 1) Vereinbaren Sie eine kostenlose Beratung unter /booking, 2) Besprechen Sie Ihre Projektziele und Anforderungen, 3) Erhalten Sie einen detaillierten Vorschlag und Zeitplan, 4) Beginnen Sie mit dem Aufbau! Möchten Sie jetzt einen Anruf buchen?",
    ru: "Начать просто! Вот наш процесс: 1) Запланируйте бесплатную консультацию на /booking, 2) Обсудите цели и требования вашего проекта, 3) Получите подробное предложение и график, 4) Начните строительство! Хотите забронировать звонок сейчас?",
  },

  // ========================================
  // GENERAL / FALLBACK
  // ========================================
  "I'd be happy to help you with that. Could you tell me more about what you're looking for?": {
    sr: "Радо ћу вам помоћи са тим. Можете ли ми рећи више о томе шта тражите?",
    es: "Estaría encantado de ayudarte con eso. ¿Podrías contarme más sobre lo que buscas?",
    fr: "Je serais ravi de vous aider. Pourriez-vous me dire plus sur ce que vous cherchez?",
    de: "Ich helfe Ihnen gerne dabei. Könnten Sie mir mehr über das erzählen, was Sie suchen?",
    ru: "Я с радостью помогу вам с этим. Не могли бы вы рассказать подробнее о том, что вы ищете?",
  },

  "I'm here to help! You can ask me about our services (web development, mobile apps, digital marketing), pricing, project timelines, or how to get started. What would you like to know?": {
    sr: "Ту сам да помогнем! Можете ме питати о нашим услугама (веб развој, мобилне апликације, дигитални маркетинг), ценама, временским роковима пројеката, или како почети. Шта бисте желели да знате?",
    es: "¡Estoy aquí para ayudar! Puedes preguntarme sobre nuestros servicios (desarrollo web, aplicaciones móviles, marketing digital), precios, plazos de proyectos o cómo empezar. ¿Qué te gustaría saber?",
    fr: "Je suis là pour vous aider! Vous pouvez me poser des questions sur nos services (développement web, applications mobiles, marketing digital), nos tarifs, les délais de projet ou comment démarrer. Que souhaitez-vous savoir?",
    de: "Ich bin hier, um zu helfen! Sie können mich nach unseren Dienstleistungen (Webentwicklung, mobile Apps, digitales Marketing), Preisen, Projektzeitplänen oder wie Sie anfangen können, fragen. Was möchten Sie wissen?",
    ru: "Я здесь, чтобы помочь! Вы можете спросить меня о наших услугах (веб-разработка, мобильные приложения, цифровой маркетинг), ценах, сроках проекта или как начать. Что бы вы хотели узнать?",
  },
};

/**
 * Get manual translation for a given text and target language
 * @param text Original English text
 * @param targetLanguage Target language code (e.g., 'sr', 'es', 'fr')
 * @returns Translated text or null if not found
 */
export function getManualTranslation(
  text: string,
  targetLanguage: string
): string | null {
  // Exact match
  if (manualTranslations[text]?.[targetLanguage]) {
    return manualTranslations[text][targetLanguage];
  }

  // Partial match - find if the text contains any key phrase
  for (const [key, translations] of Object.entries(manualTranslations)) {
    if (text.includes(key) && translations[targetLanguage]) {
      return text.replace(key, translations[targetLanguage]);
    }
  }

  return null;
}

/**
 * Check if manual translation exists for given text and language
 * @param text Original English text
 * @param targetLanguage Target language code
 * @returns True if manual translation exists
 */
export function hasManualTranslation(
  text: string,
  targetLanguage: string
): boolean {
  return !!getManualTranslation(text, targetLanguage);
}

/**
 * Get all supported languages for manual translations
 * @returns Array of language codes that have manual translations
 */
export function getSupportedManualLanguages(): string[] {
  const languages = new Set<string>();
  
  for (const translations of Object.values(manualTranslations)) {
    Object.keys(translations).forEach(lang => languages.add(lang));
  }
  
  return Array.from(languages).sort();
}

