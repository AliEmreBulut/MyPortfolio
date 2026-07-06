import { SocialLink } from "./types";

export const socialsData: SocialLink[] = [
  {
    id: "mail",
    href: "mailto:aliemre@example.com",
    label: "Mail",
    value: "aliemre@example.com",
    icon: (
      <svg className="w-6 h-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5"></rect>
        <path d="M4.5 7.4 12 13l7.5-5.6"></path>
      </svg>
    )
  },
  {
    id: "github",
    href: "https://github.com/aliemrebulut",
    label: "GitHub",
    value: "github.com/aliemrebulut",
    icon: (
      <svg className="w-6 h-6 fill-current stroke-none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.3-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7.2 8c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z"></path>
      </svg>
    )
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/aliemrebulut",
    label: "LinkedIn",
    value: "linkedin.com/in/aliemrebulut",
    icon: (
      <svg className="w-6 h-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="3.5"></rect>
        <path d="M7.5 10v7"></path>
        <path d="M7.5 7v.1"></path>
        <path d="M11 17v-7"></path>
        <path d="M11 13c0-2 1.2-3.2 3-3.2 1.7 0 2.8 1.1 2.8 3.2v4"></path>
      </svg>
    )
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/aliemrebulut",
    label: "Instagram",
    value: "@aliemrebulut",
    icon: (
      <svg className="w-6 h-6 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.2"></rect>
        <circle cx="12" cy="12" r="3.3"></circle>
        <circle cx="16.6" cy="7.4" r=".7"></circle>
      </svg>
    )
  },
  {
    id: "phone",
    href: "tel:+905XXXXXXXXX",
    label: "Telefon",
    value: "+90 5XX XXX XX XX",
    icon: (
      <svg className="w-6 h-6 fill-current stroke-none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4.4 9.4 9c.3.5.1 1.1-.3 1.5l-1.1 1c1.1 2.2 2.9 4 5.1 5.1l1-1.1c.4-.4 1-.6 1.5-.3l4.3 2.2c.6.3.9.9.7 1.5-.4 1.6-1.9 2.6-3.5 2.3C9.5 19.6 4.4 14.5 3.3 6.9 3 5.3 4 3.8 5.6 3.4c.6-.2 1.2.1 1.4 1Z"></path>
      </svg>
    )
  }
];
