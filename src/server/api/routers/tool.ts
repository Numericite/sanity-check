import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Where } from "payload";
import z from "zod";
import type { Category } from "~/payload/payload-types";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getListSchema } from "~/server/schema/get-list-schema";

export const toolRouter = createTRPCRouter({
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

			const totalResult = await ctx.payload.find({
				collection: "tools",
				limit: 0,
				where,
			});

			if (totalResult.totalDocs === 0) return [];

			const skip = Math.max(
				0,
				Math.floor(Math.random() * totalResult.totalDocs) - limit,
			);

			const fields = [
				"name",
				"transfer_out_eu",
				"privacy_score_saas",
				"certification_dpf",
				"opensource",
				"fr_documentation",
				"dpa_compliant",
			] as const;
			const directions = ["asc", "desc"] as const;

			const orderBy = fields[Math.floor(Math.random() * fields.length)];
			const orderDir =
				directions[Math.floor(Math.random() * directions.length)];

			const result = await ctx.payload.find({
				collection: "tools",
				where,
				limit: limit,
				page: Math.floor(skip / limit) + 1,
				sort: `${orderDir === "desc" ? "-" : ""}${orderBy}`,
			});

			return result.docs;
		}),

	getById: publicProcedure
		.input(z.number())
		.query(async ({ ctx, input: id }) => {
			const tool = await ctx.payload.findByID({
				collection: "tools",
				id,
				depth: 1,
			});

			return {
				...tool,
				location_note: tool.location_note as SerializedEditorState,
				actions: tool.actions as SerializedEditorState,
				category: tool.categories as Category | null,
			};
		}),
});
