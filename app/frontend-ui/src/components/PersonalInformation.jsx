import { useApp } from '../context/AppContext';
import { __ } from '../util/common';

const PersonalInformation = ({ valid, errorMessage, totalSteps }) => {
  const { personalInfo, setPersonalInfo } = useApp();

  return (
    <div>
      <div className="fxq-box fxq-bg-primary-box fxq-rounded-lg fxq-p-6 fxq-mx-auto">
        <div className='fxq-border-b-2 fxq-border-light-gray lg:fxq-px-6 fxq-mb-10 fxq-pb-4'>
          <h3 className="fxq-text-3xl fxq-mb-4 fxq-text-primary">{__('Step', 'flex-quiz')} 1/{totalSteps}</h3>
          {flexQuizData.generalSettings.personalInfoStepText && <p className="fxq-mb-6 fxq-text-primary">{flexQuizData.generalSettings.personalInfoStepText}</p>}
        </div>
        <div className="fxq-form fxq-grid fxq-gap-4 fxq-grid-cols-1 sm:fxq-grid-cols-2 lg:fxq-px-6 ">
          <div className="fxq-fullname fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
            <label
              className='fxq-text-primary fxq-text-[0.875rem] fxq-font-bold fxq-whitespace-nowrap fxq-py-0 fxq-leading-8 fxq-mb-0'
              htmlFor="full-name"
            ><span className='fxq-hidden lg:fxq-inline'>{__('Name (First and Last name)', 'flex-quiz')}*</span><span className="fxq-inline lg:fxq-hidden">{__('Full name', 'flex-quiz')}*</span></label>
            <input
              type="text"
              id='full-name'
              autoComplete='off'
              value={personalInfo.fullName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
              className="fxq-input"
            />
          </div>
          <div className="fxq-dob fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
            <label
              className='fxq-text-primary fxq-text-[0.875rem] fxq-font-bold fxq-whitespace-nowrap fxq-py-0 fxq-leading-8 fxq-mb-0'
              htmlFor="dob"
            >{__('Date of birth', 'flex-quiz')}*</label>
            <input
              type="date"
              id='dob'
              placeholder="Date of Birth"
              value={personalInfo.dateOfBirth}
              onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
              className="fxq-input"
            />
          </div>
          <div className="fxq-email fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1 sm:fxq-col-span-1/2">
            <label
              className='fxq-text-primary fxq-text-[0.875rem] fxq-font-bold fxq-whitespace-nowrap fxq-py-0 fxq-leading-8 fxq-mb-0'
              htmlFor="email"
            >{__('E-mail', 'flex-quiz')}*</label>
            <input
              type="email"
              id="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              className="fxq-input"
            />
          </div>
          <div className="fxq-phone fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1 sm:fxq-col-span-1/2">
            <label
              className='fxq-text-primary fxq-text-[0.875rem] fxq-font-bold fxq-whitespace-nowrap fxq-py-0 fxq-leading-8 fxq-mb-0'
              htmlFor="phone"
            >{__('Phone', 'flex-quiz')}</label>
            <input
              type="text"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              className="fxq-input"
            />
          </div>
          <div className="fxq-address fxq-rounded-[4px] fxq-items-center fxq-col-span-2">
            <label
              className='fxq-text-primary fxq-text-[0.875rem] fxq-font-bold fxq-whitespace-nowrap fxq-py-0 fxq-leading-8 fxq-mb-0'
              htmlFor="address"
            >{__('Address', 'flex-quiz')}</label>
            <input
              type="text"
              id="address"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              className="fxq-input"
            />
          </div>
        </div>
        {flexQuizData.generalSettings && flexQuizData.generalSettings.subscribeNewsletter === '1' && <div className='fxq-mt-5 lg:fxq-px-6'>
          <label className="fxq-subscribe fxq-inline-flex fxq-items-center fxq-text-primary">
            <input
              type="checkbox"
              className="fxq-form-checkbox fxq-h-4 fxq-w-4"
              onChange={(e) => setPersonalInfo({ ...personalInfo, subscribeNewsletter: e.target.checked })}
            />
            <span className="fxq-ml-2">{__('Subscribe for newsletter', 'flex-quiz')}</span>
          </label>
        </div>}
        {!valid && <p className="fxq-text-red-500 fxq-mt-6 lg:fxq-px-6">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PersonalInformation;
