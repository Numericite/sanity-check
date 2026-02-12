import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const legalNoticesRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const legal = await ctx.payload.findGlobal({
			slug: "legal-notices",
		});

        return legal;
        
	}),
});
