import FullCalendar, { CalendarOptions } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule'

const Calendar: React.FC<{
    events: any[];
} & CalendarOptions> = ({ events, ...props }) => {
    const callback = (e: any) => console.log(e)
    return (
        <FullCalendar
            plugins={[dayGridPlugin, rrulePlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            // themeSystem={'bootstrap5'}
            events={events}
            eventContent={(event) => <div>{event.event.title}</div>}
            editable={true}
            eventAdd={callback}
            eventsSet={callback}
            eventChange={callback}
            // eventDrop={callback}
            // eventResize={callback}
            {...props}
        />
    );
};
export default Calendar;
