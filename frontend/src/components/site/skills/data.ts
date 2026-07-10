import { TechCategory } from "./types";

export const skillsData: TechCategory[] = [
  {
    id: "frontend",
    number: "01",
    label: "Frontend",
    kicker: "Frontend Stack",
    title: "Modern kullanıcı arayüzleri",
    icon: "FE",
    command: "show stack --frontend",
    text: "React, JavaScript, HTML ve CSS ile responsive, hızlı ve kullanıcı dostu arayüzler geliştirmeye odaklanırım.",
    chips: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Framer Motion"],
    focus: "Responsive arayüz, temiz bileşen yapısı ve kullanıcı dostu web deneyimi."
  },
  {
    id: "backend",
    number: "02",
    label: "Backend",
    kicker: "Backend Stack",
    title: "Güçlü sunucu mimarileri",
    icon: "BE",
    command: "show stack --backend",
    text: "ASP.NET Core ve Node.js ekosistemlerini kullanarak ölçeklenebilir, güvenli ve performanslı RESTful API'ler tasarlarım.",
    chips: ["C#", "ASP.NET Core", "Node.js", "Express", "REST API", "Entity Framework", "JWT", "Microservices"],
    focus: "Katmanlı mimari, güvenli yetkilendirme ve performanslı veri işleme süreçleri."
  },
  {
    id: "database",
    number: "03",
    label: "Database",
    kicker: "Database Stack",
    title: "Veri yönetimi ve optimizasyon",
    icon: "DB",
    command: "show stack --database",
    text: "İlişkisel veritabanları ile sağlam şemalar kurarken, NoSQL çözümleriyle esnek veri akışları yönetebilirim.",
    chips: ["MariaDB", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Firestore", "SQL Server"],
    focus: "Doğru tablo ilişkileri, indeksleme optimizasyonları ve veri bütünlüğü."
  },
  {
    id: "tools",
    number: "04",
    label: "Tools",
    kicker: "Dev Tools",
    title: "Geliştirme ve dağıtım araçları",
    icon: "TL",
    command: "show tools --all",
    text: "Kod versiyonlamadan, sunucu dağıtımına ve takım çalışmasına kadar sürecin her aşamasında modern araçlar kullanırım.",
    chips: ["Git", "GitHub", "Docker", "Postman", "Swagger", "Figma", "VS Code", "Vite", "Turbopack"],
    focus: "Sürekli entegrasyon, versiyon kontrolü ve dökümantasyon standartları."
  }
];
