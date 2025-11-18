import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseStyles = 'w-full px-4 py-2 font-body text-text bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
    const normalStyles = 'border-text/20 focus:border-primary focus:ring-primary';
    const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
    
    const inputClasses = `${baseStyles} ${error ? errorStyles : normalStyles} ${className}`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block mb-1.5 text-sm font-heading font-medium text-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-text-light">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
