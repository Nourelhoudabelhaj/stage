"use client";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import HomeTEt from "@/app/Home";
import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";



const UpdateButton = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Update Data
            </Button>
            <UpdateModal visible={modalVisible} onClose={closeModal} />
        </>
    );
};
const UpdateModal = ({ visible, onClose }) => {
    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = (values) => {
        console.log('Updated data:', values);
        onClose();
    };

    return (
        <Modal
            title="Update Data"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="New Data"
                    name="newData"
                    rules={[{ required: true, message: 'Please input new data!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

function test() {
    return(
        <>
            <div>
                <h1>Next.js with Ant Design</h1>
                <UpdateButton />
            </div>
        </>
    )
}

export default test