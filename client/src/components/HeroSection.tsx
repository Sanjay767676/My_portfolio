import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          socialRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-6"
      data-testid="hero-section"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-display tracking-tight"
          data-testid="hero-title"
        >
          Sanjay K
          <br />
          <span className="text-muted-foreground text-2xl md:text-4xl lg:text-5xl font-normal">Build. Innovate. Secure.</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          data-testid="hero-subtitle"
        >
          Software Developer & Cloud Engineer passionate about AI/ML, cloud technologies,
          and building innovative solutions.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            className="px-8"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            data-testid="cta-projects"
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            data-testid="cta-contact"
          >
            Get in Touch
          </Button>
        </div>

        <div ref={socialRef} className="flex justify-center gap-4">
          <a href="https://github.com/Sanjay767676" target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              data-testid="social-github"
            >
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://linkedin.com/in/sanjay-k-sana" target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              data-testid="social-linkedin"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href="mailto:ksanjuma1234@gmail.com">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              data-testid="social-email"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-primary transition-colors"
        data-testid="scroll-indicator"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
}
