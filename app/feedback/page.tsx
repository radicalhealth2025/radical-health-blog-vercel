import { Metadata } from 'next';
import { generateFeedbackMetadata } from '@/lib/seo';
import { FeedbackForm } from '@/components/feedback';

export const metadata: Metadata = generateFeedbackMetadata();

export default function FeedbackPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text mb-4">
            Share Your Experience
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Your healing journey matters. Share your story, insights, or how our content has 
            supported your transformation. Your experience can inspire and guide others on their path.
          </p>
        </div>

        {/* Why Share Section */}
        <div className="bg-accent rounded-lg p-6 mb-10">
          <h2 className="text-xl font-heading font-semibold text-text mb-3">
            Why Share Your Story?
          </h2>
          <ul className="space-y-2 text-text-light">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Help others feel less alone in their healing journey</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Contribute to a supportive community of healing</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Provide valuable feedback to improve our content</span>
            </li>
          </ul>
        </div>

        {/* Feedback Form */}
        <FeedbackForm />

        {/* Privacy Note */}
        <div className="mt-8 text-center text-sm text-text-light">
          <p>
            Your feedback will be reviewed before being shared publicly. We respect your privacy 
            and will never share your email address without permission.
          </p>
        </div>
      </div>
    </main>
  );
}
