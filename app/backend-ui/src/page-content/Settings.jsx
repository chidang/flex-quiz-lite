import { Tabs, Typography, Divider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { __ } from '../util/common'
import General from '../components/settings/General';
import Layout from '../components/settings/Layout';
import Notification from '../components/settings/Notification';
const { Title } = Typography;

const items = [
  {
    key: 'general',
    label: 'General',
    children: <General />,
  },
  {
    key: 'layout',
    label: 'Layout',
    children: <Layout />,
  },
  {
    key: 'notification',
    label: 'Notification',
    children: <Notification />,
  }
];

const onChange = (key) => {
  console.log('Setting tab changed:', key);
};

const Settings = () => {
  return (
    <>
      <Title className='fxq-text-primary' level={4}>
        <span className="fxq-text-primary fxq-mr-2"><SettingOutlined /></span> Quiz Settings
      </Title>
      <Divider />
      <Tabs defaultActiveKey="general" items={items} onChange={onChange} />
    </>
  );
};

export default Settings;
