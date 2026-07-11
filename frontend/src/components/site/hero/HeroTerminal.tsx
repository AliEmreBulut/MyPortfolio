"use client";
import { useState, useEffect, useMemo } from "react";
import { cn } from '@/lib/utils';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { GlassCard } from "@/components/ui/glass-card";
import { heroTerminalTabs } from "./data";
import { styles } from "./styles";
import { UserProfileResponse } from "@/types/user";

export function HeroTerminal({ user }: { user?: UserProfileResponse | null }) {
  const customSnippet = user?.heroCodeSnippet;

  const dynamicTabs = useMemo(() => {
    let tabs = [];
    
    if (customSnippet) {
      tabs.push({ id: 'custom', label: 'developer.json', command: 'cat developer.json', fileName: 'developer.json', content: customSnippet });
    }

    if (user) {
      const profileObj: Record<string, any> = {
        name: user.fullName || "Developer",
        role: user.title || "Software Engineer",
        summary: user.shortSummary || "No summary available.",
        status: "Available for Work"
      };

      tabs.push({
        id: "profile",
        label: "Profile",
        fileName: "profile.json",
        command: "run profile --summary",
        content: JSON.stringify(profileObj, null, 2)
      });

      const contactObj: Record<string, string> = {};
      if (user.email) contactObj.email = user.email;
      if (user.phone) contactObj.phone = user.phone;
      if (user.gitHubUrl) contactObj.github = user.gitHubUrl;
      if (user.linkedInUrl) contactObj.linkedin = user.linkedInUrl;

      tabs.push({
        id: "contact",
        label: "Contact",
        fileName: "contact.json",
        command: "run profile --contact",
        content: Object.keys(contactObj).length > 0 ? JSON.stringify(contactObj, null, 2) : "{\n  \"message\": \"No contact info.\"\n}"
      });
    } else if (!customSnippet) {
      tabs = heroTerminalTabs;
    }
    
    return tabs;
  }, [user, customSnippet]);

  const [activeTabId, setActiveTabId] = useState(dynamicTabs[0]?.id || 'profile');
  const activeTab = dynamicTabs.find(t => t.id === activeTabId) || dynamicTabs[0];

  const [displayedText, setDisplayedText] = useState("");

  // yazı yazma efekti
  useEffect(() => {
    if (!activeTab) return;
    let currentText = "";
    let i = 0;
    const fullText = activeTab.content;

    setDisplayedText(""); // reset

    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [activeTab?.id, activeTab?.content]);

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
