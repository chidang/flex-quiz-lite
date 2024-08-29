import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Image, Button, Tooltip, Modal } from 'antd';

const MediaUploader = ({ multiple, urls, onChange }) => {
  const [mediaURLs, setMediaURLs] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (urls) {
      setMediaURLs(Array.isArray(urls) ? urls : [urls]);
    }
  }, [urls]);

  const openMediaModal = () => {
    if (!wp.media) {
      console.error('wp.media is not defined');
      return;
    }

    let mediaUploader;
    if (mediaUploader) {
      mediaUploader.open();
      return;
    }

    try {
      mediaUploader = wp.media({
        title: 'Choose Image',
        button: {
          text: 'Use this image',
        },
        multiple: multiple, // Set to true if you want to allow multiple files
      });

      mediaUploader.on('select', () => {
        const attachments = mediaUploader.state().get('selection').toJSON();
        if (!attachments || attachments.length === 0) {
          console.error('No attachment selected.');
          return;
        }

        const urls = attachments.map((attachment) => attachment.url);
        
        // Pass the attachment ids to the onChange handler
        const ids = attachments.map((attachment) => attachment.id);
        onChange(multiple ? ids : ids[0]);
        setMediaURLs(multiple ? urls : [urls[0]]);
      });

      mediaUploader.open();
    } catch (error) {
      console.error('Error initializing media uploader:', error);
    }
  };

  const removeImage = (index) => {
    const newMediaURLs = [...mediaURLs];
    newMediaURLs.splice(index, 1);
    setMediaURLs(newMediaURLs);
    onChange('');
  };

  const handlePreview = (url) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const uploadButton = (
    <Button
      className="fxq-flex-col fxq-justify-center fxq-items-center fxq-mr-3 fxq-w-28 fxq-h-28 fxq-border-primary"
      type="dashed"
      onClick={openMediaModal}
    >
      <PlusOutlined />
      { multiple ? 'Upload Images' : 'Upload Image'}
    </Button>
  );

  return (
    <div className='fxq-flex fxq-items-center fxq-flex-wrap'>
      {uploadButton}
      {mediaURLs.map((url, index) => (
        <div key={index} className="fxq-group fxq-relative fxq-m-2 fxq-inline-block">
          <Image
            getPopupContainer={trigger => trigger.parentNode}
            width={180}
            preview={false}
            src={url}
            className="fxq-m-2"
          />
          <div className="fxq-absolute fxq-top-1/2 fxq-left-1/2 fxq-gap-1 fxq-hidden group-hover:fxq-flex -fxq-translate-x-1/4 -fxq-translate-y-1/2">
            <Tooltip title="Preview image">
              <Button
                type="primary"
                shape="circle"
                icon={<EyeOutlined />}
                size="small"
                className="fxq-icon-button"
                onClick={() => handlePreview(url)}
              />
            </Tooltip>
            <Tooltip title="Remove image">
              <Button
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                size="small"
                className="fxq-icon-button"
                onClick={() => removeImage(index)}
              />
            </Tooltip>
          </div>
        </div>
      ))}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default MediaUploader;
