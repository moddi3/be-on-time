import { getTimeZones } from '@vvo/tzdb';
import { useState } from 'react';
import { atom, useAtom } from 'jotai';

const timezonesList = getTimeZones().sort((a, b) =>
    a.name.localeCompare(b.name)
);
const userTimezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const timezoneAtom = atom(userTimezoneName);

const TimeZonePicker: React.FC = () => {
    const [timezone, setTimezone] = useAtom(timezoneAtom);
    const [inputValue, setInputValue] = useState(userTimezoneName);

    return (
        <></>
        // <Autocomplete
        //     id="timezone-select"
        //     sx={{ width: 300 }}
        //     options={timezonesList.map((item) => item.name)}
        //     autoHighlight
        //     getOptionLabel={(option) => option}
        //     autoComplete={false}
        //     renderOption={(props, option) => (
        //         <Box component="li" {...props}>
        //             {option}
        //         </Box>
        //     )}
        //     renderInput={(params) => (
        //         <TextField
        //             {...params}
        //             label="Choose a timezone"
        //             inputProps={{
        //                 ...params.inputProps,
        //                 autoComplete: 'new-password', // disable autocomplete and autofill
        //             }}
        //         />
        //     )}
        //     // isOptionEqualToValue={(option, value) =>
        //     //     value === undefined || value === '' || option === value
        //     // }
        //     value={timezone}
        //     onChange={(event: any, newValue: any) => {
        //         setTimezone(newValue);
        //     }}
        //     inputValue={inputValue}
        //     onInputChange={(event, newInputValue) => {
        //         setInputValue(newInputValue);
        //     }}
        // />
    );
};

export default TimeZonePicker;
