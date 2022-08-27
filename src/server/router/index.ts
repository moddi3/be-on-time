// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { timeSlotRouter } from "./time-slot";
import { reservationRouter } from "./reservation";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('question.', protectedExampleRouter)
  .merge('timeSlot.', timeSlotRouter)
  .merge('reservation.', reservationRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
