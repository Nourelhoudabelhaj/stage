'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Calendar, Drawer, Dropdown, Menu, Modal, Space} from 'antd';
import { onSnapshot } from 'firebase/firestore';
import "./styles.css";

import moment from 'moment';

import FormExport from "@/app/components/FormExport";
import {searchDataByTitle} from "@/app/searchDataByTitle";

import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';

import {
    CurrentDataSelected,
    EventExports2,
} from "@/app/Exports/ModelExports";
import FormImport from "@/app/components/FormImport";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/app/Conf/conf";

import locale from 'antd/es/date-picker/locale/ar_EG';

import dayjs from 'dayjs';
import 'dayjs/locale/ar-kw';
import EventBanner from "@/app/components/EventBanner";
import Cartb from "@/app/components/Carditem";
import NavBar from "@/app/components/NavBar";
dayjs.locale('ar-kw');

const HomeTEt = () => {
    const [value, setValue] = useState(dayjs()); // Replace 'dayjs()' with your initial date value
    const [selectedDate, setSelectedDate] = useState(value);
    const [visible, setVisible] = useState(false);
    const [Dataofday, setDataofday] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    //const [currentDataSelected, SetCurrentDataSelected] = useAtom(CurrentDataSelected);
    //const [Exporte, setExporte] = useAtom(EventExports);

    const SetCurrentDataSelected = useSetAtom(CurrentDataSelected)


    const Exporte = useAtomValue(EventExports2)
    const setEvent = useSetAtom(EventExports2)
    //const [Exporte, setExporte] = useState([]);


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Exports'), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setEvent(newData); // Set the state with the new data, replacing the existing data

        });
        const unsubscribe2 = onSnapshot(collection(db, 'Imports'), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setEvent((prevData) => [...prevData, ...newData]);
            //setEvent(newData);
        });

        return () => {
            unsubscribe();
            unsubscribe2();
        };
    }, [setEvent]);


    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };



    // Sample event data

    const handleSearch = (titleToSearch) => {
        const searchResult = searchDataByTitle(Dataofday, titleToSearch);
        console.log(searchResult);
    };

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedDate(newValue);
        SetCurrentDataSelected(newValue);


    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleDateCellClick = (value) => {
        const date = value.format('YYYY-MM-DD');
        setSelectedDate(value);
        setVisible(true);
        SetCurrentDataSelected(value);
        setDataofday(Exporte.filter((event) => date >= event.start && date <= event.end));
    };
    const handleCloseDrawer = () => {
        setVisible(false);
    };

    const dateCellRender = (date) => {
        const dateString = date.format('YYYY-MM-DD');
        const eventList = Exporte.filter(
            (event) =>
                moment(dateString).isBetween(event.start, event.end, 'day', '[]')
        );
        const allEventsCompleted = eventList.length > 0 && eventList.every(event => event.completed);

        return (
            <div>
                {eventList.map((event, index) => (
                    <div key={index} className="h-3 w-3 bg-blue-500 rounded-full absolute bottom-1 left-1"></div>
                ))}

                {allEventsCompleted && (
                    <div className="h-3 w-3 bg-gray-800 rounded-full absolute bottom-1 left-1"></div>
                )}
            </div>
        );
    };
    const handleMenuClick = (e) => {
        setIsModalVisible(e.key);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const filteredData = searchQuery
        ? searchDataByTitle(Dataofday, searchQuery)
        : Dataofday;

    const menu = (
        <Menu onClick={(e) => handleMenuClick(e)}>
            <Menu.Item  key="1">الصادر</Menu.Item>
            <Menu.Item key="2">الورد</Menu.Item>

        </Menu>
    );
    return (
        <>

            <NavBar />

            <div className="w-full h-screen flex justify-center items-center">
                <Calendar
                    className={"my-calendar arabic"}
                    value={value}
                    locale={locale}
                    onPanelChange={onPanelChange}
                    dateCellRender={dateCellRender}
                    onSelect={handleDateCellClick}
                    onChange={onSelect}
                />
            </div>
            <Drawer
                title={
                    <div className={'flex flex-row justify-between'}>
                        <p>{selectedDate ? selectedDate.format('MMMM Do, YYYY') : ''}</p>
                        <Dropdown  onClick={(e) => e.preventDefault()} overlay={menu} placement="bottomLeft" trigger={['click']}>
                            <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-caret-down"> + </i>
                            </button>
                        </Dropdown>
                    </div>}
                placement="right"
                closable={false}
                onClose={handleCloseDrawer}
                visible={visible}
                size={'large'}
            >
                <div className={"space-y-3"}>
                    <input type="text"
                           onChange={handleInputChange}
                           value={searchQuery}
                           placeholder="Search ..."
                           className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>

                    {filteredData.map((item, index) => (
                        <Cartb key={index} event={item} />
                    ))}
                </div>
            </Drawer>

            <Modal
                title="الصادر"
                visible={isModalVisible === '1'}
                footer={null}
                onCancel={handleModalCancel}
            >
                <FormExport  SelectData={selectedDate ? selectedDate.format('YYYY-MM-DD') : null} />
            </Modal>

            <Modal
                title="الورد "
                visible={isModalVisible === '2'}
                okButtonProps={{ style: { display: 'none' } }} // Hide the default OK button
                cancelButtonProps={{ style: { display: 'none' } }} // Hide the default Cancel button
                onCancel={handleModalCancel}
            >
                <FormImport SelectData={selectedDate ? selectedDate.format('YYYY-MM-DD') : null} />
            </Modal>
        </>
    );
};

export default HomeTEt;