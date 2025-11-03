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

			const rand = sort?.includes("random") ?? false;

			const tools = await ctx.payload.find({
				collection: "tools",
				limit: rand ? 0 : limit,
				page,
				where,
				sort,
			});

			if (rand) {
				const docs = [...tools.docs];

				while (docs.length > limit) {
					const randomIndex = Math.floor(Math.random() * docs.length);
					docs.splice(randomIndex, 1);
				}

				tools.docs = docs;
			}

			return tools.docs;
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
