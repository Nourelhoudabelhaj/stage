"use client";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import HomeTEt from "@/app/Home";


const events = [
    {
        id: 1,
        title: 'Event 11',
        type: 'Exports',
        start: '2023-07-31',
        completed: false,
        end: '2023-07-27',
        reply: [
            {
                id: 1,
                title: 'REvent 11',
                type: 'Exports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            },
            {
                id: 2,
                title: 'REvent 12',
                type: 'Imports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            }
        ]
    },

    {
        id: 2,
        title: 'Event 12',
        type: 'Imports',
        start: '2023-07-31',
        completed: false,
        end: '2023-07-27',
        reply: [
            {
                id: 1,
                title: 'REvent 11',
                type: 'Exports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            },
            {
                id: 2,
                title: 'REvent 12',
                type: 'Imports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            }
        ]
    }
];

function getUpcomingEvents(events) {
    const now = new Date();
    const next24Hours = new Date(now);
    next24Hours.setHours(next24Hours.getHours() + 24);

    return events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= now && eventDate < next24Hours;
    });
}

function UpcomingEvents() {
    const upcomingEvents = getUpcomingEvents(events);

    const cour = () => upcomingEvents.map(

        (event) => {

            return(
                <div className={"p-10"}>
                    <div key={event.id} className=" bg-blue-400 rounded-[5px] w-auto">
                        <div className="flex-col justify-start items-start flex p-3">
                            <div className="text-center text-black text-[40px] font-medium capitalize leading-[30px]">08</div>
                            <div className="text-center text-black text-xl font-medium capitalize leading-[30px]">jun</div>
                        </div>
                        <div className="flex-col justify-end items-start flex p-3">
                            <div className="text-black text-xl ">
                                Originally from Lat is simply
                            </div>
                            <div className="text-center text-black text-xl font-medium capitalize">@Mr {event.title}</div>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
        <HomeTEt></HomeTEt>
    );
}

export default UpcomingEvents;

