import { DatePicker, Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import {CurrentDataSelected, EventExports2} from "@/app/Exports/ModelExports";
import {useAtomValue, useSetAtom} from "jotai";
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from "moment";
import appdb from "@/app/Conf/conf";
import {addExports, addImport, addTodo, updateExports} from "@/app/Exports/ControllerEcports";


const ReplayFormImport = ({event}) => {
    const SetExporte = useSetAtom(EventExports2)

    const [messageApi, contextHolder] = message.useMessage();




    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Data saved successfully 🎉',
        });
    };
    const error = (e) => {
        messageApi.open({
            type: 'error',
            content: e.message,
        });
    };

    const handleFormSubmit = (values) => {

        const replyNew={
           ...event,
            reply:[{
                title: values.textValue,
                start: values.dateStart,
                Number: values.Number,
                end: values.dateEnd,
                textareaValue: values.textareaValue,
                type: 'Imports',
                completed: false,
            }]

        }

        updateExports(event.id,replyNew,"Exports").then(r=>{
            success()
        }).catch(e=>{
            error(e)
        })


    };

    const validateDateRange = (_, value) => {

        const [startDate, endDate] = value;
        if (!moment(startDate) || !moment(endDate)) {
            return Promise.reject('Both Start Date and End Date are required');
        }
        if (moment(startDate) < moment(endDate)) {
            return Promise.reject('Start Date must be before End Date');
        }

        return Promise.resolve();
    };


    const validateField = (_, value, field) => {
        if (!value) {
            return Promise.reject(`${field} is required`);
        }
        return Promise.resolve();
    };

    return (
        <>
            {contextHolder}

            <Form

                onFinish={handleFormSubmit}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                className="p-4 space-y-4"
            >
                <Form.Item
                    name="dateStart"
                    label="تاريخ الرسالة"
                    rules={[{ validator: validateDateRange }]}
                >
                    <Input
                        type="date"
                        className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>
                <Form.Item
                    name="dateEnd"
                    label="تاريخ الوصول"
                    rules={[{ validator: validateDateRange }]}
                >
                    <Input
                        //defaultValue={formattedDate}
                        type="date"
                        value={null}
                        className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>

                <Form.Item
                    name="Number"
                    label="رقمها"
                    rules={[{ validator: (_, value) => validateField(_, value, 'Number') }]}
                >
                    <Input className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>

                <Form.Item
                    name="textValue"
                    label="اسم و موطن المرسال"
                    rules={[{ validator: (_, value) => validateField(_, value, 'Text') }]}
                >
                    <Input className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>

                <Form.Item
                    name="textareaValue"
                    label="الموضع"
                    rules={[{ validator: (_, value) => validateField(_, value, 'Textarea') }]}
                >
                    <TextArea className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" rows={4} />
                </Form.Item>

                <div className="text-right"> {/* Add this container div with "text-left" class */}
                    <button type="submit"
                            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                        Submit
                    </button>
                </div>
            </Form>
            );
        </>
    );
}
export default ReplayFormImport;