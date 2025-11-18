import React from 'react';
import { Button } from './Button';

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Something went wrong',
  message, 
  onRetry,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`} role="alert">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100">
        <svg 
          className="w-6 h-6 text-red-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-heading font-semibold text-text">
        {title}
      </h3>
      <p className="mb-4 text-center text-text-light">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

ErrorMessage.displayName = 'ErrorMessage';
