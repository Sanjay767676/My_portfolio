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
  { id: "4", name: "Flutter", icon: "flutter", category: "Mobile" },
  { id: "5", name: "Django", icon: "django", category: "Backend" },
  { id: "6", name: "Flask", icon: "flask", category: "Backend" },
  { id: "7", name: "TensorFlow", icon: "tensorflow", category: "AI/ML" },
  { id: "8", name: "AWS EC2", icon: "aws", category: "Cloud" },
  { id: "9", name: "AWS Lambda", icon: "aws", category: "Cloud" },
  { id: "10", name: "AWS S3", icon: "aws", category: "Cloud" },
  { id: "11", name: "Docker", icon: "docker", category: "DevOps" },
  { id: "12", name: "Kubernetes", icon: "kubernetes", category: "DevOps" },
  { id: "13", name: "Linux", icon: "linux", category: "DevOps" },
  { id: "14", name: "Power BI", icon: "powerbi", category: "Tools" },
  { id: "15", name: "Figma", icon: "figma", category: "Design" },
  { id: "16", name: "Firebase", icon: "firebase", category: "Backend" },
  { id: "17", name: "Git", icon: "git", category: "Tools" },
  { id: "18", name: "Streamlit", icon: "streamlit", category: "Tools" },
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Home Security Automation",
    description: "Smart security system using YOLOv8 and OpenCV for real-time intruder detection. Features face recognition to identify known individuals within a defined ROI, with Twilio integration for cloud-based remote notifications.",
    technologies: ["Python", "YOLOv8", "OpenCV", "Twilio", "TensorFlow"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "2",
    title: "Uzhavan Connect",
    description: "B2B mobile application for farmers, consumers, and agri-tech businesses. Combines networking features like LinkedIn with e-commerce capabilities for agri-product marketing and direct producer-buyer interactions.",
    technologies: ["FlutterFlow", "Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "3",
    title: "WARS - Wildlife Alert System",
    description: "AI-powered surveillance system to detect wildlife at forest borders. Enables real-time alerts to forest officials, reducing human-wildlife conflict risks through automated monitoring and early warning systems.",
    technologies: ["Python", "TensorFlow", "OpenCV", "AI/ML"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "4",
    title: "Sign Language Detection System",
    description: "Real-time Indian Sign Language (ISL) recognition system using OpenCV. Detects and classifies hand gestures to map them into readable text output, improving communication accessibility for the hearing-impaired community.",
    technologies: ["Python", "OpenCV", "Machine Learning", "ISL"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "5",
    title: "Spam Classification ML Model",
    description: "Email/SMS spam classification system achieving 95-98% accuracy using logistic regression and Naive Bayes. Deployed as a Streamlit web app for real-time spam detection with live user input.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "AWS Cloud Infrastructure",
    description: "Managed EC2 instances with auto-scaling and load balancing for high availability. Implemented S3 for secure storage solutions and developed RESTful APIs through API Gateway.",
    technologies: ["AWS EC2", "AWS S3", "API Gateway", "Lambda"],
    githubUrl: "https://github.com/Sanjay767676",
    liveUrl: "#",
  },
];

const defaultResumeData: ResumeData = {
  name: "Sanjay K",
  title: "Software Developer & Cloud Engineer",
  summary: "Self-motivated and analytical Computer Science undergraduate with a strong interest in software development and cloud-based technologies. Demonstrates a high degree of adaptability, quick learning ability, and solid technical aptitude across modern computing environments. Skilled in understanding complex systems, writing clean and efficient code, and troubleshooting technical challenges with a logical, problem-solving approach.",
  skills: ["Python", "Java", "React.js", "Flutter", "Django", "Flask", "TensorFlow", "AWS", "Docker", "Kubernetes"],
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
