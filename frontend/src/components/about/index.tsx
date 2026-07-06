"use client";
import { GlassCard } from "@/components/ui/glass-card";
import { AboutAside } from "./AboutAside";
import { aboutData } from "./data";
import { styles } from "./styles";

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>About</p>
        <h2 className={styles.title}>Hakkımda</h2>
        <p className={styles.description}>
          Kendimi sürekli geliştirmeyi hedefleyen, yenilikçi ve araştırmacı bir bilgisayar mühendisiyim.
        </p>
      </div>
      
      <div className={styles.grid}>
        <AboutAside />

        <GlassCard className={styles.articleCard} as="article">
          {aboutData.paragraphs.map((p) => (
            <p key={p.id} className={styles[p.classNameKey as keyof typeof styles]}>
              {p.text}
            </p>
          ))}
        </GlassCard>
      </div>
    </section>
  );
}
