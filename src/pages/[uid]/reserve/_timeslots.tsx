// import { TimeSlot } from '@prisma/client';
import { useAtom } from 'jotai';

import dayjs from '../../../utils/dayjs';
import { timezoneAtom } from './_timezonepicker';

type TimeSlot = {
    id: string;
    // userId: string,
    time: Date;
    reservation: any;
    weekDay: number;
};

const TimeSlots: React.FC<{
    timeSlots: TimeSlot[];
    isLoading: boolean;
    isError: boolean;
    onSelected: (slot: TimeSlot) => void;
}> = ({ onSelected, timeSlots, isLoading, isError }) => {
    const [timezone] = useAtom(timezoneAtom);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to fetch. Please try again.</div>;
    }

    if (!timeSlots?.length) {
        return <div>No time slots</div>;
    }

    const sorted = timeSlots.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
    });

    return (
        <div className="flex flex-col items-center p-5">
            {sorted?.map((slot) => {
                const minutes = slot.time.getUTCMinutes();
                const hours = slot.time.getUTCHours();
                return (
                    <div key={slot.id} className="pb-5 last:pb-0">


                        {/* <button
                            className="rounded p-2 hover:bg-gray-100"
                            onClick={() => onSelected(slot)}
                        >
                            {slot.time.toISOString()} <br />
                            {slot.time.toUTCString()} <br />
                            {dayjs()
                                .set('hours', hours)
                                .utc(true)
                                .tz(timezone)
                                .format('HH:mm')}{' '}
                            <br />
                            {dayjs()
                                .set('hours', hours)
                                .utc(true)
                                .tz(timezone)
                                .toString()}
                        </button> */}
                        {/* <Chip
                            disabled={!!slot.reservation}
                            label={dayjs()
                                .set('hours', hours)
                                // .set('minutes', 16)
                                .set('minutes', minutes)
                                .utc(true)
                                .tz(timezone)
                                .format('HH:mm')
                                .toString()}
                            variant="outlined"
                            onClick={() => onSelected(slot)}
                        /> */}
                    </div>
                );
            })}
        </div>
    );
};

export default TimeSlots;
