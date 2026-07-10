import { BackgroundBeams } from '@/components/ui/background-beams';
import Header from '@/components/site/layout/Header';
import Hero from '@/components/site/hero';
import About from '@/components/site/about';
import Skills from '@/components/site/skills';
import Experiences from '@/components/site/experiences';
import Projects from '@/components/site/projects';
import Contact from '@/components/site/contact';
import Footer from '@/components/site/layout/Footer';
import GlobalScripts from '@/components/site/layout/GlobalScripts';
import ChatBot from '@/components/site/chatbot/ChatBot';

import { getProfile } from '@/lib/api/server/userService';
import { getSkills } from '@/lib/api/server/skillService';
import { getProjects } from '@/lib/api/server/projectService';
import { getExperiences } from '@/lib/api/server/experienceService';
import { UserProfileResponse } from '@/types/user';
import { SkillResponse } from '@/types/skill';
import { ProjectResponse } from '@/types/project';
import { ExperienceResponse } from '@/lib/api/client/experience';

export const dynamic = 'force-dynamic'; // Her istekte sunucuda yeniden oluştur

export default async function Home() {
  let profile: UserProfileResponse | null = null;
  let skills: SkillResponse[] = [];
  let projects: ProjectResponse[] = [];
  let experiences: ExperienceResponse[] = [];

  try {
    // Tüm verileri sunucuda paralel olarak çek
    const [profileRes, skillsRes, projectsRes, expRes] = await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getExperiences()
    ]);
    profile = profileRes;
    skills = skillsRes;
    projects = projectsRes;
    experiences = expRes;
  } catch (error) {
    console.error("[Server Component] Failed to fetch data:", error);
  }

  return (
    <>
      <BackgroundBeams />
      <Header user={profile} />
      <main>
        <Hero user={profile} />
        <About user={profile} />
        <Skills skills={skills} />
        <Experiences experiences={experiences} />
        <Projects projects={projects} />
        <Contact user={profile} />
      </main>
      <Footer user={profile} />
      <ChatBot />
      <GlobalScripts />
    </>
  );
}
