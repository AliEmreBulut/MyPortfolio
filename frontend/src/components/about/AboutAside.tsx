"use client";
import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { styles } from "./styles";

export function AboutAside() {
  const [imgError, setImgError] = useState(false);

  return (
    <GlassCard as="aside" className={styles.aside} hoverEffect>
      <div className={styles.avatarWrapper}>
        {!imgError && (
          <Image
            className={styles.avatarImage}
            alt="Ali Emre Bulut profil fotoğrafı"
            src="/Ali_Emre_Bulut_Profile.jpg"
            width={192}
            height={192}
            priority
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
          <div className={styles.avatarFallback.replace("hidden ", "")} style={{ display: 'grid' }}>
            AB
          </div>
        )}
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>Ali Emre Bulut</h3>
        <p className={styles.titleJob}>Computer Engineer</p>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          Available for Work
        </div>
      </div>
    </GlassCard>
  );
}
