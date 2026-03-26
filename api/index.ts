import app from "../server/index";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const httpServer = createServer(app);

export default async function handler(req: any, res: any) {
  // Ensure routes are registered
  await registerRoutes(httpServer, app);
  
  // Hand over the request to the express app
  return app(req, res);
}
