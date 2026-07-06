import { Project } from "./types";

export const projectsData: Project[] = [
  {
    id: "hospital",
    category: "Web Application",
    title: "Hospital Automation",
    shortDesc: "Hasta, doktor, randevu ve reçete süreçlerini yönetmeye odaklanan kapsamlı hastane otomasyon sistemi.",
    fullDesc: "Hasta, doktor, randevu ve reçete süreçlerini tek panelden yönetmeye odaklanan hastane otomasyon sistemi.",
    techDetails: [
      { title: "Frontend", desc: "HTML, CSS, JavaScript ile kullanıcı panelleri ve form ekranları." },
      { title: "Backend", desc: "C#, ASP.NET Core, REST API ve katmanlı servis mantığı." },
      { title: "Database", desc: "MariaDB / MySQL, Entity Framework ve ilişkisel veri modeli." },
    ],
    stack: ["ASP.NET Core", "C#", "MariaDB"],
    image: "/project-hospital.jpg",
  },
  {
    id: "letsmeet",
    category: "React / Firebase",
    title: "Let’s Meet",
    shortDesc: "Kullanıcıların etkinlik oluşturup keşfedebildiği, profil ve filtreleme özellikleri bulunan sosyal web uygulaması.",
    fullDesc: "Kullanıcıların etkinlik oluşturup keşfedebildiği, profil ve filtreleme özellikleri bulunan sosyal web uygulaması.",
    techDetails: [
      { title: "Frontend", desc: "React, Vite, Bootstrap ve modern component yapısı." },
      { title: "Backend", desc: "Firebase Authentication ve uygulama durum yönetimi." },
      { title: "Database", desc: "Firestore, Firebase Storage ve kullanıcı/etkinlik verileri." },
    ],
    stack: ["React", "Vite", "Firebase"],
    image: "/project-letsmeet.jpg",
  },
  {
    id: "store",
    category: "E-commerce UI",
    title: "GS Store Clone",
    shortDesc: "Modern e-ticaret arayüzü, ürün vitrinleri, slider yapısı ve responsive tasarım mantığıyla hazırlanan frontend çalışma.",
    fullDesc: "Modern e-ticaret arayüzü, ürün vitrinleri, slider yapısı ve responsive tasarım mantığıyla hazırlanan frontend çalışma.",
    techDetails: [
      { title: "Frontend", desc: "React, TypeScript, Tailwind CSS, Swiper ve responsive layout." },
      { title: "Backend", desc: "Frontend odaklı çalışma; backend entegrasyonuna uygun yapı." },
      { title: "Database", desc: "Ürün verisi için JSON/mock data mantığı ve ileride API desteği." },
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    image: "/project-store.jpg",
  },
];
