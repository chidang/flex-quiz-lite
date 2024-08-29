import React from 'react'
import ReactDOM from 'react-dom';
import AppLayout from './Layouts/AppLayout'
import Settings from './page-content/Settings';
import './main.css'

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <React.StrictMode>
      <AppLayout PageContent={Settings} />
    </React.StrictMode>,
    document.getElementById('wpbody-content'));
});
