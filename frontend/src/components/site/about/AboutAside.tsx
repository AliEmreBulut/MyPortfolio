"use client";
import { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { styles } from "./styles";
import { UserProfileResponse } from "@/types/user";

export function AboutAside({ user }: { user?: UserProfileResponse | null }) {
  const [imgError, setImgError] = useState(false);
  const fallbackInitials = user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : "AB";

  return (
    <GlassCard as="aside" className={styles.aside} hoverEffect>
      <div className={styles.avatarWrapper}>
        {!imgError && (
          <Image
            className={styles.avatarImage}
            alt={`${user?.fullName || "Ali Emre Bulut"} profil fotoğrafı`}
            src={user?.profileImageUrl || "/Ali_Emre_Bulut_Profile.jpg"}
            width={192}
            height={192}
            priority
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
          <div className={styles.avatarFallback.replace("hidden ", "")} style={{ display: 'grid' }}>
            {fallbackInitials}
          </div>
        )}
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.name}>{user?.fullName || "Ali Emre Bulut"}</h3>
        <p className={styles.titleJob}>{user?.title || "Computer Engineer"}</p>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          Available for Work
        </div>
      </div>
    </GlassCard>
  );
}
