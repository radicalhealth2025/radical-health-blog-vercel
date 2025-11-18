'use client';

import React, { useState, useEffect } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxCharCount?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, showCharCount = false, maxCharCount, className = '', id, value, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    
    useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };
    
    const baseStyles = 'w-full px-4 py-2 font-body text-text bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 resize-y';
    const normalStyles = 'border-text/20 focus:border-primary focus:ring-primary';
    const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500';
    
    const textareaClasses = `${baseStyles} ${error ? errorStyles : normalStyles} ${className}`;
    
    const isOverLimit = maxCharCount && charCount > maxCharCount;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block mb-1.5 text-sm font-heading font-medium text-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div className="flex justify-between items-start mt-1.5">
          <div className="flex-1">
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={`${textareaId}-helper`} className="text-sm text-text-light">
                {helperText}
              </p>
            )}
          </div>
          {showCharCount && (
            <p className={`text-sm ml-2 ${isOverLimit ? 'text-red-600' : 'text-text-light'}`}>
              {charCount}{maxCharCount ? `/${maxCharCount}` : ''}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
