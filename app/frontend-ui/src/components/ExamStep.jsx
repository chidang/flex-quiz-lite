import { useApp } from '../context/AppContext';
import { sprintf } from '@wordpress/i18n';
import { __ } from '../util/common';

const ExamStep = ({ step, stepIndex, valid, errorMessage, totalSteps }) => {
  const { answers, setAnswers } = useApp();

  const handleSingleAnswerChange = (stepIndex, questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [`${stepIndex}-${questionIndex}`]: answerIndex,
    });
  };

  const handleMultipleAnswersChange = (stepIndex, questionIndex, checkedValues) => {
    setAnswers({
      ...answers,
      [`${stepIndex}-${questionIndex}`]: checkedValues,
    });
  };

  return (
    <div>
      {flexQuizData.generalSettings.headline && <h2 className="fxq-text-xl lg:fxq-text-3xl fxq-mb-4 fxq-text-primary">{flexQuizData.generalSettings.headline}</h2>}
      <div className="fxq-box fxq-bg-primary-box fxq-rounded-lg fxq-p-6 fxq-mx-auto">
        <div className='fxq-border-b-2 fxq-border-light-gray lg:fxq-px-6 fxq-mb-10 fxq-pb-4'>
          <h3 className="fxq-text-3xl fxq-mb-4 fxq-text-primary">{step.name ? step.name :  `${ __('Step', 'flex-quiz') } ${stepIndex + 2}/${totalSteps}`}</h3>
          <p className='fxq-mb-6 fxq-text-primary'>{sprintf(__('Please answer on %s questions below', 'flex-quiz'), step.questions.length)}</p>
        </div>
        <ol className='fxq-ml-5 fxq-marker-text-lg fxq-marker-font-bold'>
        {step.questions.map((question, questionIndex) => (
          <li key={`question-${questionIndex}`} className="fxq-my-6 fxq-px-2 fxq-text-primary">
            <h4 className="fxq-text-lg fxq-mb-8 fxq-font-bold fxq-text-primary">{question.text}</h4>
            {question.correctAnswers.length > 1 ? (
              <div className="fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2">
                {question.answers.map((answer, answerIndex) => (
                  <div key={`answer-${answerIndex}`} className="fxq-mb-2">
                    <label className="fxq-inline-flex fxq-items-center">
                      <input
                        type="checkbox"
                        className="fxq-form-checkbox fxq-h-4 fxq-w-4"
                        value={answerIndex}
                        checked={(answers[`${stepIndex}-${questionIndex}`] || []).includes(answerIndex)}
                        onChange={(e) => {
                          const checkedValues = [...(answers[`${stepIndex}-${questionIndex}`] || [])];
                          if (e.target.checked) {
                            checkedValues.push(answerIndex);
                          } else {
                            const index = checkedValues.indexOf(answerIndex);
                            if (index > -1) {
                              checkedValues.splice(index, 1);
                            }
                          }
                          handleMultipleAnswersChange(stepIndex, questionIndex, checkedValues);
                        }}
                      />
                      <span className="fxq-ml-2">{answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fxq-flex fxq-mb-2">
                {question.answers.map((answer, answerIndex) => (
                  <div
                    key={`answer-${answerIndex}`}
                    className={`fxq-mb-2 ${answerIndex !== question.answers.length - 1 ? 'fxq-mr-16' : ''}`}
                  >
                    <label className="fxq-inline-flex fxq-items-center">
                      <input
                        type="radio"
                        className="fxq-form-radio fxq-h-4 fxq-w-4 fxq-mb-0"
                        name={`question-${stepIndex}-${questionIndex}`}
                        value={answerIndex}
                        checked={answers[`${stepIndex}-${questionIndex}`] === answerIndex}
                        onChange={() => handleSingleAnswerChange(stepIndex, questionIndex, answerIndex)}
                      />
                      <span className="fxq-ml-2">{answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
        </ol>
        {!valid && <p className="fxq-text-red-500 fxq-mt-6 lg:fxq-px-6">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ExamStep;
