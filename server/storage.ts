import type { Skill, Project, ResumeData, ContactForm } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getResumeData(): Promise<ResumeData>;
  updateResumeData(data: Partial<ResumeData>): Promise<ResumeData>;
  createContactSubmission(data: ContactForm): Promise<{ id: string; createdAt: Date }>;
}

const defaultSkills: Skill[] = [
  { id: "1", name: "React", icon: "react", category: "Frontend" },
  { id: "2", name: "TypeScript", icon: "typescript", category: "Language" },
  { id: "3", name: "Node.js", icon: "nodejs", category: "Backend" },
  { id: "4", name: "Python", icon: "python", category: "Language" },
  { id: "5", name: "PostgreSQL", icon: "postgresql", category: "Database" },
  { id: "6", name: "MongoDB", icon: "mongodb", category: "Database" },
  { id: "7", name: "Docker", icon: "docker", category: "DevOps" },
  { id: "8", name: "AWS", icon: "aws", category: "Cloud" },
  { id: "9", name: "Git", icon: "git", category: "Tools" },
  { id: "10", name: "Figma", icon: "figma", category: "Design" },
  { id: "11", name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend" },
  { id: "12", name: "Next.js", icon: "nextjs", category: "Frontend" },
  { id: "13", name: "GraphQL", icon: "graphql", category: "API" },
  { id: "14", name: "Redis", icon: "redis", category: "Database" },
  { id: "15", name: "Linux", icon: "linux", category: "DevOps" },
  { id: "16", name: "JavaScript", icon: "javascript", category: "Language" },
  { id: "17", name: "Vue.js", icon: "vuejs", category: "Frontend" },
  { id: "18", name: "Kubernetes", icon: "kubernetes", category: "DevOps" },
  { id: "19", name: "TensorFlow", icon: "tensorflow", category: "AI/ML" },
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "2",
    title: "AI Chat Application",
    description: "Real-time chat application with AI-powered responses, sentiment analysis, and language translation capabilities.",
    technologies: ["Next.js", "OpenAI", "WebSocket", "MongoDB", "TypeScript"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "3",
    title: "Task Management System",
    description: "Collaborative project management tool with Kanban boards, time tracking, and team analytics.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "4",
    title: "Portfolio CMS",
    description: "Headless CMS built for developers to showcase their work with customizable themes and SEO optimization.",
    technologies: ["React", "GraphQL", "Prisma", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "5",
    title: "Health Tracker App",
    description: "Mobile-first health and fitness tracking application with workout plans and nutrition monitoring.",
    technologies: ["React Native", "Node.js", "MongoDB", "TensorFlow"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "DevOps Dashboard",
    description: "Monitoring and deployment dashboard for microservices with real-time metrics and alerting.",
    technologies: ["React", "Kubernetes", "Prometheus", "Grafana"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

const defaultResumeData: ResumeData = {
  name: "Alex Developer",
  title: "Senior Full-Stack Engineer",
  summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Strong focus on clean code, user experience, and innovative solutions.",
  skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  education: [
    {
      institution: "Stanford University",
      degree: "M.S. Computer Science",
      year: "2019",
    },
    {
      institution: "UC Berkeley",
      degree: "B.S. Computer Science",
      year: "2017",
    },
  ],
  experience: [
    {
      company: "Tech Innovations Inc.",
      role: "Senior Full-Stack Engineer",
      duration: "2021 - Present",
      description: "Leading development of enterprise SaaS platform serving 100K+ users.",
    },
    {
      company: "StartupXYZ",
      role: "Full-Stack Developer",
      duration: "2019 - 2021",
      description: "Built and scaled e-commerce platform from 0 to $1M ARR.",
    },
    {
      company: "Digital Agency Co.",
      role: "Frontend Developer",
      duration: "2017 - 2019",
      description: "Developed responsive web applications for Fortune 500 clients.",
    },
  ],
  careerDomain: "Full-Stack Web Development",
  lastUpdated: new Date().toISOString(),
  fileExists: true,
};

export class MemStorage implements IStorage {
  private skills: Skill[];
  private projects: Project[];
  private resumeData: ResumeData;
  private contactSubmissions: Array<{ id: string; data: ContactForm; createdAt: Date }>;

  constructor() {
    this.skills = [...defaultSkills];
    this.projects = [...defaultProjects];
    this.resumeData = { ...defaultResumeData };
    this.contactSubmissions = [];
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getResumeData(): Promise<ResumeData> {
    return this.resumeData;
  }

  async updateResumeData(data: Partial<ResumeData>): Promise<ResumeData> {
    this.resumeData = { ...this.resumeData, ...data, lastUpdated: new Date().toISOString() };
    return this.resumeData;
  }

  async createContactSubmission(data: ContactForm): Promise<{ id: string; createdAt: Date }> {
    const submission = {
      id: randomUUID(),
      data,
      createdAt: new Date(),
    };
    this.contactSubmissions.push(submission);
    console.log("New contact submission:", submission);
    return { id: submission.id, createdAt: submission.createdAt };
  }
}

export const storage = new MemStorage();
