import z from "zod";

export const contactSubmissionSchema = z.object({
	category: z.number({ message: "Vous devez choisir une catégorie" }),
	name: z
		.string({ message: "Vous devez saisir le nom de l'outil" })
		.min(3, "Le nom de l'outil doit faire plus de 2 caractères"),
	url: z
		.string({ message: "Vous devez saisir l'URL du site de l'outil" })
		.url("L'URL est invalide"),
	comment: z.string().optional(),
});

export type contactSubmissionFormData = z.infer<typeof contactSubmissionSchema>;
