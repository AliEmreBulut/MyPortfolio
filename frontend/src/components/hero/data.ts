export const heroTerminalTabs = [
  {
    id: "profile",
    label: "Profile",
    fileName: "profile.json",
    command: "run profile --summary",
    content: `{
  "name": "Ali Emre Bulut",
  "role": "Computer Engineer",
  "focus": [
    "Backend Architecture",
    "Modern Web Technologies",
    "Database Systems"
  ],
  "experience": "Junior / Mid-Level",
  "location": "Turkey",
  "status": "Available for Work"
}`
  },
  {
    id: "contact",
    label: "Contact",
    fileName: "contact.json",
    command: "run profile --contact",
    content: `{
  "email": "aliemre@example.com",
  "github": "github.com/aliemrebulut",
  "linkedin": "linkedin.com/in/aliemrebulut",
  "phone": "+90 5XX XXX XX XX"
}`
  }
];

export const heroWidgetFilters = [
  {
    id: "frontend",
    label: "Frontend",
    command: "show skills --frontend",
    result: "React • JavaScript • HTML • CSS • Tailwind CSS • Bootstrap"
  },
  {
    id: "backend",
    label: "Backend",
    command: "show skills --backend",
    result: "C# • ASP.NET Core • Node.js • Express • REST API"
  },
  {
    id: "database",
    label: "Database",
    command: "show skills --database",
    result: "MariaDB • MySQL • PostgreSQL • MongoDB • Redis"
  }
];
