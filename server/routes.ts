import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { analyzeResume } from "./aiAnalyzer";
import { googleDriveService } from "./googleDrive";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/resume", async (req, res) => {
    try {
      const resumeData = await storage.getResumeData();
      res.json(resumeData);
    } catch (error) {
      console.error("Error fetching resume data:", error);
      res.status(500).json({ error: "Failed to fetch resume data" });
    }
  });

  app.post("/api/resume/analyze", async (req, res) => {
    try {
      const analysis = await analyzeResume(req.body.content || "");
      const updatedResume = await storage.updateResumeData(analysis);
      res.json(updatedResume);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      res.status(500).json({ error: "Failed to analyze resume" });
    }
  });

  app.get("/api/resume/download", async (req, res) => {
    try {
      // Download the latest resume from Google Drive via Apps Script
      const fileData = await googleDriveService.downloadLatestResume();

      if (!fileData) {
        return res.status(404).json({
          error: "No resume found in Google Drive"
        });
      }

      // Set appropriate headers for file download
      res.setHeader("Content-Type", fileData.mimeType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileData.fileName}"`
      );

      // Stream the file to the client
      const reader = fileData.data.getReader();

      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        res.write(value);
        pump();
      };

      await pump();
    } catch (error) {
      console.error("Error downloading resume:", error);
      res.status(500).json({ error: "Failed to download resume from Google Drive" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = contactFormSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: parsed.error.errors
        });
      }

      const submission = await storage.createContactSubmission(parsed.data);
      res.status(201).json({
        message: "Contact submission received",
        id: submission.id,
        createdAt: submission.createdAt
      });
    } catch (error) {
      console.error("Error processing contact submission:", error);
      res.status(500).json({ error: "Failed to process contact submission" });
    }
  });

  return httpServer;
}
