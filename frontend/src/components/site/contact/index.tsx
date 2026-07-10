"use client";
import { useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ContactItem } from "./ContactItem";
import { socialsData } from "./data";
import { styles } from "./styles";
import { UserProfileResponse } from "@/types/user";

interface ContactProps {
  user?: UserProfileResponse | null;
}

export default function Contact({ user }: ContactProps) {
  // Backend'den gelen kullanıcı bilgileriyle statik verileri birleştir
  const mergedSocials = useMemo(() => {
    if (!user) return socialsData;

    return socialsData.map(item => {
      switch (item.id) {
        case "mail":
          return user.email 
            ? { ...item, href: `mailto:${user.email}`, value: user.email }
            : item;
        case "github":
          return user.gitHubUrl 
            ? { ...item, href: user.gitHubUrl, value: user.gitHubUrl.replace("https://", "") }
            : item;
        case "linkedin":
          return user.linkedInUrl 
            ? { ...item, href: user.linkedInUrl, value: user.linkedInUrl.replace("https://www.", "") }
            : item;
        case "instagram":
          return user.instagramUrl 
            ? { ...item, href: user.instagramUrl, value: `@${user.instagramUrl.split("/").pop()}` }
            : item;
        case "phone":
          return user.phone 
            ? { ...item, href: `tel:${user.phone}`, value: user.phone }
            : item;
        default:
          return item;
      }
    });
  }, [user]);

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>Contact</p>
        <div className="flex items-center gap-4">
          <h2 className={styles.title}>İletişim</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-green/50 to-transparent"></div>
        </div>
        <p className={styles.description}>Benimle mail, GitHub, LinkedIn, Instagram ve telefon üzerinden iletişime geçebilirsiniz.</p>
      </div>

      <GlassCard className={styles.mainCard} id="contactSocialSection">
        <div className={styles.mainCardContent}>
          <p className={styles.mainCardSubTitle}>Contact</p>
          <h3 className={styles.mainCardTitle}>Benimle iletişime geçebilirsiniz.</h3>
          <p className={styles.mainCardDesc}>
            Proje, iş birliği, staj veya yazılım geliştirme süreçleri için aşağıdaki hesaplar üzerinden bana
            ulaşabilirsiniz.
          </p>
        </div>

        <div className={styles.grid}>
          {mergedSocials.map((item) => (
            <ContactItem key={item.id} item={item} />
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
