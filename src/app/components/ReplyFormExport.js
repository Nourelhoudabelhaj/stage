import {useState} from "react";
import {addNewExport, EventExports2} from "@/app/Exports/ModelExports";
import {useAtomValue, useSetAtom} from "jotai";
import {message} from "antd";
import moment from "moment";
import {addExports, updateExports} from "@/app/Exports/ControllerEcports";


const ReplyFormExport = ({event}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success Add',
        });
    };
    const error = (e) => {
        messageApi.open({
            type: 'error',
            content: e.message,
        });
    };

    const [formData, setFormData] = useState({
        start: '',
        end: '',
        receiver: '',
        title: '',
        type: 'Exports',
        completed: false,
        reply:[],
        notes: [
            { number: 1, dateOfNote: '' }
        ],
    });



    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.start || !formData.receiver || !formData.title) {
            alert("Please fill out all fields.");
            return;
        }

        // Check if the date is in the past
        const currentDate = new Date().toISOString().split("T")[0];
        if (formData.start > currentDate) {
            alert("Date must be in the past.");
            return;
        }

        const replyNew={
            ...event,
            reply:[{
                start: formData.start,
                end: formData.start,
                receiver: formData.receiver,
                title: formData.title,
                type: 'Exports',
                completed: true,
                notes: [
                    { number: 1, dateOfNote: '' }
                ],
            }]

        }

        updateExports(event.id,replyNew,"Imports").then(r=>{
            success()
        }).catch(e=>{
            error(e)
        })
        /*
        addExports({
            ...formData
        }).then(r => success())
            .catch(e => error(e))
         */

    };

    const handleNoteChange = (index, value) => {
        const updatedNotes = [...formData.notes];
        updatedNotes[index].dateOfNote = value;
        setFormData({ ...formData, notes: updatedNotes });
    };


    return (
        <form
            onSubmit={handleSubmit} className="space-y-4">
            {contextHolder}
            <div>
                <label htmlFor="date" className="block font-medium">
                    التاريخ:
                </label>
                <input
                    type="date"
                    id="date"
                    defaultValue={formData.start}
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"                />
            </div>
            <div>
                <label htmlFor="receiver" className="block font-medium">
                    المرسل اليه:
                </label>
                <input
                    type="text"
                    id="receiver"
                    value={formData.receiver}
                    onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"                />
            </div>
            <div>
                <label htmlFor="object" className="block font-medium">
                    الموضع:
                </label>
                <textarea

                    id="object"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="block mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>
            </div>
            <div>
                <h3 className="font-medium">ملاحظات:</h3>
                {formData.notes.map((note, index) => (
                    <div key={index} className="space-y-2">
                        <label htmlFor={`note-${index}`} className="block font-medium">
                            ملاحظ{note.number}:
                        </label>
                        <input
                            type="date"
                            id={`note-${index}`}
                            value={note.dateOfNote}
                            onChange={(e) => handleNoteChange(index, e.target.value)}
                            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"                        />
                    </div>
                ))}

            </div>
            <div className="text-right"> {/* Add this container div with "text-left" class */}
                <button onSubmit={handleSubmit}
                        className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ReplyFormExport;
