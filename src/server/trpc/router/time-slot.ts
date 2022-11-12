import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

export const timeSlotRouter = router({
	getAll: publicProcedure.query(({ ctx }) =>
		ctx.prisma.timeSlot.findMany({
			where: {
				userId: ctx?.session?.user?.id,
			},
		})
	),
	getByWeekDay: publicProcedure
		.input(
			z.object({
				weekDay: z.number(),
				available: z.boolean().optional(),
			})
		)
		.query(({ ctx, input }) =>
			ctx.prisma.timeSlot.findMany({
				where: {
					userId: ctx?.session?.user?.id,
					weekDay: input.weekDay,
				},
				select: {
					id: true,
					weekDay: true,
					time: true,
					reservation: true,
				},
			})
		),
	create: publicProcedure
		.input(
			z.object({
				weekDay: z.number(),
				time: z.string(),
			})
		)
		.mutation(({ ctx, input }) =>
			ctx.prisma.timeSlot.create({
				data: {
					userId: ctx.session?.user?.id!,
					weekDay: input.weekDay,
					time: input.time,
				},
			})
		),
});
