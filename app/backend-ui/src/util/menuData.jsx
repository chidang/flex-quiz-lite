import {
  ShopOutlined,
  CommentOutlined,
  DashboardOutlined,
  NotificationOutlined,
  KeyOutlined,
  SettingOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  HddOutlined,
  FormOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
  BankOutlined
} from '@ant-design/icons';

const examination = {
  key: 'examination',
  icon: <DashboardOutlined />,
  label: 'Examination',
};

export const LeftMenuItems = [
  examination,
  {
    key: 'calendar',
    icon: <CalendarOutlined />,
    label: 'Calendar',
  },
  {
    key: 'manage-events',
    icon: <AppstoreOutlined />,
    label: 'Manage Events',
    children: [
      { 
        key: 'events',
        label: 'Events',
        icon: <ClockCircleOutlined />
      },

      {
        key: 'categories',
        icon: <TagsOutlined />,
        label: 'Cagegories',
      },
      {
        key: 'services',
        icon: <ShopOutlined />,
        label: 'Services',
      },
      {
        key: 'locations',
        icon: <EnvironmentOutlined />,
        label: 'Locations',
      },
    ],
  },
  {
    key: 'participants',
    icon: <UsergroupAddOutlined />,
    label: 'Participants',
  },
  {
    key: 'companies',
    icon: <BankOutlined />,
    label: 'Companies',
  },
  {
    key: 'notifications',
    icon: <NotificationOutlined />,
    label: 'Notifications',
  },
  {
    key: 'custom-fields',
    icon: <HddOutlined />,
    label: 'Custom Fields',
  },
  {
    key: 'customize',
    icon: <FormOutlined />,
    label: 'Customize',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
  {
    key: 'logs',
    icon: <FileDoneOutlined />,
    label: 'Logs',
  },
  {
    key: 'support',
    icon: <CommentOutlined />,
    label: 'Support',
  },
  {
    key: 'license',
    icon: <KeyOutlined />,
    label: 'License'
  },
];

function extractLeafItems(menu) {
  const leafItems = [];

  function recursiveExtract(items) {
    items.forEach(item => {
      if (item.children) {
        recursiveExtract(item.children);
      } else {
        leafItems.push(item);
      }
    });
  }

  recursiveExtract(menu);
  return leafItems;
}

export const getMenuItemByKey = (key) => {
  const menuItem = extractLeafItems(LeftMenuItems).find(item => item.key === key);
  return menuItem ? menuItem : examination;
};