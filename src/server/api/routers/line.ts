import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const lineRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const lines = await ctx.payload.find({
			collection: "lines",
			where: {
				active: {
					equals: true,
				},
			},
			limit: 0,
		});

		return lines.docs;
	}),
});
