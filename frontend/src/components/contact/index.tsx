"use client";
import { GlassCard } from "@/components/ui/glass-card";
import { ContactItem } from "./ContactItem";
import { socialsData } from "./data";
import { styles } from "./styles";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>Contact</p>
        <h2 className={styles.title}>İletişim</h2>
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
          {socialsData.map((item) => (
            <ContactItem key={item.id} item={item} />
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
