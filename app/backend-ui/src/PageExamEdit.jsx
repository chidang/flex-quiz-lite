import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './Layouts/AppLayout'
import Examination from './page-content/Examination';
import './main.css';

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <React.StrictMode>
      <AppLayout PageContent={Examination} />
    </React.StrictMode>,
    document.getElementById('wpbody-content'));
});