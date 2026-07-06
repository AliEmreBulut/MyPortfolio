import { SocialLink } from "./types";
import { styles } from "./styles";

interface ContactItemProps {
  item: SocialLink;
}

export function ContactItem({ item }: ContactItemProps) {
  return (
    <a
      className={styles.socialCard}
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={`${item.label} hesabına git`}
    >
      <span className={styles.iconWrapper}>
        {item.icon}
      </span>
      <span className={styles.socialLabel}>{item.label}</span>
      <strong className={styles.socialValue}>{item.value}</strong>
      <span className={styles.arrowBtn}>↗</span>
    </a>
  );
}
