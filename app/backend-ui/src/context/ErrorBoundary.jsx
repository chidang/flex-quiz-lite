// ErrorBoundary.js
import React from 'react';

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
      return <h3 style={{color: 'red'}}>Something went wrong. Please contact the administrator for assistance.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
