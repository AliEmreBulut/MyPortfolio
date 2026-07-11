export default function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 w-[420px] h-[420px] rounded-full pointer-events-none z-[-1] opacity-[0.28] blur-[2px] transition-opacity duration-[250ms] max-md:hidden"
        style={{
          background: 'radial-gradient(circle, rgba(98, 217, 255, 0.18), rgba(124, 247, 196, 0.08) 34%, transparent 68%)',
          transform: 'translate3d(calc(var(--mouse-x, 50vw) - 210px), calc(var(--mouse-y, 50vh) - 210px), 0)'
        }}
      ></div>

      <div className="fixed inset-0 z-[-3] before:content-[''] before:absolute before:w-[420px] before:h-[420px] before:rounded-full before:blur-[30px] before:opacity-[0.18] before:animate-orb-float before:left-[8%] before:top-[18%] before:bg-[#7cf7c4]/32 after:content-[''] after:absolute after:w-[420px] after:h-[420px] after:rounded-full after:blur-[30px] after:opacity-[0.18] after:animate-orb-float after:right-[10%] after:bottom-[12%] after:bg-[#a78bfa]/32 after:[animation-delay:-2s]"
        style={{
          background: 'radial-gradient(circle at 18% 18%, rgba(124, 247, 196, 0.10), transparent 30%), radial-gradient(circle at 82% 24%, rgba(98, 217, 255, 0.12), transparent 28%), radial-gradient(circle at 50% 88%, rgba(167, 139, 250, 0.14), transparent 34%), linear-gradient(180deg, #05070d 0%, #070b16 50%, #05070d 100%)'
        }}>
      </div>

      <div aria-hidden="true" className="aurora-layer"></div>

      <div className="fixed inset-0 z-[-1] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent 78%)'
        }}>
      </div>

      <div aria-hidden="true" className="fixed inset-0 z-[-2] opacity-[0.22] max-md:opacity-[0.14] text-[#7cf7c4]/56 font-mono text-[13px] leading-[1.7] overflow-hidden pointer-events-none code-wall"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.14) 24%, rgba(0, 0, 0, 0.92) 58%, rgba(0, 0, 0, 0.86) 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.14) 24%, rgba(0, 0, 0, 0.92) 58%, rgba(0, 0, 0, 0.86) 82%, transparent 100%)'
        }}>

        <pre className="absolute w-[760px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] left-[-90px] top-[110px] -rotate-8 max-md:left-[3%] max-md:top-auto max-md:bottom-[18%] max-md:w-[360px] max-md:-rotate-5 max-md:text-[#7cf7c4]/36">
          {`const portfolio = {
  theme: "dark",
  background: "code",
  sections: ["about", "skills", "projects"],
  developer: {
    mindset: "clean code",
    focus: "user experience",
    output: "professional product"
  }
};`}
        </pre>
        <pre className="absolute w-[760px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] right-[-120px] top-[90px] rotate-8 text-[#62d9ff]/56 max-md:right-[3%] max-md:top-auto max-md:bottom-[18%] max-md:w-[360px] max-md:rotate-5 max-md:text-[#62d9ff]/34">
          {`type Developer = {
  name: string;
  role: "Computer Engineer";
  stack: string[];
  projects: Project[];
};

const principles = [
  "readable architecture",
  "responsive interface",
  "real problem solving"
];`}
        </pre>
        <pre className="absolute w-[760px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] left-[20%] bottom-[-80px] rotate-2 text-[#a78bfa]/48 max-md:left-1/2 max-md:bottom-[7%] max-md:w-[380px] max-md:-translate-x-1/2 max-md:text-[#a78bfa]/24">
          {`git commit -m "interactive terminal card"
npm run build
deploy --production`}
        </pre>
        <pre className="absolute w-[360px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] left-1/2 top-auto bottom-[22%] -translate-x-1/2 -rotate-2 text-[#7cf7c4]/24 max-md:hidden">
          {`interface PortfolioConfig {
  theme: "dark";
  sections: ["about", "skills", "projects", "contact"];
  style: "premium";
}`}
        </pre>
        <pre className="absolute w-[280px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] right-[10%] top-auto bottom-[6%] rotate-4 text-[#62d9ff]/22 max-md:hidden">
          {`const ui = compose(
  cleanCode(),
  smoothMotion(),
  premiumGlass()
);`}
        </pre>
        <pre className="absolute w-[280px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] left-[10%] top-auto bottom-[6%] -rotate-4 text-[#7cf7c4]/22 max-md:hidden">
          {`function buildExperience() {
  return design
    .merge(code)
    .refine(details);
}`}
        </pre>
        <pre className="absolute w-[280px] whitespace-pre-wrap blur-[0.12px] opacity-[0.98] right-[10%] bottom-[6%] rotate-5 text-[#62d9ff]/20 max-md:hidden">
          {`SELECT name, role
FROM developer_profile
WHERE focus = 'frontend';`}
        </pre>
      </div>
      <div aria-hidden="true" className="fixed top-0 left-0 w-full h-[3px] z-[99999] bg-white/5">
        <span id="scrollProgress" className="block w-0 h-full bg-gradient-to-r from-[#7cf7c4] via-[#62d9ff] to-[#a78bfa] shadow-[0_0_18px_rgba(98,217,255,0.45)] transition-[width] duration-75 ease-linear"></span>
      </div>
    </>
  );
}
