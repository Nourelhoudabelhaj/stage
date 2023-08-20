import {Button, DatePicker, Form, Input, Modal} from "antd";
import moment from "moment";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/app/Conf/conf";


const UpdateModal = ({ visible, onClose,DateOld }) => {
    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = async (values) => {
        console.log('Updated data:', values.newData);

        const documentRef = doc(db, DateOld.type, DateOld.id);

        const updateData = {
            start: values.newData,
            end: values.newData// Update any properties you want to change
        };

        updateDoc(documentRef, updateData)
            .then(() => {
                console.log('Document updated');
            })
            .catch((error) => {
                console.error('Error updating document:', error);

            });

        onClose();
    };


    return (
        <Modal
            title="Update Data"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form onFinish={handleSubmit} >
                <Form.Item
                    label="New Data"
                    name="newData"
                    rules={[{ required: true, message: 'Please input new data!' }]}
                >
                    <input
                        type="date" defaultValue={DateOld?.start}/>


                </Form.Item>
                <Form.Item>
                    <button
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type="primary" htmlType="submit">
                        Update
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UpdateModal