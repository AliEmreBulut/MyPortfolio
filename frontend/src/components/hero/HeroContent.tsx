import { styles } from "./styles";

export function HeroContent() {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.badge}>
        <span className={styles.badgeDot}></span> 
        Computer Engineer
      </div>
      <h1 className={styles.heading}>
        Merhaba, ben
        <span className={styles.headingHighlight}>Ali Emre Bulut.</span>
      </h1>
      <p className={styles.description}>
        Modern web teknolojileriyle kullanıcı odaklı, sürdürülebilir ve estetik dijital ürünler geliştiren
        bilgisayar mühendisiyim. <strong>Temiz kod</strong>, güçlü arayüz ve sağlam sistem mantığını bir araya getiririm.
      </p>
      <div className={styles.btnGroup}>
        <a className={styles.btnOutline} href="#about">Hakkımda</a>
        <a className={styles.btnPrimary} href="#projects">Projelerimi gör →</a>
      </div>
    </div>
  );
}
