import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import {db} from "@/app/Conf/conf";
import Slider from "react-slick";
import {atom} from "jotai";


const EventBanner = () => {
    const  [upcomingEvent, setUpcomingEvent] = useState(null);


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        // Function to fetch data from Firestore
        const fetchData = async () => {
            try {
                const now = new Date();
                const next24Hours = new Date(now);
                next24Hours.setHours(next24Hours.getHours() + 24);

                // Query the Firestore for the event that starts within the next 24 hours
                const eventsCollection = collection(db, 'Exports');
                const q = query(eventsCollection, where('start', '>=', now.toISOString()), where('start', '<', next24Hours.toISOString()));
                const querySnapshot = await getDocs(q);

                // Get the upcoming event data (if available)
                if (!querySnapshot.empty) {
                    const upcomingEventData = querySnapshot.docs.map(doc => doc.data());
                    setUpcomingEvent(upcomingEventData)
                }
                ;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to display the banner if there is an upcoming event

    const cour = () => upcomingEvent?.map(
        (event) => {
            const day = new Date(event.start).getDate();
            const month = new Date(event.start).toLocaleString('default', { month: 'short' });

            return (
                <div className={"p-10 flex"}>
                    <div key={event.id} className=" bg-blue-400 rounded-[5px] ">
                        <div className="flex-col justify-start items-start flex p-3">
                            <div
                                className="text-center text-black text-[40px] font-medium capitalize leading-[30px]">{day}
                            </div>
                            <div className="text-center text-black text-xl font-medium capitalize leading-[30px]">{month}
                            </div>
                        </div>
                        <div className="flex-col justify-end items-start flex p-3">
                            <div className="text-black text-xl ">
                                {event.title}
                            </div>
                            <div
                                className="text-center text-black text-xl font-medium capitalize">@{event.receiver}</div>
                        </div>
                    </div>
                </div>
            )
        }
    )

    return (
            <Slider
                slidesToShow={upcomingEvent?.length}
                dots={false}>{cour()}</Slider>
    );

}

export default EventBanner;
