import z from "zod";
import { parse } from "zod/v4/core";
import { contactSubmissionSchema } from "~/schemas/contact-submission";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const contactSubmissionRouter = createTRPCRouter({
	create: publicProcedure
		.input(contactSubmissionSchema)
		.mutation(async ({ ctx, input }) => {
			const { category, name, url, comment } =
				contactSubmissionSchema.parse(input);

			const contactSubmission = ctx.payload.create({
				collection: "contactSubmissions",
				data: {
					category,
					name,
					url,
					comment,
				},
			});

			return true;
		}),
});
