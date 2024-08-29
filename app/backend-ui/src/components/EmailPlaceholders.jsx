import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';

const copyToClipboardFallback = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (!successful) {
      message.error('Failed to copy to clipboard');
    }
  } catch (err) {
    message.error('Failed to copy to clipboard');
  }
  document.body.removeChild(textArea);
};

const handleMenuClick = async (e, items) => {
  const selectedItem = items.find(item => item.key === e.key);
  const textToCopy = `@${e.key}`;
  const label = selectedItem ? selectedItem.label : 'item';
  const successMesage = `Copied to clipboard: ${textToCopy} (${label})`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      message.success(successMesage);
    } catch (err) {
      message.error('Failed to copy to clipboard');
    }
  } else {
    copyToClipboardFallback(textToCopy);
    message.success(successMesage);
  }
};

const participantItems = [
  {
    label: 'Full name',
    key: 'participant_fullname',
  },
  {
    label: 'Email',
    key: 'participant_email',
  },
  {
    label: 'Date of birth',
    key: 'participant_date_of_birth',
  },
  {
    label: 'Phone',
    key: 'participant_phone',
  },
  {
    label: 'Address',
    key: 'participant_address',
  },
];

const examItems = [
  {
    label: 'Title',
    key: 'quiz_title',
  },
  {
    label: 'Link',
    key: 'quiz_link',
  },
];

const submissionItems = [
  {
    label: 'Total points',
    key: 'result_total_points',
  },
  {
    label: 'Points average',
    key: 'result_average',
  },
  {
    label: 'Link',
    key: 'result_link',
  },
];

const EmailPlaceholders = () => (
  <Space wrap>
    <Dropdown 
      menu={{
        items: participantItems,
        onClick: (e) => handleMenuClick(e, participantItems),
      }}
    >
      <Button>
        <Space>
          Participant
          <DownOutlined style={{fontSize: '10px'}} />
        </Space>
      </Button>
    </Dropdown>
    <Dropdown 
      menu={{
        items: examItems,
        onClick: (e) => handleMenuClick(e, examItems),
      }}
    >
      <Button>
        <Space>
          Quiz
          <DownOutlined style={{fontSize: '10px'}} />
        </Space>
      </Button>
    </Dropdown>
    <Dropdown 
      menu={{
        items: submissionItems,
        onClick: (e) => handleMenuClick(e, submissionItems),
      }}
    >
      <Button>
        <Space>
          Quiz result
          <DownOutlined style={{fontSize: '10px'}} />
        </Space>
      </Button>
    </Dropdown>
  </Space>
);

export default EmailPlaceholders;
