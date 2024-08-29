import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button, Row, Col, message, ColorPicker, Card, Tooltip} from 'antd';
import { SyncOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import MediaUploader from '../MediaUploader';
import { apiBaseUrl, __ } from '../../util/common';
import GlobalData from '../../util/globalData';

const apiUrl = `${apiBaseUrl()}/layout-settings`;
const flexQuizData = GlobalData.dataLocalizer;

const defaultColors = {
  mainColor: '#0e2954',
  boxColor: '#fff',
  resultBoxColor: '#0e2954',
  resultTextColor: '#fff',
  checkboxColor: '#14325b',
  nextButtonColor: '#e40713',
};

const Layout = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerId, setBannerId] = useState('');

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
        form.setFieldsValue(data);
        setBannerUrl(data.examBannerUrl);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the settings!', error);
        setLoading(false);
        message.error(__('There was an error fetching the settings'));
      });
  }, [form]);

  const onFinish = (values) => {
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
        console.log('Settings saved successfully:', data);
        message.success(__('Settings saved successfully'));
      })
      .catch(error => {
        console.error('There was an error saving the settings!', error);
        message.error(__('There was an error saving the settings'));
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error(__('Please correct the errors in the form and try again'));
  };

  const handleBannerChange = (id) => {
    setBannerId(id);
    setBannerUrl('');
  };

  const resetColors = () => {
    form.setFieldsValue(defaultColors);
  };

  return (
    <Form
      form={form}
      name="layout"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Card
        title="Colors"
        extra={<Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={resetColors}
        >
          {__('Reset')}
        </Button>}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={(
                <span>
                  { __("Main Color") }
                  <Tooltip placement="top" title="This configuration will apply to the text color, label color, default button color, and active step.">
                    <span className='fxq-text-sm fxq-ml-1 fxq-mb-6 fxq-text-gray-400'><QuestionCircleOutlined /></span>
                  </Tooltip>
                </span>
                )}
              name="mainColor"
              getValueFromEvent={(color) => '#' + color.toHex()}
            >
              
              <ColorPicker />
            </Form.Item>
            
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={__("Box Color")}
              name="boxColor"
              getValueFromEvent={(color) => '#' + color.toHex()}
            >
              <ColorPicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={__("Result Box Color")}
              name="resultBoxColor"
              getValueFromEvent={(color) => '#' + color.toHex()}
            >
              <ColorPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={__("Result Text Color")}
              name="resultTextColor"
              getValueFromEvent={(color) => '#' + color.toHex()}
            >
              <ColorPicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={__("Radio button/Checkbox Color")}
              name="checkboxColor"
              getValueFromEvent={(color) => '#' + color.toHex()}
            >
              <ColorPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label={__("Next/Finish Button Color")}
              name="nextButtonColor"
              getValueFromEvent={(color) => '#' + color.toHex()}
            >
              <ColorPicker />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <div className='fxq-my-10'>
        <Card title="Exam Banner">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="examBanner"
              >
                <MediaUploader
                  multiple={false}
                  value={bannerId}
                  urls={bannerUrl}
                  onChange={handleBannerChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="showBanner"
                valuePropName="checked"
              >
                <Checkbox>{__('Show exam banner')}</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {__('Save')}
        </Button>
      </div>
    </Form>
  );
};

export default Layout;
