import { GlassCard } from "@/components/ui/glass-card";
import { TechCategory } from "./types";
import { styles } from "./styles";

interface TechPreviewProps {
  category: TechCategory;
}

export function TechPreview({ category }: TechPreviewProps) {
  return (
    <GlassCard as="article" className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <div>
          <span className={styles.previewKicker}>{category.kicker}</span>
          <h3 className={styles.previewTitle}>{category.title}</h3>
        </div>
        <div className={styles.previewIcon}>{category.icon}</div>
      </div>
      
      <div className={styles.commandBox}>
        <span className={styles.commandPrompt}>$</span>
        <strong className={styles.commandText}>{category.command}</strong>
      </div>
      
      <p className={styles.previewText}>
        {category.text}
      </p>
      
      <div className={styles.chipsContainer}>
        {category.chips.map((chip, idx) => (
          <span key={idx}>{chip}</span>
        ))}
      </div>
      
      <div className={styles.focusBox}>
        <span className={styles.focusBadge}>Focus</span>
        <p className={styles.focusText}>{category.focus}</p>
      </div>
    </GlassCard>
  );
}
