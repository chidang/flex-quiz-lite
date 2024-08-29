import React, { useContext } from 'react';
import { Divider, Typography, Collapse, Button, Input, message } from 'antd';
import { PlusOutlined, CopyOutlined, ScheduleOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Step from '../components/Step';
import ExaminationContext, { ExaminationProvider } from '../context/ExaminationContext';
import GlobalData from '../util/globalData';
import Loader from '../components/Loader';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const Examination = () => {
  const {
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
    handleSubmit,
    setActiveStepKeys,
    setCopied,
  } = useContext(ExaminationContext);

  const flexQuizData = GlobalData.dataLocalizer;
  const pageTitle = flexQuizData.is_page === 'edit' ? 'Edit Quiz' : 'Add Quiz';
  const examLink = `${window.location.origin}/${flexQuizData.exams_slug}/${slug}/`;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title className='fxq-text-primary' level={4}>
        <span className="fxq-text-primary fxq-mr-2"><ScheduleOutlined /></span> {pageTitle}
      </Title>
      <Divider />
      <div>
        <div style={{ marginBottom: '20px' }}>
          <label className='fxq-block fxq-font-bold' htmlFor='exam-title'><span className='fxq-text-red-400'>*</span> Title</label>
          <Input
            placeholder="Enter title here"
            value={title}
            id="exam-title"
            onChange={e => handleTitleChange(e.target.value)}
            style={{ marginBottom: errors.title ? '' : '10px' }}
          />
          {errors.title && <Text type="danger">{errors.title}</Text>}
          <label className='fxq-block fxq-font-bold' htmlFor='exam-slug'><span className='fxq-text-red-400'>*</span> Slug</label>
          <Input
            placeholder="Enter slug here"
            value={slug}
            id="exam-slug"
            onChange={e => handleSlugChange(e.target.value)}
            style={{ marginBottom: errors.title ? '' : '10px' }}
          />
          {errors.slug && <Text type="danger">{errors.slug}</Text>}
          {flexQuizData.is_page === 'edit' && flexQuizData.post_id &&
            <div>
              <Text>Exam Link:</Text>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Text code>{examLink}</Text>
                <CopyToClipboard text={examLink} onCopy={() => setCopied(true)}>
                  <Button icon={<CopyOutlined />} style={{ marginLeft: '10px' }}>
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          }
        </div>
        <div className='fxq-hidden'>
          <label className='fxq-block fxq-font-bold' htmlFor='exam-required-points'>Required Points</label>
          <Input
            placeholder="Enter required points to pass the exam"
            value={requiredPoints}
            id="exam-required-points"
            onChange={e => handleRequiredPointsChange(e.target.value)}
            style={{ marginBottom: '10px', width: '150px' }}
            type="number"
          />
        </div>
        <div className='fxq-mt-6'>
          <Collapse activeKey={activeStepKeys} onChange={setActiveStepKeys}>
            {steps.map((step, stepIndex) => (
              <Panel header={`Step ${stepIndex + 1}`} key={`step-${stepIndex}`}>
                <Step
                  key={stepIndex}
                  step={step}
                  index={stepIndex}
                />
              </Panel>
            ))}
          </Collapse>
        </div>
        <div className="fxq-flex fxq-justify-between">
          <Button
            type="primary"
            onClick={addStep}
            icon={<PlusOutlined />}
            style={{ marginTop: '20px' }}
          >
            Add Step
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: '20px' }}
          >
            {submitting && <Loader />}
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

const ExaminationWithProvider = () => (
  <ExaminationProvider>
    <Examination />
  </ExaminationProvider>
);

export default ExaminationWithProvider;
