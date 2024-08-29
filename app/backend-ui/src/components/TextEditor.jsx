import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Radio, Space } from "antd";
import pretty from 'pretty';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];

const TextEditor = ({ label = 'Message', value, onChange, placeholder = "" }) => {
  const [editorMode, setEditorMode] = useState("visual");
  const [editorContent, setEditorContent] = useState(value || '');

  useEffect(() => {
    setEditorContent(value)
  }, [value])

  const handleModeChange = (e) => {
    setEditorMode(e.target.value);
    if (e.target.value === 'textMode') {
      setEditorContent(pretty(editorContent));
    }
  };

  const handleContentChange = (content) => {
    setEditorContent(content);
    if (typeof onChange === 'function') {
      onChange(content);
    }
  };

  return (
    <>
    <div className="fxq-flex fxq-justify-between fxq-items-center">
      <label>{label}</label>
      <Space style={{ marginBottom: 16 }}>
        <Radio.Group value={editorMode} onChange={handleModeChange}>
          <Radio.Button value="visual">Visual</Radio.Button>
          <Radio.Button value="textMode">Text</Radio.Button>
        </Radio.Group>
      </Space>
    </div>

      {editorMode === "visual" ? (
        <ReactQuill
          theme="snow"
          value={editorContent}
          modules={modules}
          formats={formats}
          onChange={handleContentChange}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          value={editorContent}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={placeholder}
          className="fxq-p-4 fxq-w-full fxq-h-52"
        />
      )}
    </>
  );
};

export default TextEditor;
