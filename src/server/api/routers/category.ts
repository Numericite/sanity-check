import type { Where } from "payload";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getListSchema } from "~/server/schema/get-list-schema";

export const categoryRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const categories = await ctx.payload.find({
			collection: "categories",
			limit: 0,
		});

		return categories.docs;
	}),

	getList: publicProcedure
		.input(getListSchema)
		.query(async ({ ctx, input }) => {
			const { limit = 10, page = 1, filters, sort } = input;

			const where: Where =
				filters && filters.length > 0
					? {
							and: filters.map((filter) => ({
								[filter.key]: {
									[filter.operation ?? "equals"]: filter.value,
								},
							})),
						}
					: {};

			const categories = await ctx.payload.find({
				collection: "categories",
				limit,
				page,
				where,
				sort,
			});

			return categories.docs;
		}),

	getById: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input: id }) => {
			const category = await ctx.payload.findByID({
				collection: "categories",
				id,
			});

			return category;
		}),
});
