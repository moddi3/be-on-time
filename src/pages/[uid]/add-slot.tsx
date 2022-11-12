import dayjs from 'dayjs';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Suspense } from 'react';

import { datetime } from '../../utils/datetime.rrule';
import { EventSourceInput } from '@fullcalendar/react';

const Calendar = dynamic(() => import('../../components/Calendar'), { ssr: false });

const AddSlot: NextPage = () => {
	const rule = new RRule({
		freq: RRule.WEEKLY,
		interval: 5,
		byweekday: [RRule.MO, RRule.FR],
		dtstart: datetime(2022, 2, 1, 10, 30),
		until: datetime(2022, 12, 31),
	});

	const events: EventSourceInput = [
		{
			title: 'Recurring Event 1',
			rrule: rule.toString(),
			color: 'red',
			backgroundColor: 'red',
			textColor: '',
			borderColor: 'gray',
			display: 'block',
		},
		{
			title: 'Recurring Event 2',
			rrule: rule.toString(),
			allDay: true,
			color: 'red',
			editable: false,
			textColor: 'green',
		},
	];

	return (
		<div className="flex flex-col items-center">
			<h1 className="font-bold text-3xl p-10">Add slot</h1>

			<Calendar events={events} />

			{/* {rule.all().map((date) => (
                <div key={date.toISOString()}>{dayjs(date).format('YYYY MM DD') }</div>
            ))} */}
		</div>
	);
};

export default AddSlot;
