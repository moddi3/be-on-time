import { z } from "zod";

import { publicProcedure, router } from "../trpc";


export const reservationRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) =>
    ctx.prisma.reservation.findMany({
      where: {
        userId: ctx?.session?.user?.id,
      },
    })
  ),
  create: publicProcedure
    .input(z.object({
      weekDay: z.number(),
      timeSlotId: z.string(),
      date: z.date(),
      description: z.string(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.reservation.create({
      data: {
        userId: ctx.session?.user?.id!,
        clientId: "",
        timeSlotId: input.timeSlotId,
        date: input.date,
        description: input.description,
      },
    })
  ),
});
