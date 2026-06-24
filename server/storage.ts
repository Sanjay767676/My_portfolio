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
  { id: "1", name: "Python", icon: "python", category: "Language" },
  { id: "2", name: "Java", icon: "java", category: "Language" },
  { id: "3", name: "React.js", icon: "react", category: "Frontend" },
  { id: "4", name: "FlutterFlow", icon: "flutterflow", category: "Mobile" },
  { id: "5", name: "Django", icon: "django", category: "Backend" },
  { id: "6", name: "Flask", icon: "flask", category: "Backend" },
  { id: "7", name: "TensorFlow", icon: "tensorflow", category: "AI/ML" },
  { id: "8", name: "AWS Cloud", icon: "aws", category: "Cloud" },
  { id: "9", name: "Docker", icon: "docker", category: "DevOps" },
  { id: "10", name: "Kubernetes", icon: "kubernetes", category: "DevOps" },
  { id: "11", name: "Linux", icon: "linux", category: "DevOps" },
  { id: "12", name: "Power BI", icon: "powerbi", category: "Tools" },
  { id: "13", name: "Figma", icon: "figma", category: "Design" },
  { id: "14", name: "Firebase", icon: "firebase", category: "Backend" },
  { id: "15", name: "Git", icon: "git", category: "Tools" },
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Aptimark HRM",
    description: "A comprehensive Human Resource Management system designed for tracking employee performance, attendance, payroll, and corporate organizational structures.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Node.js", "Express"],
    githubUrl: "https://github.com/Sanjay767676/Aptimark_HRM",
    liveUrl: "https://aptimark-hrm-frontend-sanjays-projects-07fa8f8f.vercel.app",
  },
  {
    id: "2",
    title: "Aptimark CRM & ERP",
    description: "Full-stack enterprise application consolidating customer relationship management, sales pipelines, client tracking, and backend automation.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Node.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/Sanjay767676/aptimark",
    liveUrl: "https://aptimark.vercel.app",
  },
  {
    id: "3",
    title: "Home Security Automation",
    description: "Smart security system using YOLOv8 and OpenCV for real-time intruder detection. Features face recognition to identify known individuals within a defined ROI, with Twilio integration for cloud-based remote notifications.",
    technologies: ["Python", "YOLOv8", "OpenCV", "Twilio", "TensorFlow"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "4",
    title: "Club Italia",
    description: "A premium interactive platform built for a simulated Italian social club, featuring restaurant reservation systems, membership modules, and dynamic events management.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Express", "Vercel"],
    githubUrl: "https://github.com/Sanjay767676/Club_italia",
    liveUrl: "https://club-italia.vercel.app",
  },
  {
    id: "5",
    title: "WARS - Wildlife Alert System",
    description: "AI-powered surveillance system to detect wildlife at forest borders. Enables real-time alerts to forest officials, reducing human-wildlife conflict risks through automated monitoring and early warning systems.",
    technologies: ["Python", "TensorFlow", "OpenCV", "AI/ML"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "GENAI Experiments",
    description: "A repository of generative AI notebooks and scripts demonstrating the integration of LLMs, custom chatbots, NLP text analysis, and retrieval-augmented generation (RAG).",
    technologies: ["Jupyter Notebook", "Python", "LangChain", "OpenAI API", "Gemini API"],
    githubUrl: "https://github.com/Sanjay767676/GENAI",
    liveUrl: "#",
  },
];

const defaultResumeData: ResumeData = {
  name: "Sanjay K",
  title: "Software Developer & Cloud Engineer",
  summary: "Self-motivated and analytical Computer Science undergraduate with a strong interest in software development and cloud-based technologies. Demonstrates a high degree of adaptability, quick learning ability, and solid technical aptitude across modern computing environments. Skilled in understanding complex systems, writing clean and efficient code, and troubleshooting technical challenges with a logical, problem-solving approach.",
  skills: ["Python", "Java", "React.js", "FlutterFlow", "Django", "Flask", "TensorFlow", "AWS", "Docker", "Kubernetes"],
  education: [
    {
      institution: "SNS College of Technology",
      degree: "Bachelor of Engineering",
      year: "Present",
    },
    {
      institution: "Nagini Vidyalaya Matric Hr. Sec. School",
      degree: "SSLC, HSC",
      year: "Completed",
    },
  ],
  experience: [
    {
      company: "Excelerate",
      role: "Data Visualization Intern",
      duration: "07/2025 - Present",
      description: "Designing interactive dashboards and visual reports using Excel and Power BI. Converting complex datasets into clear, insightful visual narratives.",
    },
    {
      company: "Codsoft",
      role: "Machine Learning Intern",
      duration: "01/2025 - 02/2025",
      description: "Built spam classification models achieving 95-98% accuracy. Designed and deployed Streamlit-based web app for real-time spam detection.",
    },
    {
      company: "Techsnapie Solutions",
      role: "AWS Intern",
      duration: "08/2024 - 09/2024",
      description: "Managed EC2 instances with auto-scaling and load balancing. Implemented S3 for storage solutions and developed RESTful APIs through API Gateway.",
    },
  ],
  careerDomain: "Software Development & Cloud Engineering",
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
