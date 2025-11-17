import z from "zod";
import { filtersSchema } from "./filters-schema";

export const getListSchema = z.object({
	limit: z.number().optional(),
	page: z.number().optional(),
	filters: filtersSchema,
	sort: z.array(z.string()).optional(),
});
