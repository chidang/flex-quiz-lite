import {
  BankOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  HistoryOutlined
} from '@ant-design/icons';

export const StatisticData = [
  {
    key: 'events',
    icon: <ClockCircleOutlined />,
    total: 100,
    label: 'Total Events',
  },
  {
    key: 'upcomming-events',
    icon: <HistoryOutlined />,
    total: 68,
    label: 'Upcomming Events',
  },
  {
    key: 'participants',
    icon: <UsergroupAddOutlined />,
    total: 2561,
    label: 'Total Participants',
  },
  {
    key: 'companies',
    icon: <BankOutlined />,
    total: 745,
    label: 'Total Companies',
  }
];
