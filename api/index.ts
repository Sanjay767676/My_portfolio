import app, { startup } from "../server/index";

let initialized = false;

export default async function handler(req: any, res: any) {
  if (!initialized) {
    await startup();
    initialized = true;
  }
  return app(req, res);
}
