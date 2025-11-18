import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function QuotesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-light/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Loading spinner */}
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    </div>
  );
}
