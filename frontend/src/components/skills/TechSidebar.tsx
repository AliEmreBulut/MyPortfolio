import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { TechCategory } from "./types";
import { styles } from "./styles";

interface TechSidebarProps {
  categories: TechCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function TechSidebar({ categories, activeId, onSelect }: TechSidebarProps) {
  return (
    <GlassCard as="aside" className={styles.asideCard}>
      <div className={styles.techBadge}>
        <span className={styles.techBadgeDot}></span>
        <span>tech.stack</span>
      </div>
      <h3 className={styles.asideTitle}>Teknoloji profili</h3>
      <p className={styles.asideDesc}>
        Web geliştirme sürecinde arayüz, sunucu tarafı, veritabanı ve geliştirme araçlarını birlikte kullanarak
        uçtan uca proje geliştirme yaklaşımı.
      </p>
      <div className={styles.btnContainer}>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            className={cn(styles.btn, activeId === cat.id && "active")} 
            onClick={() => onSelect(cat.id)}
            type="button"
          >
            <span className={styles.btnNumber}>{cat.number}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
