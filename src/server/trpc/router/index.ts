import { authRouter } from './auth';
import { timeSlotRouter } from './time-slot';
import { reservationRouter } from './reservation';
import { router } from '../trpc';

export const appRouter = router({
	auth: authRouter,
	timeSlot: timeSlotRouter,
	reservation: reservationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
