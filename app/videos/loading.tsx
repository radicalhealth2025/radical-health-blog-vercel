import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-background rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-background rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* Loading spinner */}
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" label="Loading videos..." />
        </div>
      </div>
    </div>
  );
}
