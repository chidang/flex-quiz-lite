import React from 'react';
import PointsBox from './PointsBox'
import { __ } from '@wordpress/i18n';

const Results = () => {
  return (
    <div className="fxq-bg-primary fxq-rounded-lg fxq-py-14 fxq-px-12 fxq-mx-auto fxq-my-12 fxq-max-w-3xl">
      <PointsBox userPoints={24} totalPoints={72} averagePercentage={27} />
      <div className='fxq-mt-5 fxq-border-t fxq-border-dark-grey fxq-py-6 fxq-text-white'>
        <p className="fxq-text-base">{__('Answers breakdown', 'flex-quiz')}:</p>
        <ol className='fxq-ml-5 fxq-marker-text-lg'>
          <li className="fxq-my-6 fxq-px-2">
            <h4 className="fxq-text-lg fxq-mb-8 fxq-text-white fxq-font-bold">A Sähkölaitteiston käytönjohtajan valvonnassa voivat sähköalan ammattilaiset vaihtaa 400 A pääkytkimen uuteen vastaavaan.</h4>
            <div className='fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2'>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl fxq-mr-1'>✅</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl fxq-mr-1'>✅</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
            </div>
          </li>

          <li className="fxq-my-6 fxq-px-2">
            <h4 className="fxq-text-lg fxq-mb-8 fxq-text-white fxq-font-bold">A Sähkölaitteiston käytönjohtajan valvonnassa voivat sähköalan ammattilaiset vaihtaa 400 A pääkytkimen uuteen vastaavaan.</h4>
            <div className='fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2'>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl fxq-mr-1'>✅</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl'>❌</span>
                <span className="fxq-ml-2">Answer 3</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
            </div>
          </li>

          <li className="fxq-my-6 fxq-px-2">
            <h4 className="fxq-text-lg fxq-mb-8 fxq-text-white fxq-font-bold">Opastettu henkilö saa suorittaa kaikkia kunnossapitotöitä.</h4>
            <div className='fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2'>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl'>❌</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl'>❌</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
            </div>
          </li>
          <li className="fxq-my-6 fxq-px-2">
            <h4 className="fxq-text-lg fxq-mb-8 fxq-text-white fxq-font-bold">Sähkötöiden johtaja voi olla työnaikainen sähköturvallisuuden valvoja.</h4>
            <div className='fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2'>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
              <span className='fxq-text-xl'>❌</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <span className='fxq-text-xl fxq-mr-1'>✅</span>
                <span className="fxq-ml-2">Oikein</span>
              </p>
              <p className="fxq-flex fxq-items-center fxq-mb-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="white"/>
                </svg>
                <span className="fxq-ml-2">Väärin</span>
              </p>
            </div>
          </li>
        </ol>

      </div>
    </div>
  );
};

export default Results;
