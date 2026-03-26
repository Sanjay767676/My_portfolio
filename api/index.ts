import { storage } from "../server/storage";
import { contactFormSchema } from "../shared/schema";

export default async function handler(req: any, res: any) {
  const url = req.url || "";
  const method = req.method || "GET";

  try {
    if (url.includes("/api/skills")) {
      const skills = await storage.getSkills();
      return res.status(200).json(skills);
    }

    if (url.includes("/api/projects")) {
      const projects = await storage.getProjects();
      return res.status(200).json(projects);
    }

    if (url.includes("/api/resume")) {
      const resumeData = await storage.getResumeData();
      return res.status(200).json(resumeData);
    }

    if (url.includes("/api/contact") && method === "POST") {
      const parsed = contactFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createContactSubmission(parsed.data);
      return res.status(201).json({ message: "Contact submission received", id: submission.id });
    }

    return res.status(404).json({ message: "Not found" });
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
