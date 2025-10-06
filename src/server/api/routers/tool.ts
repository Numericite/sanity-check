import type { Where } from "payload";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const toolRouter = createTRPCRouter({

	getList: publicProcedure
		.input(
			z.object({
				limit: z.number().optional(),
				page: z.number().optional(),
				filters: z
					.array(z.object({ key: z.string(), operation: z.string().optional(), value: z.string() }))
					.optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const { limit = 10, page = 1, filters } = input;

			const where: Where = filters && filters.length > 0
				? {
					and: filters.map((filter) => ({
						[filter.key]: {
							[filter.operation ?? 'equals']: filter.value
						}
					})),
				}
				: {};

			const tools = await ctx.payload.find({
				collection: "tools",
				limit,
				page,
				where
			});

			return tools.docs;
		}),


	getById: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input: id }) => {
			const tool = await ctx.payload.findByID({
				collection: "tools",
				id,
			});

			return tool;
		}),
});
