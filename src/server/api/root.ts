import { toolRouter } from "~/server/api/routers/tool";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/category";

export const appRouter = createTRPCRouter({
	tool: toolRouter,
	category: categoryRouter,
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
