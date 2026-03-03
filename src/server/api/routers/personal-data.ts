import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const personalDataRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const legal = await ctx.payload.findGlobal({
			slug: "personal-data",
		});

		return legal;
	}),
});
