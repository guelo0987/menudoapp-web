export type Language = 'es' | 'en';

export const siteContent = {
  brand: {
    supportEmail: 'soporte@menudoapp.com',

  },
  es: {
    header: {
      navItems: [
        { label: "Inicio", href: "/" },
        { label: "Privacidad", href: "/privacy-policy" },
        { label: "Términos", href: "/terms" },
        { label: "Soporte", href: "/support" }
      ],
      cta: "Descargar App"
    },
    hero: {
      eyebrow: "Menudo App",
      title: "Mira tus gastos con claridad. Sin esfuerzo.",
      body: "Escribe o habla: Menudo organiza tus finanzas de manera inteligente al instante, sincronizando de forma segura incluso cuando no tienes conexión.",
      primaryCta: "Descargar en iOS",
      secondaryCta: "Saber más"
    },
    phoneMockups: {
      left: {
        title: "Presupuestos",
        value: "$9,326.45",
        status: "Earning 6.50%",
        added: "Añadido $2,000",
        withdrew: "Retirado $40"
      },
      center: {
        title: "Gastos",
        value: "$1,200.00",
        status: "Al día",
        added: "Comida $50",
        withdrew: "Uber $12"
      },
      right: {
        title: "Ahorros",
        value: "$906,242",
        status: "Ahorrado $725,127",
        period: "en 30 Años"
      }
    },
    pro: {
      eyebrow: "Menudo Pro",
      title: "Todo el poder de tus finanzas en un solo lugar",
      body: "Toma el control absoluto. Desde presupuestos compartidos con tu pareja hasta reportes dinámicos que se actualizan al instante de forma segura.",
      primaryCta: "Comenzar",
      secondaryCta: "Saber más",
      cards: [
        {
          tag: "Colaboración",
          title: "Compartido",
          sub: "Familiar",
          body: "Invita a tu pareja o familiares. Los saldos, categorías y límites se sincronizan automáticamente sin colisiones."
        },
        {
          tag: "Sincronización",
          title: "Offline-First",
          sub: "Local-first",
          body: "El motor local sincroniza con la nube en segundo plano en menos de 150ms utilizando nuestra base de datos distribuida."
        },
        {
          tag: "Seguridad",
          title: "Cifrado RLS",
          sub: "Postgres",
          body: "Políticas Row-Level Security (RLS) avanzadas en PostgreSQL garantizan que tus datos financieros sean 100% privados."
        }
      ]
    },
    engine: {
      eyebrow: "Funciones Inteligentes",
      title: "Diseñado para fluir con tu día a día",
      body: "Automatizaciones inteligentes, recordatorios oportunos y control colaborativo para que nunca tengas que preocuparte por tus finanzas.",
      features: {
        recurring: {
          title: "Suscripciones y Recurrentes",
          desc: "Controla tus gastos fijos. Menudo procesa tus cobros recurrentes de forma automática y te notifica antes de cada cargo."
        },
        categorization: {
          title: "Categorización y Emojis",
          desc: "Escribe o habla de forma natural. La app clasifica el concepto al instante y le asigna el emoji perfecto de forma inteligente."
        },
        notifications: {
          title: "Listas Compartidas y Alertas",
          desc: "Sincronización en tiempo real. Recibe alertas inmediatas en tu pantalla cuando se registren nuevos gastos familiares."
        }
      }
    },
    trusted: {
      primaryCta: "Saber más",
      secondaryCta: "Ver Soporte",
      stats: [
        { value: "6+ Años", label: "De experiencia construyendo apps nativas." },
        { value: "$0", label: "En cargos duplicados gracias a nuestro sistema de validación." },
        { value: "100%", label: "Privacidad absoluta. Tus datos están cifrados y protegidos." }
      ]
    },
    faqs: {
      title: "FAQs",
      primaryCta: "Soporte de Menudo",
      questions: [
        {
          q: "¿Qué es Menudo?",
          a: "Menudo es una aplicación financiera personal y compartida diseñada para registrar tus gastos de manera rápida y sin esfuerzo mediante lenguaje natural y atajos automáticos."
        },
        {
          q: "¿Funciona sin conexión a internet?",
          a: "¡Sí! Puedes registrar todos tus gastos sin conexión. Menudo guarda la información de forma segura en tu dispositivo y la sincroniza automáticamente en segundo plano en cuanto recuperas la señal."
        },
        {
          q: "¿Cómo se evitan los gastos duplicados si mi red falla?",
          a: "Menudo cuenta con un sistema inteligente de validación que detecta si la app intenta enviar el mismo gasto varias veces debido a una mala señal, descartando cualquier registro duplicado de forma automática."
        },
        {
          q: "¿Mis datos financieros están seguros?",
          a: "Totalmente. La seguridad es nuestra prioridad. Tus datos se transmiten de forma cifrada y, en el caso de las listas compartidas, solo tú y las personas a quienes invites tienen acceso autorizado a los gastos."
        }
      ]
    },
    footer: {
      newsletterTitle: "Entérate de las novedades y actualizaciones de Menudo.",
      newsletterPlaceholder: "Tu correo electrónico",
      newsletterButton: "Registrarse",
      disclaimer: "Menudo proporciona información y recursos sobre finanzas personales. La aplicación está diseñada para uso personal y compartido bajo términos de código abierto y sincronización en la nube con cifrado y seguridad integrados."
    },
    privacyPolicy: {
      title: 'Política de Privacidad',
      intro: 'Valoramos su privacidad. A continuación, explicamos de forma clara y transparente cómo manejamos y protegemos sus datos personales en Menudo.',
      sections: [
        {
          title: '1. Responsable del Tratamiento',
          body: 'Menudo App es desarrollada y operada por Miguel Cruz, con domicilio en la República Dominicana. Nos comprometemos a proteger su privacidad y a tratar sus datos de carácter personal conforme a los más altos estándares de transparencia y seguridad. Para cualquier consulta sobre esta política, puede escribirnos a: soporte@menudoapp.com.'
        },
        {
          title: '2. Información que Recopilamos',
          body: 'Para prestar los servicios de registro de gastos personales y compartidos, procesamos:\n• Datos de la Cuenta: Correo electrónico, ID único de usuario, nombre de perfil y foto de perfil opcional provista en el registro.\n• Datos Financieros: Transacciones registradas por el usuario (monto, concepto/descripción, categoría, fecha, moneda e identificadores de idempotencia).\n• Datos de Colaboración: Correos electrónicos de los usuarios a quienes invites a tus listas de gastos.'
        },
        {
          title: '3. Procesamiento con Inteligencia Artificial',
          body: 'Al registrar un gasto por voz, texto o Atajo de Siri, la descripción del gasto y su catálogo de categorías se envían para su clasificación utilizando los procesadores LPU de Groq y el modelo Llama 3 para una extracción inmediata a JSON. No transmitimos datos personales identificativos (como nombre o correo) a los servicios de Groq.'
        },
        {
          title: '4. Proveedores y Almacenamiento',
          body: 'Sus datos se guardan y procesan utilizando proveedores tecnológicos líderes de la industria:\n• Supabase: Infraestructura de base de datos cifrada, autenticación de usuarios y almacenamiento en la nube.\n• RevenueCat y Apple App Store: Gestión segura del estado de suscripción y facturación premium. Nosotros no almacenamos detalles de sus tarjetas de crédito o débito.\n• Apple APNs: Envío de notificaciones push en tiempo real sobre la actividad en listas compartidas.\n• Sentry: Monitoreo de estabilidad de la aplicación y reporte de fallos y errores del servidor.\n• PostHog: Análisis de uso y eventos del producto en la aplicación móvil y la web.'
        },
        {
          title: '5. Retención de Datos y Seguridad',
          body: '• Idempotencia Extrema: Cada transacción incluye un "idempotency_key" único generado por la app. Si la red falla y se envía el gasto varias veces, el backend previene cobros duplicados en su presupuesto.\n• Retención: Conservamos sus datos únicamente mientras su cuenta esté activa. Si decide eliminar su cuenta desde los ajustes de la aplicación, toda su información personal y de transacciones asociadas será eliminada de forma permanente e inmediata de nuestras bases de datos activas.'
        },
        {
          title: '6. Sus Derechos y Ley Aplicable',
          body: 'Usted tiene el derecho de acceder, rectificar, exportar o solicitar la eliminación total de sus datos en cualquier momento. Al ser operado por Miguel Cruz, este acuerdo se rige por las leyes de la República Dominicana, ofreciendo además mecanismos de control global para cumplir con el estándar GDPR de protección de datos.'
        }
      ]
    },
    terms: {
      title: 'Términos y Condiciones de Uso',
      intro: 'Por favor, lea atentamente estos términos antes de usar Menudo App. Regulan el acceso y uso de la aplicación y de nuestros servicios asociados.',
      sections: [
        {
          title: '1. Aceptación de las Condiciones',
          body: 'Al descargar, instalar o utilizar Menudo App, usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar la aplicación ni nuestros servicios web.'
        },
        {
          title: '2. Registro de Cuenta y Uso de Pruebas',
          body: 'Para utilizar la aplicación, es necesario registrarse mediante un método de autenticación admitido. El usuario se compromete a proporcionar información verídica y a mantener la confidencialidad de sus credenciales. Queda estrictamente prohibido el uso no autorizado de cuentas ajenas.'
        },
        {
          title: '3. Sincronización Fuera de Línea y Conflictos',
          body: 'Menudo está diseñado con una arquitectura "Offline-First". Sus datos se guardan localmente en SQLite y se sincronizan con la nube cuando tiene conexión. En caso de conflicto de edición sobre presupuestos o categorías (por ejemplo, cambios simultáneos sin conexión), la base de datos aplicará la regla "La última escritura gana" (Last Write Wins) en base al timestamp UTC ajustado para resolver el conflicto de forma definitiva.'
        },
        {
          title: '4. Planes y Facturación',
          body: 'Ofrecemos suscripciones premium para desbloquear funciones avanzadas. Las transacciones financieras y la facturación son procesadas en su totalidad por Apple App Store a través del servicio RevenueCat. Las políticas de renovación, cancelación y reembolso se rigen de acuerdo con los términos de la App Store de Apple.'
        },
        {
          title: '5. Uso Aceptable y Automatizaciones',
          body: 'Usted se compromete a no utilizar la aplicación para actividades fraudulentas o ilícitas. La integración con Atajos de Siri y Apple Pay para automatizar registros debe ser configurada localmente en su dispositivo y es responsabilidad exclusiva del usuario cumplir con las normas de seguridad del sistema operativo.'
        },
        {
          title: '6. Limitación de Responsabilidad y Jurisdicción',
          body: 'La aplicación se proporciona "tal cual" sin garantías de ningún tipo. Miguel Cruz no será responsable de pérdidas financieras derivadas del uso del estimador de presupuestos o fallos de red. Estos términos se rigen por las leyes de la República Dominicana, y cualquier disputa será sometida a la jurisdicción exclusiva de sus tribunales.'
        }
      ]
    }
  },
  en: {
    header: {
      navItems: [
        { label: "Home", href: "/" },
        { label: "Privacy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms" },
        { label: "Support", href: "/support" }
      ],
      cta: "Download App"
    },
    hero: {
      eyebrow: "Menudo App",
      title: "See your spending clearly. Effortlessly.",
      body: "Type or speak: Menudo organizes your finances intelligently and instantly, syncing securely even when you are offline.",
      primaryCta: "Download on iOS",
      secondaryCta: "Learn More"
    },
    phoneMockups: {
      left: {
        title: "Budgets",
        value: "$9,326.45",
        status: "Earning 6.50%",
        added: "Added $2,000",
        withdrew: "Withdrew $40"
      },
      center: {
        title: "Expenses",
        value: "$1,200.00",
        status: "Up to date",
        added: "Food $50",
        withdrew: "Uber $12"
      },
      right: {
        title: "Savings",
        value: "$906,242",
        status: "$725,127 Earned",
        period: "in 30 Years"
      }
    },
    pro: {
      eyebrow: "Menudo Pro",
      title: "All your finance power in one place",
      body: "Take absolute control. From shared budgets with your partner to real-time reports that update securely and instantly.",
      primaryCta: "Get Started",
      secondaryCta: "Learn More",
      cards: [
        {
          tag: "Collaboration",
          title: "Shared",
          sub: "Family",
          body: "Invite your partner or family. Balances, categories, and limits sync automatically without conflicts."
        },
        {
          tag: "Sync",
          title: "Offline-First",
          sub: "Local-first",
          body: "The local engine synchronizes with the cloud in the background in under 150ms using our distributed DB."
        },
        {
          tag: "Security",
          title: "RLS Encryption",
          sub: "Postgres",
          body: "Advanced Row-Level Security (RLS) policies in PostgreSQL guarantee your financial data remains 100% private."
        }
      ]
    },
    engine: {
      eyebrow: "Smart Features",
      title: "Designed to flow with your day to day",
      body: "Intelligent automations, timely reminders, and collaborative tracking so you never have to worry about your finances.",
      features: {
        recurring: {
          title: "Subscriptions & Recurring",
          desc: "Take control of fixed costs. Menudo automatically logs your recurring payments and notifies you before each charge."
        },
        categorization: {
          title: "Auto-Categorization & Emojis",
          desc: "Type or speak naturally. The app instantly categorizes your entry and suggests the perfect emoji intelligently."
        },
        notifications: {
          title: "Shared Lists & Alerts",
          desc: "Real-time synchronization. Receive instant notifications on your screen when family expenses are registered."
        }
      }
    },
    trusted: {
      primaryCta: "Learn More",
      secondaryCta: "View Support",
      stats: [
        { value: "6+ Years", label: "Of experience building native mobile apps." },
        { value: "$0", label: "In duplicate charges thanks to our validation system." },
        { value: "100%", label: "Absolute privacy. Your data is encrypted and protected." }
      ]
    },
    faqs: {
      title: "FAQs",
      primaryCta: "Support page",
      questions: [
        {
          q: "What is Menudo?",
          a: "Menudo is a personal and shared finance app designed to track your expenses quickly and effortlessly using natural language and automated shortcuts."
        },
        {
          q: "Does it work without an internet connection?",
          a: "Yes! You can log all your expenses offline. Menudo saves your data securely on your device and automatically syncs it in the background as soon as your signal returns."
        },
        {
          q: "How does it prevent duplicate entries if my connection drops?",
          a: "Menudo features an intelligent validation system that detects if the app attempts to send the same expense multiple times due to a spotty network, automatically discarding any duplicates."
        },
        {
          q: "Is my financial data secure?",
          a: "Absolutely. Security is our priority. Your data is transmitted with advanced encryption, and for shared lists, only you and the people you explicitly invite have authorized access to view the expenses."
        }
      ]
    },
    footer: {
      newsletterTitle: "Be the first to hear about Menudo news and updates.",
      newsletterPlaceholder: "Your email address",
      newsletterButton: "Subscribe",
      disclaimer: "Menudo provides information and resources about personal finance. The application is designed for personal and shared use under open-source terms and cloud synchronization with integrated encryption and security."
    },
    privacyPolicy: {
      title: 'Privacy Policy',
      intro: 'We value your privacy. Below is a clear and transparent explanation of how we handle and protect your personal information in Menudo.',
      sections: [
        {
          title: '1. Data Controller',
          body: 'Menudo App is developed and operated by Miguel Cruz, based in the Dominican Republic. We are committed to protecting your privacy and treating your personal data in accordance with the highest standards of transparency and security. For any inquiries regarding this policy, please contact us at: soporte@menudoapp.com.'
        },
        {
          title: '2. Information We Collect',
          body: 'To provide our personal and shared expense tracking features, we process:\n• Account Data: Email, unique user ID, profile name, and optional profile picture provided during registration.\n• Financial Data: Transaction details you log manually or automatically (amount, concept/description, category, date, currency, and uniqueness/idempotency keys).\n• Collaboration Data: Emails of users you invite to your shared expense lists.'
        },
        {
          title: '3. AI Processing and Categorization',
          body: 'When you log a transaction via voice, text, or Siri Shortcut, the expense description and your custom category list are processed using Groq\'s LPU hardware and the Llama 3 model to automatically categorize the entry. We do not transmit personally identifiable information (such as your name or email) to Groq\'s AI services.'
        },
        {
          title: '4. Providers and Storage',
          body: 'Your data is stored and processed securely using industry-leading technology providers:\n• Supabase: For secure, encrypted database hosting, user authentication, and cloud storage.\n• RevenueCat & Apple App Store: For secure management of premium subscription status and billing. We never store or handle your credit/debit card details.\n• Apple APNs: For sending clean, real-time push notifications regarding collaborative list activities.\n• Sentry: For application stability monitoring and capturing system and server errors.\n• PostHog: For product analytics and tracking user interactions inside the mobile app and website.'
        },
        {
          title: '5. Data Retention and Security',
          body: '• Extreme Idempotency: Every transaction contains a unique "idempotency_key" generated by the mobile client. If your connection drops and transmits multiple times, our backend prevents duplicate logs.\n• Retention: We keep your data only as long as your account remains active. If you choose to delete your account in the app settings, all your personal info and transaction history will be permanently and immediately deleted from our active databases.'
        },
        {
          title: '6. Your Rights and Governing Law',
          body: 'You retain the right to access, correct, export, or permanently delete your data at any time. Operated by Miguel Cruz, this agreement is governed by the laws of the Dominican Republic, while incorporating global compliance standards (including GDPR rights) for all users.'
        }
      ]
    },
    terms: {
      title: 'Terms of Service',
      intro: 'Please read these terms carefully before using Menudo App. They govern your access to and use of the application and its associated services.',
      sections: [
        {
          title: '1. Agreement to Terms',
          body: 'By downloading, installing, or using Menudo App, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using the application and our web services.'
        },
        {
          title: '2. Accounts and Access',
          body: 'To use the application, you must register through our supported authentication methods. You agree to provide true and accurate information and maintain the security of your credentials. Unauthorized use of another user\'s account is strictly prohibited.'
        },
        {
          title: '3. Offline Sync and Conflicts',
          body: 'Menudo is built on an "Offline-First" architecture. Data is stored locally on SQLite and synced with the cloud. In case of conflicting edits on budgets or categories, the database resolves the dispute using the "Last Write Wins" (LWW) strategy based on server-synchronized UTC timestamps to determine the final state.'
        },
        {
          title: '4. Subscriptions and Billing',
          body: 'We offer premium subscription plans for advanced features. All billing, purchases, and subscriptions are managed exclusively through the Apple App Store and RevenueCat. Renewal, cancellation, and refund policies are subject to Apple\'s App Store terms and conditions.'
        },
        {
          title: '5. Acceptable Use and Shortcuts',
          body: 'You agree not to use the app for any fraudulent, abusive, or unlawful activities. The configuration of Siri Shortcuts and Apple Pay triggers for automatic expense logging is performed locally on your device, and you are solely responsible for compliance with iOS security guidelines.'
        },
        {
          title: '6. Limitation of Liability and Governing Law',
          body: 'The App is provided on an "as-is" basis without warranties of any kind. Miguel Cruz shall not be liable for financial losses arising from budget estimate calculations or network outages. These Terms are governed by the laws of the Dominican Republic, and any disputes shall be resolved in its courts.'
        }
      ]
    }
  }
};
