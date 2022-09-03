import { createRouter } from "./context";
import { z } from "zod";

export const reservationRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const reservations = await ctx.prisma.reservation.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
      });

      return reservations;
    },
  })
  .mutation("create", {
    input: z.object({
      weekDay: z.number(),
      timeSlotId: z.string(),
      date: z.date(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const timeSlot = await ctx.prisma.reservation.create({
        data: {
          userId: ctx.session?.user?.id!,
          clientId: "",
          timeSlotId: input.timeSlotId,
          date: input.date,
          description: input.description,
        },
      });
      return timeSlot;
    },
  });
