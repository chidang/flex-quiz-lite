import React, { createContext, useState, useEffect } from 'react';
import { apiBaseUrl, generateSlug } from '../util/common';
import GlobalData from '../util/globalData';
import { message } from 'antd';

const ExaminationContext = createContext();

message.config({
  top: 50,
  duration: 2,
  maxCount: 3,
});

export const ExaminationProvider = ({ children }) => {
  const flexQuizData = GlobalData.dataLocalizer;
  const apiUrl = `${apiBaseUrl()}/exam`;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requiredPoints, setRequiredPoints] = useState(0);
  const postId = flexQuizData.post_id;
  const [activeStepKeys, setActiveStepKeys] = useState([]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({ title: '', slug: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (flexQuizData.is_page === 'edit' && postId) {
      fetch(`${apiUrl}/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': flexQuizData.nonce,
        },
      })
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setSlug(data.slug);
          setRequiredPoints(data.required_points);
          setSteps(data.steps || []);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching exam data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [postId]);

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
    if (flexQuizData.is_page !== 'edit') {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (newSlug) => {
    setSlug(newSlug);
  };

  const handleRequiredPointsChange = (points) => {
    setRequiredPoints(points);
  };

  const addStep = () => {
    const newSteps = [...steps, { name: '', questions: [] }];
    setSteps(newSteps);
    setActiveStepKeys([...activeStepKeys, `step-${newSteps.length - 1}`]);
  };

  const addQuestion = (stepIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions.push({ text: '', answers: [], correctAnswers: [], points: { correct: 0, wrong: 0, empty: 0 }, required: false });
    setSteps(newSteps);
  };

  const addAnswer = (stepIndex, questionIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions[questionIndex].answers.push('');
    setSteps(newSteps);
  };

  const handleStepChange = (stepIndex, value) => {
    const newSteps = [...steps];
    newSteps[stepIndex].name = value;
    setSteps(newSteps);
  };

  const handleQuestionChange = (stepIndex, questionIndex, value) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions[questionIndex].text = value;
    setSteps(newSteps);
  };

  const handleAnswerChange = (stepIndex, questionIndex, answerIndex, value) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions[questionIndex].answers[answerIndex] = value;
    setSteps(newSteps);
  };

  const handleCorrectAnswerChange = (stepIndex, questionIndex, answerIndex, checked) => {
    const newSteps = [...steps];
    const correctAnswers = newSteps[stepIndex].questions[questionIndex].correctAnswers;

    if (checked) {
      correctAnswers.push(answerIndex);
    } else {
      const index = correctAnswers.indexOf(answerIndex);
      if (index > -1) {
        correctAnswers.splice(index, 1);
      }
    }

    setSteps(newSteps);
  };

  const handlePointsChange = (stepIndex, questionIndex, pointType, value) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions[questionIndex].points[pointType] = value;
    setSteps(newSteps);
  };

  const handleRequiredChange = (stepIndex, questionIndex, checked) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions[questionIndex].required = checked;
    setSteps(newSteps);
  };

  const removeStep = (stepIndex) => {
    const newSteps = steps.filter((_, index) => index !== stepIndex);
    setSteps(newSteps);
  };

  const removeQuestion = (stepIndex, questionIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions = newSteps[stepIndex].questions.filter((_, index) => index !== questionIndex);
    setSteps(newSteps);
  };

  const removeAnswer = (stepIndex, questionIndex, answerIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].questions[questionIndex].answers = newSteps[stepIndex].questions[questionIndex].answers.filter((_, index) => index !== answerIndex);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    let validationErrors = {};

    if (!title) {
      validationErrors.title = 'Title is required';
    }

    if (!slug) {
      validationErrors.slug = 'Slug is required';
    }

    steps.forEach((step, stepIndex) => {
      step.questions.forEach((question, questionIndex) => {
        if (!question.text) {
          message.error(`Question text is required: Step ${stepIndex + 1}; Question ${questionIndex + 1}`, 3);
          validationErrors[`step-${stepIndex}-question-${questionIndex}`] = 'Question text is required';
        }

        question.answers.forEach((answer, answerIndex) => {
          if (!answer) {
            message.error(`Answer text is required: Step ${stepIndex + 1}; Question ${questionIndex + 1}; Answer ${answerIndex + 1}`, 3);
            validationErrors[`step-${stepIndex}-question-${questionIndex}-answer-${answerIndex}`] = 'Answer text is required';
          }
        });
      });
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const url = flexQuizData.is_page === 'edit' ? `${apiUrl}/${postId}` : `${apiUrl}`;
    const method = flexQuizData.is_page === 'edit' ? 'PUT' : 'POST';
    setSubmitting(true);
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': flexQuizData.nonce,
      },
      body: JSON.stringify({
        title,
        slug,
        requiredPoints,
        steps,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          message.success('Exam saved successfully.');
          if (method === 'POST') {
            window.location.href = `${flexQuizData.wpDashboardUrl}post.php?post=${data.id}&action=edit`;
          }
        } else {
          message.error('Failed to save the exam.');
        }
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Error saving exam data:', error);
        message.error('Failed to save the exam.');
      });
  };

  return (
    <ExaminationContext.Provider
      value={{
        title,
        slug,
        steps,
        loading,
        submitting,
        requiredPoints,
        activeStepKeys,
        copied,
        errors,
        handleTitleChange,
        handleSlugChange,
        handleRequiredPointsChange,
        addStep,
        addQuestion,
        addAnswer,
        handleStepChange,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        handlePointsChange,
        handleRequiredChange,
        removeStep,
        removeQuestion,
        removeAnswer,
        handleSubmit,
        setActiveStepKeys,
        setCopied,
      }}
    >
      {children}
    </ExaminationContext.Provider>
  );
};

export default ExaminationContext;
