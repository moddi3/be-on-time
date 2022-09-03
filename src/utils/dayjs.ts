import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    weekStart: 1,
});

export default dayjs;
