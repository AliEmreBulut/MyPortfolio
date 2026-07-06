"use client";
import { Spotlight } from "@/components/ui/spotlight";
import { HeroContent } from "./HeroContent";
import { HeroTerminal } from "./HeroTerminal";
import { HeroWidget } from "./HeroWidget";
import { styles } from "./styles";

export default function Hero() {
  return (
    <section className={styles.section} id="home">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <HeroContent />
      <aside className={styles.aside}>
        <HeroTerminal />
        <HeroWidget />
      </aside>
    </section>
  );
}
