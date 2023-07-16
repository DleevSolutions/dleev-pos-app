import { Component, ReactNode } from 'react';

import { ErrorLogging } from '@services';
import { FrontendErrorType } from '@enums';
import { checkIsDevelopmentMode } from '@utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  logErrors?: boolean;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private consoleSourceMethod: (...data: any[]) => void;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.consoleSourceMethod = console.error.bind(console);
  }

  componentDidMount() {
    if (this.props.logErrors) {
      const source = this.consoleSourceMethod;
      console.error = (...args: any[]) => {
        args.forEach((message) => {
          ErrorLogging.catch(FrontendErrorType.CONSOLE, new Error(message));
        });

        if (checkIsDevelopmentMode()) {
          source(...args);
        } else {
          source(...args.filter((message) => !ErrorLogging.checkIsErrorInExceptionList(new Error(message))));
        }
      };
    }
  }

  componentWillUnmount() {
    if (this.props.logErrors) {
      console.error = this.consoleSourceMethod;
    }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (this.props.logErrors) {
      ErrorLogging.catch(FrontendErrorType.RENDER, error);
    }
  }

  render() {
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
