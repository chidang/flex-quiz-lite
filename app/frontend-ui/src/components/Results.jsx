import React from 'react';
import { __ } from '../util/common';
import { useApp } from '../context/AppContext';
import PointsBox from './PointsBox'

const Results = ({ steps }) => {
  const { answers, results, totalCorrectAnswers, resetData } = useApp();

  const getIcon = (isSelected, isCorrect) => {
    if (isSelected && isCorrect) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" zoomAndPan="magnify" viewBox="0 0 768 767.999994" height="24" preserveAspectRatio="xMidYMid meet" version="1.0">
          <path fill="#3ab54a" d="M 703.085938 384 C 703.085938 559.945312 559.945312 703.085938 384 703.085938 C 208.054688 703.085938 64.914062 559.945312 64.914062 384 C 64.914062 208.054688 208.054688 64.910156 384 64.910156 C 559.945312 64.910156 703.085938 208.054688 703.085938 384 Z M 655.503906 112.488281 C 582.984375 39.96875 486.5625 0.0273438 384 0.0273438 C 281.4375 0.0273438 185.015625 39.96875 112.496094 112.488281 C 39.96875 185.015625 0.0273438 281.4375 0.0273438 384 C 0.0273438 486.5625 39.96875 582.984375 112.496094 655.511719 C 185.015625 728.03125 281.4375 767.972656 384 767.972656 C 486.5625 767.972656 582.984375 728.03125 655.503906 655.511719 C 728.03125 582.984375 767.972656 486.5625 767.972656 384 C 767.972656 281.4375 728.03125 185.015625 655.503906 112.488281 " fill-opacity="1" fill-rule="nonzero"/>
          <path fill="#3ab54a" d="M 554.300781 239.21875 L 343.769531 449.746094 L 256.269531 362.25 L 197.003906 421.523438 L 343.769531 568.292969 L 613.574219 298.492188 L 554.300781 239.21875 " fill-opacity="1" fill-rule="nonzero"/>
        </svg>
      );
    } else if (isSelected && !isCorrect) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" zoomAndPan="magnify" viewBox="0 0 768 767.999994" height="24" preserveAspectRatio="xMidYMid meet" version="1.0">
          <path fill="#d50000" d="M 108.101562 605.996094 L 607.707031 106.375 L 662.011719 160.679688 L 162.410156 660.300781 Z M 108.101562 605.996094 " fill-opacity="1" fill-rule="nonzero"/>
          <path fill="#d50000" d="M 384 0 C 172.800781 0 0 172.800781 0 384 C 0 595.199219 172.800781 768 384 768 C 595.199219 768 768 595.199219 768 384 C 768 172.800781 595.199219 0 384 0 Z M 384 691.199219 C 215.039062 691.199219 76.800781 552.960938 76.800781 384 C 76.800781 215.039062 215.039062 76.800781 384 76.800781 C 552.960938 76.800781 691.199219 215.039062 691.199219 384 C 691.199219 552.960938 552.960938 691.199219 384 691.199219 Z M 384 691.199219 " fill-opacity="1" fill-rule="nonzero"/>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" zoomAndPan="magnify" viewBox="0 0 768 767.999994" height="24" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="161897e31e"><path d="M 76.800781 76.800781 L 691.050781 76.800781 L 691.050781 691.050781 L 76.800781 691.050781 Z M 76.800781 76.800781 " clip-rule="nonzero"/></clipPath></defs><path fill="#f6f6f6" d="M 384 0 C 171.839844 0 0 171.839844 0 384 C 0 596.160156 171.839844 768 384 768 C 596.160156 768 768 596.160156 768 384 C 768 171.839844 596.160156 0 384 0 Z M 384 691.199219 C 214.273438 691.199219 76.800781 553.726562 76.800781 384 C 76.800781 214.273438 214.273438 76.800781 384 76.800781 C 553.726562 76.800781 691.199219 214.273438 691.199219 384 C 691.199219 553.726562 553.726562 691.199219 384 691.199219 Z M 384 691.199219 " fill-opacity="1" fill-rule="nonzero"/><g clip-path="url(#161897e31e)"><path fill="#004aad" d="M 383.996094 691.191406 C 214.28125 691.191406 76.800781 552.761719 76.800781 383.996094 C 76.800781 215.226562 214.28125 76.800781 383.996094 76.800781 C 553.710938 76.800781 691.191406 214.277344 691.191406 383.996094 C 691.191406 553.710938 552.761719 691.191406 383.996094 691.191406 Z M 383.996094 95.761719 C 224.707031 95.761719 95.761719 224.707031 95.761719 383.996094 C 95.761719 543.28125 224.707031 672.226562 383.996094 672.226562 C 543.28125 672.226562 672.226562 543.28125 672.226562 383.996094 C 672.226562 224.707031 542.332031 95.761719 383.996094 95.761719 Z M 383.996094 95.761719 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
      );
    }
  };

  return (
    <div className="fxq-bg-secondary-box fxq-rounded-lg fxq-py-14 fxq-px-12 fxq-mx-auto fxq-my-12 fxq-max-w-3xl">
      <PointsBox userPoints={results} totalPoints={totalCorrectAnswers} startAgain={resetData} />

      <div className='fxq-mt-5 fxq-border-t fxq-border-dark-grey fxq-py-6 fxq-text-secondary'>
        <p className="fxq-text-base">{__('Answers breakdown', 'flex-quiz')}:</p>
        <ol className='fxq-ml-5 fxq-marker-text-lg'>

          {steps.map((step, stepIndex) => (
            <>
              {step.questions.map((question, questionIndex) => (
                <li key={`question-${questionIndex}`} className="fxq-my-6 fxq-px-2">
                  <h4 className="fxq-text-lg fxq-mb-8 fxq-text-secondary fxq-font-bold">{question.text}</h4>
                  <div className='fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2'>
                    {question.answers.map((answer, answerIndex) => {
                      const userAnswer = answers[`${stepIndex}-${questionIndex}`];
                      const isCorrect = question.correctAnswers.includes(answerIndex);
                      const isSelected = Array.isArray(userAnswer) ? userAnswer.includes(answerIndex) : userAnswer === answerIndex;

                      return (
                        <p key={`answer-${answerIndex}`} className="fxq-flex fxq-items-center fxq-mb-1">
                          <span className='fxq-text-xl fxq-mr-1'>{getIcon(isSelected, isCorrect)}</span>
                          <span className="fxq-ml-2">{answer}</span>
                        </p>
                      );
                    })}
                  </div>
                </li>
              ))}
            </>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Results;
