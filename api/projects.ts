import { storage } from "../server/storage";

export default async function handler(req: any, res: any) {
  try {
    const projects = await storage.getProjects();
    return res.status(200).json(projects);
  } catch (error: any) {
    console.error("Projects API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
