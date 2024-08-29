// ErrorBoundary.js
import React from 'react';
import { __ } from '../util/common';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h3 style={{color: 'red'}}>{__('Something went wrong. Please contact the administrator for assistance.', 'flex-quiz')}</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
