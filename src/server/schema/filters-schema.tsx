import z from "zod";

export const filtersSchema = z
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
	.optional();

export type filtersSchemaType = z.infer<typeof filtersSchema>;
