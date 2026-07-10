import { styles } from "./styles";
import { UserProfileResponse } from "@/types/user";

export function HeroContent({ user }: { user?: UserProfileResponse | null }) {
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Ali Emre";
  const lastName = user?.fullName ? user.fullName.split(" ").slice(1).join(" ") : "Bulut";

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.badge}>
        <span className={styles.badgeDot}></span> 
        {user?.title || "Computer Engineer"}
      </div>
      <h1 className={styles.heading}>
        Merhaba, ben
        <span className={styles.headingHighlight}>{firstName} {lastName}.</span>
      </h1>
      <p className={styles.description}>
        {user?.shortSummary || "Modern web teknolojileriyle kullanıcı odaklı, sürdürülebilir ve estetik dijital ürünler geliştiren bilgisayar mühendisiyim. Temiz kod, güçlü arayüz ve sağlam sistem mantığını bir araya getiririm."}
      </p>
      <div className={styles.btnGroup}>
        <a className={styles.btnOutline} href="#about">Hakkımda</a>
        <a className={styles.btnPrimary} href="#projects">Projelerimi gör →</a>
      </div>
    </div>
  );
}
