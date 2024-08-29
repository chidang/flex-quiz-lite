import React, { useContext } from 'react';
import { Input, Space, Button, Typography, Checkbox, Divider } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Answer from './Answer';
import ExaminationContext from '../context/ExaminationContext';

const { Text } = Typography;

const Question = ({ question, stepIndex, questionIndex }) => {
  const {
    handleQuestionChange,
    removeQuestion,
    addAnswer,
    handlePointsChange,
    handleRequiredChange,
  } = useContext(ExaminationContext);

  return (
    <>
      <Input
        placeholder="Question"
        value={question.text}
        onChange={e => handleQuestionChange(stepIndex, questionIndex, e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Space direction="vertical" style={{ width: '100%', marginTop: '10px' }}>
        <div className='fxq-flex fxq-space-x-4 fxq-items-center'>
          <div className='fxq-w-40'>
            <Text strong>Correct value</Text>
            <Input
              placeholder="Correct Answer Points"
              value={question.points.correct}
              onChange={e => handlePointsChange(stepIndex, questionIndex, 'correct', e.target.value)}
              style={{ marginBottom: '10px' }}
              type="number"
            />
          </div>
          <div className='fxq-w-40'>
            <Text strong>Wrong value</Text>
            <Input
              placeholder="Wrong Answer Points"
              value={question.points.wrong}
              onChange={e => handlePointsChange(stepIndex, questionIndex, 'wrong', e.target.value)}
              style={{ marginBottom: '10px' }}
              type="number"
            />
          </div>
          <div className='fxq-w-40'>
            <Text strong>Empty value</Text>
            <Input
              placeholder="Empty Answer Points"
              value={question.points.empty}
              onChange={e => handlePointsChange(stepIndex, questionIndex, 'empty', e.target.value)}
              style={{ marginBottom: '10px' }}
              type="number"
            />
          </div>
          <Checkbox
            checked={question.required}
            onChange={e => handleRequiredChange(stepIndex, questionIndex, e.target.checked)}
            style={{ marginTop: '10px' }}
          >
            Required
          </Checkbox>
        </div>
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        {question.answers.map((answer, answerIndex) => (
          <Answer
            key={`answer-${answerIndex}`}
            answer={answer}
            index={answerIndex}
            stepIndex={stepIndex}
            questionIndex={questionIndex}
          />
        ))}
      </Space>
      <div className="fxq-flex fxq-justify-between">
        <Button
          type="dashed"
          onClick={() => addAnswer(stepIndex, questionIndex)}
          icon={<PlusOutlined />}
        >
          Add Answer
        </Button>
        <Button
          danger
          icon={<MinusCircleOutlined />}
          onClick={() => removeQuestion(stepIndex, questionIndex)}
          style={{ marginTop: '10px' }}
        >
          Remove Question
        </Button>
      </div>
    </>
  );
};

export default Question;
