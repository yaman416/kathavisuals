import { makeRouteHandler } from "@keystatic/next/route-handler";
import { adminIsAvailable } from "@/lib/keystatic-enabled";
import config from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config });

/** Matches the admin page: no endpoint at all unless the admin can work. */
const guard =
  (handler: (request: Request) => Promise<Response>) => async (request: Request) =>
    adminIsAvailable ? handler(request) : new Response("Not found", { status: 404 });

export const GET = guard(handlers.GET);
export const POST = guard(handlers.POST);
