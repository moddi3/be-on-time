import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';
import dayjs from '../../../utils/dayjs';
import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import TimeZonePicker from './TimeZonePicker';
import TimeSlots from './TimeSlots';

const dayOfWeek = (date: Dayjs) => {
    return dayjs(date).isoWeekday();
};

const Reserve: NextPage = () => {
    const { query } = useRouter();

    const [value, setValue] = useState<Dayjs>(() => dayjs());
    const [selectedSlot, setSlot] = useState<any>();

    const { refetch, data, isLoading, isError } = trpc.useQuery(
        [
            'timeSlot.getByWeekDay',
            { weekDay: dayOfWeek(value), available: true },
        ],
        {
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                console.log(res);
            },
        }
    );

    const { mutate } = trpc.useMutation('reservation.create', {
        onSuccess: () => {
            refetch();
        },
    });

    if (!query.uid || typeof query.uid !== 'string') {
        return null;
    }

    const selectedSlotText = selectedSlot && (
        <p>You selected {selectedSlot.time.toString()}</p>
    );

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center">
                <Typography
                    variant="h2"
                    className="font-extrabold p-10 text-gray-700"
                >
                    Reserve
                </Typography>

                <div className="flex">
                    <div className="flex flex-col items-center">
                        <TimeZonePicker />
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticDatePicker
                                    onChange={(newValue) => {

                                        setValue(newValue!);
                                    }}
                                    value={value}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                    componentsProps={{
                                        actionBar: {
                                            actions: [],
                                        },
                                    }}
                                    showToolbar
                                    // disablePast
                                    orientation="landscape"
                                />
                            </LocalizationProvider>
                        </Box>
                        <TimeSlots
                            timeSlots={data!}
                            isLoading={isLoading}
                            isError={isError}
                            onSelected={(slot) => {
                                // const [hour, minute] = slot.time.split(':');
                                console.log(slot.time.getHours());
                                // let newDate = dayjs(date).set('hours', slot.time.)
                                // console.log(newDate.toISOString());
                                // setValue(slot.time);
                                setSlot(slot);
                            }}
                        />
                        {selectedSlotText}
                        <LoadingButton
                            loading={isLoading}
                            disabled={!data?.length || !selectedSlot}
                            onClick={
                                () => console.log(dayjs(value).isUTC())
                                // mutate({
                                //     date: value.toDate(),
                                //     description: '',
                                //     timeSlotId: selectedSlot.id,
                                //     weekDay: selectedSlot.weekDay,
                                // })
                            }
                            variant="outlined"
                            color="info"
                            className="rounded-md w-full p-2"
                        >
                            Submit request
                        </LoadingButton>
                        {/* <button
                            type="button"
                            disabled={isLoading || !data?.length}
                            className={`
                        rounded
                        p-2 bg-gray-100
                        enabled:hover:bg-gray-300
                        enabled:active:bg-gray-200
                        ${isLoading && 'cursor-not-allowed'}
                    `}
                        >
                            Submit request
                        </button> */}
                    </div>

                    {/* <div> */}
                    {/* <Button color="primary">Click me!</Button> */}
                    {/* <Dropdown  >
                        <div className="h-48 overflow-y-auto">

                        </div>
                    </Dropdown> */}

                    {/* {`${tzOpen}`} */}
                    {/* <Dropdown open={tzOpen}>
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
                    </Dropdown> */}

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
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};
export default Reserve;
