import React, { useContext } from 'react';
import { Input, Checkbox, Button, Tooltip } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import ExaminationContext from '../context/ExaminationContext';

const Answer = ({ answer, index, stepIndex, questionIndex }) => {
    const { handleAnswerChange, handleCorrectAnswerChange, removeAnswer, steps } = useContext(ExaminationContext);
    const isCorrect = steps[stepIndex].questions[questionIndex].correctAnswers.includes(index);

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Input
                placeholder="Answer"
                value={answer}
                onChange={e => handleAnswerChange(stepIndex, questionIndex, index, e.target.value)}
            />
            <Checkbox
                checked={isCorrect}
                onChange={e => handleCorrectAnswerChange(stepIndex, questionIndex, index, e.target.checked)}
                style={{ marginLeft: '10px' }}
            >
                Correct
            </Checkbox>
            <Tooltip placement="top" title="Remove this answer">
                <Button
                    type="danger"
                    icon={<MinusCircleOutlined style={{ color: '#ff4d4f' }} />}
                    onClick={() => removeAnswer(stepIndex, questionIndex, index)}
                    style={{ marginLeft: '10px' }}
                />
            </Tooltip>
        </div>
    );
};

export default Answer;
