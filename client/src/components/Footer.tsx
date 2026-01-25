import { Github, Linkedin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, href: "https://github.com/Sanjay767676", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/sanjay-k-sana", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50" data-testid="footer">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold gradient-text mb-2">Sanjay K</p>
            <p className="text-sm text-muted-foreground">
              Build. Innovate. Secure.
            </p>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="glass rounded-full glow-hover"
                asChild
              >
                <a
                  href={link.href}
                  aria-label={link.label}
                  data-testid={`footer-social-${link.label.toLowerCase()}`}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> using modern web technologies
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
