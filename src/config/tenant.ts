export interface TenantConfig {
  name: string;
  shortName: string;
  description: string;
  keywords: string;
  url: string;
  author: string;
  contact: {
    phone: string;
    whatsappMessage: string;
    email?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    countryCode: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  business: {
    type: string;
    priceRange: string;
    founderName: string;
    openingHours: {
      dayOfWeek: string | string[];
      opens: string;
      closes: string;
    }[];
  };
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  theme: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const tenantConfig: TenantConfig = {
  name: "Lunfardo Tattoo",
  shortName: "Lunfardo",
  description:
    "Estudio privado y exclusivo de tatuajes y piercing en Ibi, Alicante. Fine line, realismo, blackwork, cover up y murales. Más de una década de experiencia, solo con cita previa.",
  keywords:
    "tatuajes, piercing, Ibi, Alicante, fine line, realismo, blackwork, cover up, murales, tattoo studio",
  url: "https://lunfardotattoo.com",
  author: "Lunfardo Tattoo",
  contact: {
    phone: "+34603342874",
    whatsappMessage: "Hola, me gustaría agendar una cita",
  },
  address: {
    street: "C/Paca Guillem N14",
    city: "Ibi",
    state: "Alicante",
    zip: "03440",
    country: "España",
    countryCode: "ES",
  },
  geo: {
    latitude: 38.6267,
    longitude: -0.5721,
  },
  business: {
    type: "TattooParlor",
    priceRange: "$$",
    founderName: "Alberto",
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
  },
  social: {
    instagram: "https://www.instagram.com/lunfardo_/",
  },
  theme: {
    primaryColor: "#0c0c0c",
    backgroundColor: "#0c0c0c",
    fontFamily: "Inter",
  },
  faqs: [
    {
      question: "¿Cómo agendar una cita para un tatuaje en Ibi?",
      answer:
        "Para agendar tu cita en nuestro estudio privado en Ibi, Alicante, puedes escribirnos directamente por WhatsApp o utilizar nuestro cotizador online. Trabajamos únicamente con cita previa para garantizar la privacidad y atención exclusiva a tu proyecto.",
    },
    {
      question: "¿Cuáles son los cuidados recomendados para un tatuaje recién hecho?",
      answer:
        "El cuidado es fundamental para mantener la calidad del tatuaje. Recomendamos lavar la zona suavemente con agua y jabón neutro, secar con papel de cocina a toques y aplicar una capa muy fina de crema cicatrizante específica 2 a 3 veces al día. Evita la exposición al sol, piscinas y agua del mar durante las primeras semanas.",
    },
    {
      question: "¿Realizan arreglos o cover ups de tatuajes antiguos?",
      answer:
        "Sí, somos expertos en cover up. Transformamos y renovamos tatuajes antiguos para darles una nueva vida. Analizamos cada caso particular para ofrecer la mejor solución técnica y estética.",
    },
    {
      question: "¿Puedo llevar mi propio diseño o hacen diseños personalizados?",
      answer:
        "Ambas opciones son posibles. Si tienes una idea clara, la adaptaremos para que el resultado en la piel sea óptimo. Si prefieres algo único, crearemos un diseño 100% personalizado basándonos en tus referencias y nuestro estilo autoral.",
    },
  ],
};
