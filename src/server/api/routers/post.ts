import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Mocked DB
interface Post {
	id: number;
	name: string;
}
const posts: Post[] = [
	{
		id: 1,
		name: "Hello World",
	},
];

export const postRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		const test = ctx.payload.find({
			collection: "users",
			select: {
				id: true,
				email: true,
			},
		});

		return test;
	}),
});
