import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import PersonalInformation from '../components/PersonalInformation';
import ExamStep from '../components/ExamStep';
import Results from '../components/Results';
import Dialog from '../components/Dialog';
import Loader from '../components/Loader';
import { __ } from '../util/common';

const ExaminationApp = () => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentStep, setCurrentStep, submitted, setSubmitted, personalInfo, answers, results, setResults, totalCorrectAnswers, setTotalCorrectAnswers } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [totalSteps, setTotalSteps] = useState(0);

  const postId = document.getElementById('flex-quiz-id').value;

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`${window.flexQuizData.api_url}/flex-quiz/v1/exam/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.flexQuizData.nonce,
          },
        });
        const data = await response.json();
        setTitle(data.title);
        setSteps(data.steps || []);
      } catch (error) {
        console.error('Error fetching exam data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [postId]);

  useEffect(() => {
    setTotalSteps(steps.length + 1);
  }, [steps]);

  const validateStep = async (stepIndex) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (stepIndex === 0) {
      if (!personalInfo.fullName || !personalInfo.dateOfBirth || !personalInfo.email) {
        return __('Please fill in all required personal information.', 'flex-quiz');
      }

      if (!emailRegex.test(personalInfo.email)) {
        return __('Please provide a valid email address.', 'flex-quiz');
      }

      setLoading(true)
      // Check email existence
      let checkingData = {
        exam_id: postId,
        personalInfo: personalInfo
      };

      try {
        const response = await fetch(`${window.flexQuizData.api_url}/flex-quiz/v1/check-personal-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': window.flexQuizData.nonce,
          },
          body: JSON.stringify(checkingData),
        });
        const data = await response.json();
        if (!data.success) {
          return data.message;
        }
      } catch (error) {
        return __('Failed to check personal info', 'flex-quiz') + ': ' + error;
      } finally {
        setLoading(false)
      }
    } else {
      const step = steps[stepIndex - 1];
      for (let questionIndex = 0; questionIndex < step.questions.length; questionIndex++) {
        const question = step.questions[questionIndex];
        const answer = answers[`${stepIndex - 1}-${questionIndex}`];
        if (question.required) {
          if (question.correctAnswers.length > 1) {
            if (!answer || answer.length === 0) {
              return __('Please answer question', 'flex-quiz') + ' ' + (questionIndex + 1);
            }
          } else {
            if (answer === undefined) {
              return __('Please answer question', 'flex-quiz') + ' ' + (questionIndex + 1);
            }
          }
        }
      }
    }
    return null;
  };

  const handleNext = async () => {
    const error = await validateStep(currentStep);
    if (error) {
      setErrorMessage(error);
      setValid(false);
    } else {
      setValid(true);
      setErrorMessage('');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const handleOpenDialog = (e) => {
    e.preventDefault();
    openModal();
  };

  const handleQuitExam = (e) => {
    window.location.href = flexQuizData.generalSettings.redirectUrl;
  }

  const handleSubmit = async () => {
    const error = await validateStep(currentStep);
    if (error) {
      setErrorMessage(error);
      setValid(false);
    } else {
      setErrorMessage('');
      setValid(true);
      await calculateResults();
    }
  };

  useEffect(() => {
    if (results !== null && totalCorrectAnswers !== null) {
      const newSubmissionData = {
        title,
        steps,
        answers,
        personalInfo,
        post_id: postId,
        achievedScore: results,
        maxPoints: totalCorrectAnswers
      };
      setSubmissionData(newSubmissionData);
    }
  }, [results, totalCorrectAnswers]);

  useEffect(() => {
    const submitExam = async () => {
      if (submissionData) {
        setLoading(true);
        try {
          const response = await fetch(`${window.flexQuizData.api_url}/flex-quiz/v1/submit-exam`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-WP-Nonce': window.flexQuizData.nonce,
            },
            body: JSON.stringify(submissionData),
          });
          const data = await response.json();
          if (data.success) {
            setSubmitted(true);
          } else {
            setValid(false);
            setErrorMessage(__('Failed to submit examination.', 'flex-quiz'));
          }
        } catch (error) {
          setValid(false);
          setErrorMessage(__('Failed to submit examination:', 'flex-quiz') + error);
        } finally {
          setLoading(false);
        }
      }
    };

    submitExam();
  }, [submissionData]);

  const calculateResults = async () => {
    let userPoints = 0;
    let totalCorrect = 0;

    steps.forEach((step, stepIndex) => {
      step.questions.forEach((question, questionIndex) => {
        const answer = answers[`${stepIndex}-${questionIndex}`];
        totalCorrect += Number(question.points.correct);

        if (question.correctAnswers.length > 1) {
          const correctAnswers = new Set(question.correctAnswers);
          const userAnswers = new Set(answer);
          if (correctAnswers.size === userAnswers.size && [...correctAnswers].every(answer => userAnswers.has(answer))) {
            userPoints += Number(question.points.correct);
          } else {
            userPoints += Number(question.points.wrong);
          }
        } else {
          if (answer === question.correctAnswers[0]) { //correct answer
            userPoints += Number(question.points.correct);
          } else if (answer === null || answer === undefined) { //empty answer
            userPoints += Number(question.points.empty);
          } else { //wrong answer
            userPoints += Number(question.points.wrong);
          }
        }
      });
    });

    setTotalCorrectAnswers(totalCorrect);
    setResults(userPoints);
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.classList.add('overflow-y-hidden');
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove('overflow-y-hidden');
  };

  // Close all modals when press ESC
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (submitted) {
    return <Results steps={steps} />;
  }

  return (
    <>
      <Dialog isOpen={modalOpen} closeModal={closeModal} handleOK={handleQuitExam} />
      <div className="fxq-p-5">
        {currentStep === 0 && flexQuizData.generalSettings.headline && <h2 className="fxq-text-3xl fxq-mb-4 fxq-text-primary">{flexQuizData.generalSettings.headline}</h2>}
        {flexQuizData.generalSettings && flexQuizData.generalSettings.showStepsBar === '1' &&
          <div className="fxq-exam-steps fxq-hidden lg:fxq-flex fxq-items-center fxq-mb-4">
            <div className={`fxq-exam-step fxq-flex fxq-grow fxq-items-center fxq-justify-center fxq-border fxq-border-gray-300 fxq-px-3 fxq-py-1 ${currentStep === 0 ? 'fxq-bg-primary fxq-text-white fxq-current-step' : 'fxq-bg-white fxq-text-black'}`} style={{ flex: 1 }}>
              1. {__('Personal Information', 'flex-quiz')}
            </div>
            {steps.map((step, index) => (
              <div key={index} className={`fxq-exam-step fxq-flex fxq-grow fxq-items-center fxq-justify-center fxq-border fxq-border-gray-300 fxq-px-3 fxq-py-1 ${currentStep === index + 1 ? 'fxq-bg-primary fxq-text-white fxq-current-step' : 'fxq-bg-white fxq-text-black'}`} style={{ flex: 1 }}>
                {index + 2}. {step.name}
              </div>
            ))}
            <div className={`fxq-exam-step fxq-flex fxq-grow fxq-items-center fxq-justify-center fxq-border fxq-border-gray-300 fxq-px-3 fxq-py-1 ${currentStep === steps.length + 1 ? 'fxq-bg-primary fxq-text-white fxq-current-step' : 'fxq-bg-white fxq-text-black'}`} style={{ flex: 1 }}>
              {steps.length + 2}. {__('Results', 'flex-quiz')}
            </div>
          </div>
        }
        <div className="fxq-mt-4">
          {currentStep === 0 ? (
            <PersonalInformation valid={valid} errorMessage={errorMessage} totalSteps={totalSteps} />
          ) : (
            <ExamStep step={steps[currentStep - 1]} stepIndex={currentStep - 1} valid={valid} errorMessage={errorMessage} totalSteps={totalSteps} />
          )}
        </div>
        <div className="fxq-mt-4 fxq-text-right">
          {currentStep === 0 && (
            <a className="fxq-btn-quit fxq-px-4 fxq-py-2 fxq-mr-2 hover:fxq-cursor-pointer fxq-font-bold" onClick={handleOpenDialog}>
              {__('Quit Exam', 'flex-quiz')}
            </a>
          )}
          {currentStep > 0 && (
            <a className="fxq-btn-back fxq-px-4 fxq-py-2 fxq-mr-2 hover:fxq-cursor-pointer fxq-font-bold" onClick={handlePrev}>
              {__('Go Back', 'flex-quiz')}
            </a>
          )}
          {steps.length > 0 &&
            <>
              {currentStep < steps.length ? (
                <button
                  disabled={loading}
                  className="fxq-btn-next fxq-inline-flex fxq-justify-center fxq-items-center fxq-relative fxq-bg-tertiary hover:fxq-shadow-custom-inset-hover fxq-text-white fxq-px-4 fxq-py-2 fxq-rounded fxq-capitalize fxq-mr-0 fxq-w-52 fxq-mb-0"
                  onClick={handleNext}
                >
                  {loading && <Loader className="fxq-absolute fxq-left-2" />}
                  <span>{__('Next - Step', 'flex-quiz') + ` ${currentStep + 2}`}</span>
                </button>
              ) : (
                <button
                  disabled={loading}
                  className="fxq-btn-finish fxq-inline-flex fxq-justify-center fxq-relative fxq-items-center fxq-bg-tertiary hover:fxq-shadow-custom-inset-hover fxq-text-white fxq-px-4 fxq-py-2 fxq-rounded fxq-capitalize fxq-mr-0 fxq-min-w-52 fxq-mb-0"
                  onClick={handleSubmit}
                >
                  {loading && <Loader className="fxq-absolute fxq-left-2" />}
                  <span>{__('Finish', 'flex-quiz')}</span>
                </button>
              )}
            </>}
        </div>
      </div>
    </>
  );
};

export default ExaminationApp;
