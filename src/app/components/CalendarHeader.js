'use client';
import React from 'react';
import { Calendar } from 'antd';

const CustomCalendarHeader = ({ value, onChange }) => {
    const handlePrevMonth = () => {
        onChange(value.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        onChange(value.clone().add(1, 'month'));
    };

    const handlePrevYear = () => {
        onChange(value.clone().subtract(1, 'year'));
    };

    const handleNextYear = () => {
        onChange(value.clone().add(1, 'year'));
    };

    return (
        <div className="flex justify-center items-center p-2">
            <button
                className="mr-2 focus:outline-none text-blue-500"
                onClick={handlePrevYear}
            >
                &lt;&lt;
            </button>
            <button
                className="mr-2 focus:outline-none text-blue-500"
                onClick={handlePrevMonth}
            >
                &lt;
            </button>
            <span className="text-xl font-bold">
        {value.format('MMMM YYYY')}
      </span>
            <button
                className="ml-2 mr-2 focus:outline-none text-blue-500"
                onClick={handleNextMonth}
            >
                &gt;
            </button>
            <button
                className="focus:outline-none text-blue-500"
                onClick={handleNextYear}
            >
                &gt;&gt;
            </button>
        </div>
    );
};

export default CustomCalendarHeader;

