import React from 'react';
import { __ } from '../util/common';

const Dialog = ({ isOpen, closeModal, handleOK }) => {
  if (!isOpen) return null;

  return (
    <div id="modelConfirm" className="fxq-fixed fxq-z-50 fxq-inset-0 fxq-bg-gray-900 fxq-bg-opacity-60 fxq-overflow-y-auto fxq-h-full fxq-w-full fxq-px-4">
      <div className="fxq-relative fxq-top-40 fxq-mx-auto fxq-shadow-xl fxq-rounded-md fxq-bg-primary-box fxq-max-w-md">
        <div className="fxq-flex fxq-justify-end fxq-p-2">
          <button onClick={closeModal} type="button"
            className="fxq-text-gray-400 fxq-bg-transparent hover:fxq-text-gray-900 fxq-rounded-lg fxq-text-sm fxq-p-1.5 fxq-ml-auto fxq-inline-flex fxq-items-center">
            <svg className="fxq-w-5 fxq-h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        <div className="fxq-p-6 fxq-pt-0 fxq-text-center">
          <h3 className="fxq-text-xl fxq-font-normal fxq-text-primary fxq-mb-8">{__('Are you sure you want to quit this exam?', 'flex-quiz')}</h3>
          <div className='fxq-flex fxq-flex-col lg:fxq-flex-row-reverse fxq-justify-center'>
            <button onClick={handleOK}
              className="fxq-block lg:fxq-inline fxq-text-white fxq-bg-primary fxq-w-full lg:fxq-w-28 hover:fxq-shadow-custom-inset-hover focus:fxq-ring-4 fxq-font-bold fxq-rounded-lg fxq-text-base fxq-items-center fxq-px-3 fxq-py-2.5 fxq-text-center fxq-mr-2 fxq-capitalize">
              {__('Yes', 'flex-quiz')}
            </button>
            <button onClick={closeModal}
              className="fxq-block lg:fxq-inline fxq-text-gray-900 fxq-bg-white fxq-w-full lg:fxq-w-28 hover:fxq-bg-gray-100 focus:fxq-ring-4 fxq-font-bold fxq-items-center fxq-rounded-lg fxq-text-base fxq-px-3 fxq-py-2.5 fxq-text-center fxq-capitalize">
              {__('No', 'flex-quiz')}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dialog;
