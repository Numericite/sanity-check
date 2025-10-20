import z from "zod";

export const getListSchema = z.object({
	limit: z.number().optional(),
	page: z.number().optional(),
	filters: z
		.array(
			z.object({
				key: z.string(),
				operation: z.string().optional(),
				value: z.union([
					z.string(),
					z.number(),
					z.boolean(),
					z.array(z.string()),
					z.array(z.number()),
				]),
			}),
		)
		.optional(),
	sort: z.array(z.string()).optional(),
});

export type CategoryListInput = z.infer<typeof getListSchema>;
