import dayjs from "dayjs";
import { NextPage } from "next";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { trpc } from "../../utils/trpc";

import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const dayOfWeek = (date: Date) => {
  return dayjs(date).isoWeekday();
};

const Dashboard: NextPage = () => {
  const [date, setDate] = useState(new Date());

  const { data, refetch, isLoading, isError, error } = trpc.useQuery(
    ["timeSlot.getByWeekDay", { weekDay: dayOfWeek(date) }],
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );
  return (
    <div className="w-full h-screen flex justify-center p-10">
      <div className="">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Calendar
          maxDetail="month"
          locale="en"
          onChange={setDate}
          value={date}
          onClickDay={() => {
            // setDate(undefined)
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
