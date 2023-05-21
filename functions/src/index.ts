import { https, logger, type Request, type Response } from "firebase-functions";

let sveltekitServer: (request: Request, response: Response) => Promise<void>;
export const sveltekit = https.onRequest(async (request, response) => {
  if (sveltekitServer == undefined) {
    logger.info("Initialising SvelteKit SSR entry");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sveltekitServer = require("./sveltekit/index").default;
    logger.info("SvelteKit SSR entry initialised!");
  }
  logger.info("Requested resource: " + request.originalUrl);
  return sveltekitServer(request, response);
});
