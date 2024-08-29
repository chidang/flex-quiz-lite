import React, { useState, useContext } from 'react';
import { Input, Button, Collapse } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Question from './Question';
import ExaminationContext from '../context/ExaminationContext';

const { Panel } = Collapse;

const Step = ({ step, index }) => {
  const {
    handleStepChange,
    removeStep,
    addQuestion,
  } = useContext(ExaminationContext);

  const [activeQuestionKeys, setActiveQuestionKeys] = useState([]);

  const handlePanelChange = (key) => {
    setActiveQuestionKeys(key);
  };

  const handleAddQuestion = (stepIndex) => {
    addQuestion(stepIndex);
    setActiveQuestionKeys([...activeQuestionKeys, `question-${step.questions.length}`]);
  };

  return (
    <>
      <Input
        placeholder="Step Name"
        value={step.name}
        onChange={e => handleStepChange(index, e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Collapse activeKey={activeQuestionKeys} onChange={handlePanelChange}>
        {step.questions.map((question, questionIndex) => (
          <Panel header={`Question ${questionIndex + 1}`} key={`question-${questionIndex}`}>
            <Question
              key={questionIndex}
              question={question}
              stepIndex={index}
              questionIndex={questionIndex}
            />
          </Panel>
        ))}
      </Collapse>
      <div className="fxq-flex fxq-justify-between">
        <Button
          type="dashed"
          onClick={() => handleAddQuestion(index)}
          icon={<PlusOutlined />}
          style={{ marginTop: '10px' }}
        >
          Add Question
        </Button>
        <Button
          danger
          icon={<MinusCircleOutlined />}
          onClick={() => removeStep(index)}
          style={{ marginTop: '20px' }}
        >
          Remove Step
        </Button>
      </div>
    </>
  );
};

export default Step;
