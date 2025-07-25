import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const toolRouter = createTRPCRouter({
	getList: publicProcedure
		.input(
			z.object({
				limit: z.number().optional(),
				page: z.number().optional(),
				filters: z
					.array(z.object({ key: z.string(), value: z.string() }))
					.optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit = 10, page = 1, filters } = input;

			const tools = await ctx.payload.find({
				collection: "tools",
				limit,
				page,
				where:
					filters && filters.length > 0
						? {
								and: filters.map((filter) => ({
									[filter.key]: { equals: filter.value },
								})),
							}
						: {},
			});

			return tools.docs;
		}),
});
