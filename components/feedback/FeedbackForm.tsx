'use client';

import React, { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface FeedbackFormData {
  name: string;
  email: string;
  experience: string;
  related_content_type: '' | 'blog' | 'quote' | 'video';
  related_content_id: string;
}

interface FeedbackFormErrors {
  name?: string;
  email?: string;
  experience?: string;
  related_content_type?: string;
}

export const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    experience: '',
    related_content_type: '',
    related_content_id: '',
  });

  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Validate individual field
   */
  const validateField = (name: keyof FeedbackFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (value.length > 255) {
          return 'Name must be less than 255 characters';
        }
        break;

      case 'email':
        if (value && value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
          }
          if (value.length > 255) {
            return 'Email must be less than 255 characters';
          }
        }
        break;

      case 'experience':
        if (!value.trim()) {
          return 'Please share your experience';
        }
        if (value.length < 10) {
          return 'Experience must be at least 10 characters';
        }
        if (value.length > 5000) {
          return 'Experience must be less than 5000 characters';
        }
        break;
    }
    return undefined;
  };

  /**
   * Validate all fields
   */
  const validateForm = (): boolean => {
    const newErrors: FeedbackFormErrors = {};

    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.experience = validateField('experience', formData.experience);

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  /**
   * Handle input change with real-time validation
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear submit status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }

    // Real-time validation for the changed field
    if (name === 'name' || name === 'email' || name === 'experience') {
      const error = validateField(name as keyof FeedbackFormData, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Prepare submission data
      const submissionData: any = {
        name: formData.name.trim(),
        experience: formData.experience.trim(),
      };

      // Add optional fields if provided
      if (formData.email.trim()) {
        submissionData.email = formData.email.trim();
      }

      if (formData.related_content_type) {
        submissionData.related_content_type = formData.related_content_type;
        if (formData.related_content_id.trim()) {
          submissionData.related_content_id = formData.related_content_id.trim();
        }
      }

      // Submit to API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit feedback');
      }

      // Success
      setSubmitStatus('success');
      setSubmitMessage('Thank you for sharing your experience! Your feedback has been submitted successfully.');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        experience: '',
        related_content_type: '',
        related_content_id: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle retry after error
   */
  const handleRetry = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-heading font-semibold text-text mb-1">Success!</h3>
              <p className="text-text-light">{submitMessage}</p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6">
          <ErrorMessage
            title="Submission Failed"
            message={submitMessage}
            onRetry={handleRetry}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <Input
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
          required
          disabled={isSubmitting}
          maxLength={255}
        />

        <Input
          label="Email (optional)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@example.com"
          helperText="We'll only use this to follow up if needed"
          disabled={isSubmitting}
          maxLength={255}
        />

        <Textarea
          label="Your Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          placeholder="Share your healing journey, insights, or how our content has helped you..."
          required
          disabled={isSubmitting}
          rows={6}
          showCharCount
          maxCharCount={5000}
          helperText="Minimum 10 characters"
        />

        <div>
          <label htmlFor="related_content_type" className="block mb-1.5 text-sm font-heading font-medium text-text">
            Related Content (optional)
          </label>
          <select
            id="related_content_type"
            name="related_content_type"
            value={formData.related_content_type}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-2 font-body text-text bg-white border border-text/20 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-primary focus:ring-primary"
          >
            <option value="">Select content type</option>
            <option value="blog">Blog Post</option>
            <option value="quote">Quote</option>
            <option value="video">Video</option>
          </select>
          <p className="mt-1.5 text-sm text-text-light">
            Is your feedback related to specific content?
          </p>
        </div>

        {formData.related_content_type && (
          <Input
            label="Content Reference"
            name="related_content_id"
            type="text"
            value={formData.related_content_id}
            onChange={handleChange}
            placeholder="e.g., blog post title, quote author, or video title"
            disabled={isSubmitting}
            helperText="Help us identify which content you're referring to"
          />
        )}

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Feedback'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

FeedbackForm.displayName = 'FeedbackForm';
