import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

gsap.registerPlugin(ScrollTrigger);

// Map skill names/icons to locally downloaded icons
const localIconMap: Record<string, string> = {
  python: "/logos/icons8-python-48.png",
  "python 3": "/logos/icons8-python-48.png", // Fallback for potential naming variation
  java: "/logos/icons8-java-48.png",
  "react.js": "/logos/icons8-react-40.png",
  react: "/logos/icons8-react-40.png",
  flutter: "/logos/icons8-flutter-48.png",
  flutterflow: "/logos/flutter_flow.png",
  django: "/logos/icons8-django-32 (1).png",
  flask: "/logos/icons8-flask-50 (1).png",
  tensorflow: "/logos/icons8-tensorflow-48.png",
  "aws cloud": "/logos/icons8-aws-48.png",
  aws: "/logos/icons8-aws-48.png",
  docker: "/logos/icons8-docker-48.png",
  kubernetes: "/logos/icons8-kubernetes-48.png",
  linux: "/logos/icons8-linux-48.png",
  "power bi": "/logos/icons8-power-bi-2021-48.png",
  figma: "/logos/icons8-figma-48.png",
  firebase: "/logos/icons8-firebase-48.png",
  git: "/logos/icons8-git-48.png",
};

function SkillCard({ skill }: { skill: Skill }) {
  const localIcon = localIconMap[skill.name.toLowerCase()] || localIconMap[skill.icon.toLowerCase()];

  return (
    <div className="flex-shrink-0 water-glass rounded-xl px-6 py-4 flex items-center gap-4 transition-all duration-300 hover:scale-105">
      <div className="w-10 h-10 flex items-center justify-center">
        {localIcon ? (
          <img src={localIcon} alt={skill.name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-muted rounded-full animate-pulse" />
        )}
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
    // Dynamically load Devicon CSS
    if (!document.getElementById("devicon-cdn")) {
      const link = document.createElement("link");
      link.id = "devicon-cdn";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!skills || !skills.length || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
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
