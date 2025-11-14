import { toolRouter } from "~/server/api/routers/tool";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/category";
import { contactSubmissionRouter } from "./routers/contact-submission";
import { lineRouter } from "./routers/line";

export const appRouter = createTRPCRouter({
	tool: toolRouter,
	category: categoryRouter,
	contactSubmission: contactSubmissionRouter,
	line: lineRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
