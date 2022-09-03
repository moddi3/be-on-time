import { createRouter } from './context';
import { z } from 'zod';

export const timeSlotRouter = createRouter()
    //   .query("get", {
    //     input: z
    //       .object({
    //         text: z.string().nullish(),
    //       })
    //       .nullish(),
    //     resolve({ input }) {
    //       return {
    //         greeting: `Hello ${input?.text ?? "world"}`,
    //       };
    //     },
    //   })
    .query('getAll', {
        async resolve({ ctx }) {
            const timeSlots = await ctx.prisma.timeSlot.findMany({
                where: {
                    userId: ctx.session?.user?.id,
                },
            });

            return timeSlots;
        },
    })
    .query('getByWeekDay', {
        input: z.object({
            weekDay: z.number(),
            available: z.boolean().optional(),
        }),
        async resolve({ ctx, input }) {
            const timeSlots = await ctx.prisma.timeSlot.findMany({
                where: {
                    userId: ctx.session?.user?.id,
                    weekDay: input.weekDay,
                },
                select: {
                    id: true,
                    time: true,
                    reservation: true,
                    weekDay: true,
                },
            });
            console.log('timeSlots', timeSlots);
            return timeSlots;
        },
    })
    .mutation('create', {
        input: z.object({
            weekDay: z.number(),
            time: z.string(),
        }),
        async resolve({ ctx, input }) {
            const timeSlot = await ctx.prisma.timeSlot.create({
                data: {
                    weekDay: input.weekDay,
                    time: input.time,
                    userId: ctx.session?.user?.id!,
                },
            });
            return timeSlot;
        },
    });
