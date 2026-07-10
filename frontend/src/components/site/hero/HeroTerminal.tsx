"use client";
import { useState, useEffect } from "react";
import { cn } from '@/lib/utils';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { GlassCard } from "@/components/ui/glass-card";
import { heroTerminalTabs } from "./data";
import { styles } from "./styles";
import { UserProfileResponse } from "@/types/user";

export function HeroTerminal({ user }: { user?: UserProfileResponse | null }) {
  const customSnippet = user?.heroCodeSnippet;

  // If user provided a custom snippet, we create a dynamic tab for it
  const dynamicTabs = customSnippet 
    ? [{ id: 'custom', label: 'developer.json', command: 'cat developer.json', fileName: 'developer.json', content: customSnippet }]
    : heroTerminalTabs;

  const [activeTabId, setActiveTabId] = useState(dynamicTabs[0].id);
  const activeTab = dynamicTabs.find(t => t.id === activeTabId) || dynamicTabs[0];

  const [displayedText, setDisplayedText] = useState("");

  // Simple typing effect when tab changes
  useEffect(() => {
    let currentText = "";
    let i = 0;
    const fullText = activeTab.content;
    
    setDisplayedText(""); // reset
    
    const interval = setInterval(() => {
      currentText += fullText[i];
      setDisplayedText(currentText);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 15); // typing speed
    
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <CardContainer className="w-full">
      <CardBody className="w-full">
        <CardItem translateZ="50" className="w-full">
          <GlassCard hoverEffect className="overflow-hidden">
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={cn(styles.terminalDot, "bg-red-500/80")}></span>
                <span className={cn(styles.terminalDot, "bg-yellow-500/80")}></span>
                <span className={cn(styles.terminalDot, "bg-green-500/80")}></span>
              </div>
              <span className={styles.terminalTitle}>developer.console</span>
            </div>
            
            <div className={styles.terminalBody}>
              <div className="flex flex-col">
                <CardItem translateZ="20" className={styles.commandBox}>
                  <span className={styles.commandPrompt}>$</span>
                  <span>{activeTab.command}</span>
                  <span className={styles.commandCursor}></span>
                </CardItem>
                <div className={styles.tabList}>
                  {dynamicTabs.map(tab => (
                    <CardItem key={tab.id} translateZ={activeTabId === tab.id ? 30 : 10}>
                      <button 
                        className={activeTabId === tab.id ? styles.tabActive : styles.tabInactive}
                        onClick={() => setActiveTabId(tab.id)}
                      >
                        {tab.label}
                      </button>
                    </CardItem>
                  ))}
                </div>
              </div>
              
              <CardItem translateZ="40" className="w-full">
                <div className={styles.outputBox}>
                  <div className={styles.outputHeader}>
                    <span>{activeTab.fileName}</span>
                    <span className={styles.outputStatus}>active</span>
                  </div>
                  <pre className={styles.outputContent}>{displayedText}</pre>
                </div>
              </CardItem>
            </div>
          </GlassCard>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
