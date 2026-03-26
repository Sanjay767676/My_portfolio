import { storage } from "../server/storage";
import { contactFormSchema } from "../shared/schema";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const parsed = contactFormSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
    }
    const submission = await storage.createContactSubmission(parsed.data);
    return res.status(201).json({ message: "Contact submission received", id: submission.id });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
