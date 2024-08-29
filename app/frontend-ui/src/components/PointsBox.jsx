import { __ } from '../util/common';

const PointsBox = ({ userPoints, totalPoints, startAgain }) => {
  const result = 100 * userPoints/totalPoints;
  const averagePercentage = parseFloat(result.toFixed(0));

  return (
    <div className="fxq-points-box fxq-px-6 fxq-flex fxq-flex-col fxq-items-center fxq-text-secondary fxq-max-w-md fxq-mx-auto">
      <h2 className="fxq-text-3xl fxq-font-bold fxq-mb-4 fxq-text-center fxq-text-secondary">{__('Your points are', 'flex-quiz')}</h2>
      <p className="fxq-text-3xl fxq-mb-4">{userPoints} / {totalPoints}</p>
      <p className="fxq-text-base fxq-mb-6">{__('The exam average is', 'flex-quiz')} {averagePercentage}%</p>
      <div className="fxq-w-[295px] fxq-border fxq-border-secondary fxq-h-3 fxq-overflow-hidden">
        <div
          className="fxq-bg-secondary fxq-h-full"
          style={{ width: `${averagePercentage}%` }}
        ></div>
      </div>
      {flexQuizData.generalSettings && !flexQuizData.generalSettings.allowSingleAttempt &&
      <button
        className="fxq-bg-tertiary fxq-text-secondary fxq-px-4 fxq-py-2 fxq-rounded fxq-capitalize fxq-mr-0 fxq-w-72 fxq-mt-8 hover:fxq-shadow-custom-inset-hover"
        onClick={startAgain}
      >
        {__('Start Again', 'flex-quiz')}
      </button>}
    </div>
  );
};

export default PointsBox;
