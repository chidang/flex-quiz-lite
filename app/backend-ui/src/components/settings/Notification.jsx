import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Space, Tooltip, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import TestEmailModal from '../TestEmailModal';
import EmailPlaceholders from '../EmailPlaceholders';
import { apiBaseUrl, __ } from '../../util/common';
import GlobalData from '../../util/globalData';
import TextEditor from '../CkEditor';

const apiUrl = `${apiBaseUrl()}/notification-settings`;
const flexQuizData = GlobalData.dataLocalizer;

const Notification = () => {
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultTemplate, setDefaultTemplate] = useState('registration');
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': flexQuizData.nonce,
      },
    })
      .then(response => response.json())
      .then(data => {
        form.setFieldsValue({ subject: data.subject });
        setMessageContent(data.message_content);
      })
      .catch(error => {
        console.error('There was an error fetching the notification settings:', error);
        message.error('There was an error fetching the notification settings.');
      });
  }, [form]);

  const handleEditorChange = (value) => {
    setMessageContent(value);
  };

  const onOpenTestEmailModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onSend = (values) => {
    setModalOpen(false);
  };

  const onFinish = (values) => {
    const payload = {
      subject: values.subject,
      message_content: messageContent,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': flexQuizData.nonce,
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          message.success('Notification settings saved successfully!');
        } else {
          message.error('Failed to save notification settings.');
        }
      })
      .catch(error => {
        console.error('There was an error saving the notification settings:', error);
        message.error('There was an error saving the notification settings.');
      });
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <>
      <h3 className='fxq-font-bold fxq-text-lg fxq-mt-3 fxq-mb-5 fxq-text-gray-700'>
        { __('Participant Examination Result Email Notification') }
      </h3>
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please enter the subject!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <TextEditor
            value={messageContent}
            onChange={handleEditorChange}
            placeholder=""
          />
        </Form.Item>
        <div className='fxq-mb-3'>
          <span className='fxq-me-3'>Insert email placeholders:</span>
          <Tooltip placement="top" title="Select a placeholder from the lists below, click to copy it, and then paste it into the template.">
            <span className='fxq-text-sm fxq-text-gray-400'><QuestionCircleOutlined /></span>
            <span className='fxq-ms-2 fxq-text-sm fxq-text-gray-400'>How to use?</span>
          </Tooltip>
        </div>
        <Form.Item>
          <EmailPlaceholders />
        </Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button className='fxq-hidden' htmlType="button" onClick={onOpenTestEmailModal}>
            Send Test Email
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form>
      <TestEmailModal
        open={modalOpen}
        onCancel={handleCancel}
        onSend={onSend}
        defaultTemplate={defaultTemplate}
      />
    </>
  );
};

export default Notification;
