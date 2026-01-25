import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  SiReact, SiPython, SiDocker, SiAmazonwebservices, SiGit, SiFigma,
  SiLinux, SiKubernetes, SiTensorflow, SiFlutter, SiDjango, SiFlask,
  SiFirebase, SiStreamlit
} from "react-icons/si";
import { FaJava, FaChartBar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  python: SiPython,
  java: FaJava,
  flutter: SiFlutter,
  django: SiDjango,
  flask: SiFlask,
  docker: SiDocker,
  aws: SiAmazonwebservices,
  git: SiGit,
  figma: SiFigma,
  linux: SiLinux,
  kubernetes: SiKubernetes,
  tensorflow: SiTensorflow,
  firebase: SiFirebase,
  streamlit: SiStreamlit,
  powerbi: FaChartBar,
};

function SkillCard({ skill }: { skill: Skill }) {
  const IconComponent = iconMap[skill.icon.toLowerCase()] || SiReact;

  return (
    <div className="flex-shrink-0 glass-card rounded-xl px-6 py-4 flex items-center gap-4 glow-hover transition-all duration-300 hover:scale-105">
      <div className="w-10 h-10 flex items-center justify-center text-primary">
        <IconComponent className="w-7 h-7" />
      </div>
      <div>
        <h3 className="font-medium text-foreground">{skill.name}</h3>
        <span className="text-xs text-muted-foreground">{skill.category}</span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!skills || skills.length === 0 || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth / 2;

    const animation = gsap.to(container, {
      x: -scrollWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, [skills]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-32 overflow-hidden"
      data-testid="skills-section"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">My Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
            that I use to build exceptional digital experiences.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {isLoading ? (
          <div className="flex gap-6 px-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-48 rounded-xl flex-shrink-0" />
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-6 py-4"
            data-testid="skills-container"
          >
            {skills?.map((skill, index) => (
              <SkillCard key={`${skill.id}-${index}`} skill={skill} />
            ))}
            {skills?.map((skill, index) => (
              <SkillCard key={`${skill.id}-duplicate-${index}`} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
