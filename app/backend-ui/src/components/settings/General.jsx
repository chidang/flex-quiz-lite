import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Checkbox, Button, Row, Col, Tooltip, message, Flex } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { apiBaseUrl, __ } from '../../util/common';
import GlobalData from '../../util/globalData';

const { Option } = Select;
const apiUrl = `${apiBaseUrl()}/settings`;
const flexQuizData = GlobalData.dataLocalizer;

const GeneralSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the settings from the API when the component mounts
    fetch(
        apiUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': flexQuizData.nonce,
          },
        }
      )
      .then(response => response.json())
      .then(data => {
        form.setFieldsValue(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the settings!', error);
        setLoading(false);
        message.error(__('There was an error fetching the settings'));
      });
  }, [form]);

  const onFinish = (values) => {
    setLoading(true);
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': flexQuizData.nonce,
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        console.log('General Settings saved successfully:', data);
        message.success(__('General Settings saved successfully'));
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error saving the general settings!', error);
        message.error(__('There was an error saving the general settings'));
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error(__('Please correct the errors in the form and try again'));
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={__("Default Submission Status")}
            name="submissionStatus"
            extra={__("All users can access the submission when the \"Publish\" option is selected.")}
          >
            <Select placeholder={__("Select status")} loading={loading}>
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={__('Redirect URL when quitting the exam')}
            name="redirectUrl"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={__("Headline")}
            name="headline"
            extra={__("This text will be displayed on all steps.")}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={__('Personal Infomation Step text')}
            name="personalInfoStepText"
            extra={__("This text will be shown on the personal information step.")}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label={__('Admin emails')}
            name="adminEmails"
            extra={__("Enter email addresses separated by commas, e.g., admin@your-domain.com, support@domain.com")}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Flex justify='flex-start' align='center'>
            <Form.Item
              name="sendExamResultToAdmin"
              valuePropName="checked"
            >
              <Checkbox>{__('Send the exam result to admin')}</Checkbox>
            </Form.Item>
            <Tooltip placement="top" title="After the participants finish the exam, an email will be sent to the admin.">
              <span className='fxq-text-sm fxq-mb-6 fxq-text-gray-400'><QuestionCircleOutlined /></span>
            </Tooltip>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Flex justify='flex-start' align='center'>
            <Form.Item
              name="sendExamResultToParticipant"
              valuePropName="checked"
            >
              <Checkbox>{__('Send the exam result to participant')}</Checkbox>
            </Form.Item>
            <Tooltip placement="top" title="After the participants finish the exam, an email will be sent to the admin.">
              <span className='fxq-text-sm fxq-mb-6 fxq-text-gray-400'><QuestionCircleOutlined /></span>
            </Tooltip>
          </Flex>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="showStepsBar"
            valuePropName="checked"
          >
            <Checkbox>{__('Show the exam steps bar')}</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Flex justify='flex-start' align='center'>
            <Form.Item
              name="createWpUser"
              valuePropName="checked"
            >
              <Checkbox>{__('Create a WordPress user when registering a new participant')}</Checkbox>
            </Form.Item>
            <Tooltip placement="top" title="When the participants finish the exam, a WordPress user will be created or updated based on their personal information.">
              <span className='fxq-text-sm fxq-mb-6 fxq-text-gray-400'><QuestionCircleOutlined /></span>
            </Tooltip>
          </Flex>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Flex justify='flex-start' align='center'>
            <Form.Item
                name="createParticipantAfterStep1"
                valuePropName="checked"
              >
                <Checkbox>{__('Store Participant information after Step 1')}</Checkbox>
              </Form.Item>
              <Tooltip placement="top" title="Participant information will be stored after entering all required fields and clicking on the Next button (Participant information will be stored after finishing the exam if this option is unchecked)">
                <span className='fxq-text-sm fxq-mb-6 fxq-text-gray-400'><QuestionCircleOutlined /></span>
              </Tooltip>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="subscribeNewsletter"
            valuePropName="checked"
          >
            <Checkbox>{__('Show the Subscribe newsletter checkbox on Step 1')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Flex justify='flex-start' align='center'>
            <Form.Item
                name="allowSingleAttempt"
                valuePropName="checked"
              >
                <Checkbox>{__('Each participant is allowed to take the quiz only one time.')}</Checkbox>
              </Form.Item>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12}>
        </Col>
      </Row>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {__('Save')}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default GeneralSettings;
