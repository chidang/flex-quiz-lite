// TestEmailModal.jsx
import React from 'react';
import { Modal, Form, Input, Select, Button, message, Alert } from 'antd';

const { Option } = Select;

const TestEmailModal = ({ open, onCancel, onSend, defaultTemplate }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Test Email Form Values:', values);
    message.success('Test email sent!');
    form.resetFields();
    onSend(values);
    
  };

  return (
    <Modal
      title="Send Test Email"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
       <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ emailTemplate: defaultTemplate }}
      >
        <Alert message='To send a test email, please configure the "Sender Email" in Notification Settings.' type="warning" showIcon closable />
        <br />
        <Form.Item
          label="Recipient Email"
          name="recipientEmail"
          rules={[{ required: true, message: 'Please enter the recipient email!' }]}
        >
          <Input placeholder="example@domain.com"/>
        </Form.Item>
        <Form.Item
          label="Email Template"
          name="emailTemplate"
          rules={[{ required: true, message: 'Please select an email template!' }]}
        >
          <Select placeholder="Select an email template" getPopupContainer={trigger => trigger.parentNode}>
            <Option value="registration">Registration email</Option>
            <Option value="approved">Approved email</Option>
            <Option value="rejected">Rejected email</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TestEmailModal;
