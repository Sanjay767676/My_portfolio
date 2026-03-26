import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Rocket, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code following best practices",
  },
  {
    icon: Palette,
    title: "Design Focus",
    description: "Creating visually stunning interfaces with attention to detail",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Building fast, optimized applications for the best user experience",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams and communicating clearly",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

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

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const highlightCards = highlightsRef.current?.querySelectorAll(".highlight-card");
      if (highlightCards && highlightCards.length > 0) {
        gsap.fromTo(
          highlightCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6"
      data-testid="about-section"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-muted-foreground font-medium mb-4 block">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Passionate About Technology
          </h2>
        </div>

        <div ref={contentRef} className="glass-card rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Self-motivated and analytical Computer Science undergraduate with a strong
              interest in software development and cloud-based technologies. I demonstrate
              adaptability, quick learning ability, and solid technical aptitude across
              modern computing environments.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Skilled in understanding complex systems, writing clean and efficient code,
              and troubleshooting technical challenges with a logical, problem-solving approach.
              Currently pursuing my Bachelor's at SNS College of Technology, Coimbatore.
            </p>
          </div>
        </div>

        <div
          ref={highlightsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <div
              key={index}
              className="highlight-card glass-card rounded-xl p-6 text-center transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted text-foreground mb-4">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
