import z from "zod";

export const getListSchema = z.object({
	limit: z.number().optional(),
	page: z.number().optional(),
	filters: z
		.array(
			z.object({
				key: z.string(),
				operation: z.string().optional(),
				value: z.string(),
			}),
		)
		.optional(),
	sort: z.array(z.string()).optional(),
});

export type CategoryListInput = z.infer<typeof getListSchema>;
