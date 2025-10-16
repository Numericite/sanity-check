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

		const categoriesWithTools = await Promise.all(
			categories.docs.map(async (category) => {
				const tools = await ctx.payload.find({
					collection: "tools",
					limit: 0,
					where: {
						"categories.category": {
							equals: category.id,
						},
						"categories.main": {
							equals: true,
						},
					},
				});

				return {
					...category,
					tools: tools.docs,
				};
			}),
		);

		return categoriesWithTools;
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

			const categoriesWithTools = await Promise.all(
				categories.docs.map(async (category) => {
					const tools = await ctx.payload.find({
						collection: "tools",
						limit: 0,
						where: {
							"categories.category": {
								equals: category.id,
							},
							"categories.main": {
								equals: true,
							},
						},
					});

					return {
						...category,
						tools: tools.docs,
					};
				}),
			);

			return categoriesWithTools;
		}),

	getById: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input: id }) => {
			const category = await ctx.payload.findByID({
				collection: "categories",
				id,
			});

			const tools = await ctx.payload.find({
				collection: "tools",
				limit: 0,
				where: {
					"categories.category": {
						equals: category.id,
					},
					"categories.main": {
						equals: true,
					},
				},
				sort: ["privacy_score_saas", "dpa_compliant"],
			});

			const categoryWithTools = { ...category, tools: tools.docs };

			return categoryWithTools;
		}),
});
