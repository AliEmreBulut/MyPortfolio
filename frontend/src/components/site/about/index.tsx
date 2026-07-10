"use client";
import { GlassCard } from "@/components/ui/glass-card";
import { AboutAside } from "./AboutAside";
import { aboutData } from "./data";
import { styles } from "./styles";
import { UserProfileResponse } from "@/types/user";

interface AboutProps {
  user?: UserProfileResponse | null;
}

export default function About({ user }: AboutProps) {
  const paragraphs = user?.aboutText
    ? user.aboutText.split('\n').filter(p => p.trim() !== '')
    : aboutData.paragraphs.map(p => p.text);

  return (
    <section className={styles.section} id="about">
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>About</p>
        <div className="flex items-center gap-4">
          <h2 className={styles.title}>Hakkımda</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-green/50 to-transparent"></div>
        </div>
        <p className={styles.description}>
          Kendimi sürekli geliştirmeyi hedefleyen, yenilikçi ve araştırmacı bir bilgisayar mühendisiyim.
        </p>
      </div>

      <div className={styles.grid}>
        <AboutAside user={user} />

        <GlassCard className={styles.articleCard} as="article">
          {paragraphs.map((text, i) => (
            <p key={i} className={styles.paragraph}>
              {text}
            </p>
          ))}
        </GlassCard>
      </div>
    </section>
  );
}
