import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import dayjs from "../../utils/dayjs";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";

import { getTimeZones } from "@vvo/tzdb";
import { Dropdown, Button } from 'react-daisyui'




const dayOfWeek = (date: Date) => {
    return dayjs(date).isoWeekday();
}

type TimeSlot = {
    id: string,
    // userId: string,
    time: Date;
    weekDay: number;

}

const TimeSlots: React.FC<{ tz: string, timeSlots: TimeSlot[], isLoading: boolean, isError: boolean, onSelected: (slot: TimeSlot) => void }> = ({ onSelected, timeSlots, isLoading, isError, tz }) => {
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Failed to fetch. Please try again.</div>
    }

    console.log(timeSlots);
    if (!timeSlots?.length) {
        return <div>No time slots</div>
    }

    const sorted = timeSlots.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
    })

    return (
        <div className="flex flex-col items-center p-5">
            {sorted?.map((slot) => {
                const minutes = slot.time.getUTCMinutes();
                const hours = slot.time.getUTCHours()
                return (
                    <div key={slot.id} className="pb-5 last:pb-0">
                        <button className="rounded p-2 hover:bg-gray-100" onClick={() => onSelected(slot)}>
                            {/* test { tz} */}

                            {slot.time.toISOString()} <br />
                            {slot.time.toUTCString()} <br />
                            {dayjs().set('hours', hours).utc(true).tz(tz).format('HH:mm')} <br />
                            {dayjs().set('hours', hours).utc(true).tz(tz).toString()}
                        </button>
                    </div>)
            })}
        </div>)
}

const Reserve: NextPage = () => {
    const { query } = useRouter();
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSlot] = useState<any>();
    const [tzOpen, setTzOpen] = useState(false);

    const { data, refetch, isLoading, isError, error } = trpc.useQuery(['timeSlot.getByWeekDay', { weekDay: dayOfWeek(date) }], {
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
            console.log(res)
        }
    })

    const [timezone, setTimezone] = useState(dayjs.tz.guess())
    const [tzQuery, setTzQuery] = useState('')

    const { mutate } = trpc.useMutation('reservation.create')

    if (!query.uid || typeof query.uid !== "string") {
        return null;
    }

    const timezones = getTimeZones();


    const selectedSlotText = selectedSlot && (
        <p>You selected {selectedSlot.time}</p>
    )

    const filteredTz =
        tzQuery === ''
            ? timezones
            : timezones.filter((tz) => {
                return tz.name.toLowerCase().includes(tzQuery.toLowerCase())
            })

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl p-10">Reserve</h1>
            <div className="flex">
                <div className="flex flex-col items-center">
                    <Calendar locale="en" onChange={setDate} value={date} onClickDay={() => {
                        refetch();
                        setSlot(undefined)
                    }} />

                    <TimeSlots tz={timezone} timeSlots={data!} isLoading={isLoading} isError={isError} onSelected={(slot) => {
                        // const [hour, minute] = slot.time.split(':');
                        console.log(slot.time.getHours())
                        // let newDate = dayjs(date).set('hours', slot.time.)
                        // console.log(newDate.toISOString());
                        setDate(slot.time)
                        // setSlot(slot)
                    }} />


                    {selectedSlotText}

                    <button
                        type="button"
                        disabled={isLoading || !data?.length}
                        className={`
                    rounded
                    p-2 bg-gray-100
                    enabled:hover:bg-gray-300
                    enabled:active:bg-gray-200
                    ${isLoading && 'cursor-not-allowed'}
                `}
                        onClick={() =>
                            mutate({
                                date, description: '', timeSlotId: selectedSlot.id, weekDay: selectedSlot.weekDay
                            })
                        }>
                        Submit request
                    </button>
                </div>

                <div>
                <Button color="primary">Click me!</Button>
                    {/* <Dropdown  >
                        <div className="h-48 overflow-y-auto">

                        </div>
                    </Dropdown> */}

                    { `${tzOpen}` }
                    <Dropdown open={tzOpen}>
                        <Dropdown.Toggle onClick={() => setTzOpen(true)}>Click</Dropdown.Toggle>
                        <Dropdown.Menu className="w-52 h-48 overflow-y-auto">

                        {filteredTz.map((tz, index) => (
                                <Dropdown.Item key={index} onClick={() => {
                                    setTimezone(tz.name);
                                    // setTzOpen(false);
                                    }}>
                                    {tz.name}
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>



                    {/* <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">Click</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">

                            {filteredTz.map((tz, index) => (
                                <li key={index}><a>{tz.name}</a></li>
                                // <Dropdown.Item key={index} onClick={() => setTimezone(tz.name)} >
                                //     {tz.name}
                                // </Dropdown.Item>
                            ))}
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>

        </div>
    )
}
export default Reserve;
