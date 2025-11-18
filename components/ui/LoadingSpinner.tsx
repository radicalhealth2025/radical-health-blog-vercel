import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  label = 'Loading...', 
  className = '' 
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  const spinnerClasses = `${sizeStyles[size]} border-primary border-t-transparent rounded-full animate-spin`;
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`} role="status">
      <div className={spinnerClasses} aria-hidden="true"></div>
      <span className="sr-only">{label}</span>
      {label && (
        <p className="mt-2 text-sm text-text-light" aria-live="polite">
          {label}
        </p>
      )}
    </div>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';
