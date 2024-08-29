import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
// The base editor class and features required to run the editor.
import {
	ClassicEditor,
	Bold,
	Italic,
	Underline,
	Essentials,
	Heading,
	Link,
	Paragraph,
	Table,
	TableToolbar,
  GeneralHtmlSupport
} from 'ckeditor5';
// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
// import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import 'ckeditor5/ckeditor5.css';
import { Radio, Space } from "antd";
import pretty from "pretty";

const TextEditor = ({ label = "Message", value, onChange, placeholder = "" }) => {
  const [editorMode, setEditorMode] = useState("visual");
  const [editorContent, setEditorContent] = useState(value || "");
  const [ editorRef, setEditorRef ] = useState( null );

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  const handleModeChange = (e) => {
    setEditorMode(e.target.value);
    if (e.target.value === "textMode") {
      setEditorContent(pretty(editorContent));
    }
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    if (typeof onChange === "function") {
      onChange(data);
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

			{editorMode === "visual" ? (<CKEditor
          editor={ClassicEditor}
          data={editorContent}
          onReady={ ( editor ) => {
            // A function executed when the editor has been initialized and is ready.
              // It synchronizes the initial data state and saves the reference to the editor instance.
            // setEditorRef( editor );
            // CKEditor&nbsp;5 inspector allows you to take a peek into the editor's model and view
                // data layers. Use it to debug the application and learn more about the editor.
            // CKEditorInspector.attach( editor );
          } }
          onChange={handleContentChange}
          config={{
            plugins: [
              Essentials, Heading, Bold, Italic, Underline,
							Link, Paragraph, TableToolbar,
              GeneralHtmlSupport
            ],
            toolbar:{ items: [
              'undo', 'redo',
              '|',
              'heading',
              '|',
              'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
              '|',
              'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
              '|',
              'link', 'uploadImage', 'blockQuote', 'codeBlock',
              '|',
              'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
          ],
          shouldNotGroupWhenFull: false},
            placeholder: placeholder,
            // Allow all content, including styles
            htmlSupport: {
              allow: [
                {
                  name: /.*/,
                  attributes: true,
                  classes: true,
                  styles: true
                }
              ]
            }
          }}
        />) : (
          <textarea
            value={editorContent}
            onChange={(e) =>
              handleContentChange(e, { getData: () => e.target.value })
            }
            placeholder={placeholder}
            className="fxq-p-4 fxq-w-full fxq-h-96"
          />
        )}
    </>
  );
};

export default TextEditor;
