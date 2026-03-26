import { storage } from "../server/storage";

export default async function handler(req: any, res: any) {
  try {
    const skills = await storage.getSkills();
    return res.status(200).json(skills);
  } catch (error: any) {
    console.error("Skills API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
