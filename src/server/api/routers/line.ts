import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const lineRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const lines = await ctx.payload.findGlobal({
			slug: "lines",
		});

		const activeItems = lines?.items?.filter((i) => i.active === true);

		if (activeItems) return activeItems;
	}),
});
