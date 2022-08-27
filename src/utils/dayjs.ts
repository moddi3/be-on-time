import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
