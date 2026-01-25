import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import type { ResumeData } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Briefcase, GraduationCap, Brain, RefreshCw, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: resumeData, isLoading, refetch } = useQuery<ResumeData>({
    queryKey: ["/api/resume"],
    refetchInterval: 30000,
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
    }, sectionRef);

    return () => ctx.revert();
  }, [resumeData]);

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="py-32 px-6"
      data-testid="resume-section"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">Resume</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            My <span className="gradient-text">Background</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A summary of my professional experience, education, and skills
            automatically analyzed and updated from my resume.
          </p>
        </div>

        <div ref={contentRef}>
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-0">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            </div>
          ) : resumeData?.fileExists ? (
            <div className="space-y-6">
              <Card className="glass-card border-0 glow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{resumeData.name}</h3>
                      <p className="text-primary font-medium">{resumeData.title}</p>
                      <Badge className="mt-2 bg-accent/20 text-accent border-0">
                        <Brain className="h-3 w-3 mr-1" />
                        {resumeData.careerDomain}
                      </Badge>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass border-primary/30"
                        onClick={() => refetch()}
                        data-testid="refresh-resume"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                      <Button size="sm" data-testid="download-resume">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {resumeData.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-0"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    Last updated: {new Date(resumeData.lastUpdated).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass-card border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Experience</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/30 pl-4"
                      >
                        <h4 className="font-medium">{exp.role}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mb-1">
                          {exp.duration}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Education</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/30 pl-4"
                      >
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-primary">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="glass-card border-0 text-center py-16">
              <CardContent>
                <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Resume Available</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your resume to see AI-powered analysis and summary here.
                </p>
                <p className="text-sm text-muted-foreground">
                  Upload to the backend resume folder or connect Google Drive for automatic sync.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
