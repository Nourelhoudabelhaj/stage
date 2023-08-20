import {Calendar} from "antd";
import React, {useState} from "react";
import dayjs from "dayjs";


function CalendarEvent() {
    const [value, setValue] = useState(dayjs()); // Replace 'dayjs()' with your initial date value
    const [selectedDate, setSelectedDate] = useState(value);
    const [visible, setVisible] = useState(false);

    // Sample event data
    const events = [
        {
            title: 'Event 1',
            start: '2021-09-01',
            end: '2021-09-05',
        },
        {
            title: 'Event 2',
            start: '2021-09-03',
            end: '2021-09-07',
        },
        // Add more events as needed
    ];

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedDate(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleDateCellClick = (value) => {
        setSelectedDate(value);
        setVisible(true);
    };

    const handleCloseDrawer = () => {
        setVisible(false);
    };

    const dateCellRender = (date) => {
        const eventList = events.filter(
            (event) =>
                date.isSame(event.start, 'day') || date.isBefore(event.end, 'day')
        );
        return (
            <ul>
                {eventList.map((event) => (
                    <li key={event.title}>{event.title}</li>
                ))}
            </ul>
        );
    };

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <Calendar
                value={value}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                onSelect={handleDateCellClick}
            />
        </div>

    );
}
export default CalendarEvent;