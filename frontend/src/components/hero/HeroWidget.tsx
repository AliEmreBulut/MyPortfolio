"use client";
import { useState } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { GlassCard } from "@/components/ui/glass-card";
import { heroWidgetFilters } from "./data";
import { styles } from "./styles";

export function HeroWidget() {
  const [activeFilterId, setActiveFilterId] = useState(heroWidgetFilters[0].id);
  const activeFilter = heroWidgetFilters.find(f => f.id === activeFilterId) || heroWidgetFilters[0];

  return (
    <CardContainer className="w-full mt-4">
      <CardBody className="w-full">
        <CardItem translateZ="30" className="w-full">
          <GlassCard hoverEffect className="overflow-hidden">
            <div className={styles.widgetHeader}>
              <span className={styles.commandPrompt}>$</span>
              <span>{activeFilter.command}</span>
              <span className={styles.widgetCursor}></span>
            </div>
            <div className={styles.widgetFilters}>
              {heroWidgetFilters.map(filter => (
                <button 
                  key={filter.id}
                  className={activeFilterId === filter.id ? styles.filterActive : styles.filterInactive}
                  onClick={() => setActiveFilterId(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className={styles.widgetResult}>
              <span className={styles.widgetResultArrow}>↳</span>
              <p className={styles.widgetResultText}>{activeFilter.result}</p>
            </div>
          </GlassCard>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
