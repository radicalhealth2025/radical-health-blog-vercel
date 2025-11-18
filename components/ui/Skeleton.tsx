import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Specific skeleton components for common use cases

export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton variant="rectangular" height={192} className="w-full" />
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton width={80} height={24} className="rounded-full" />
        <Skeleton width={80} height={20} />
      </div>
      <Skeleton height={28} className="mb-2" />
      <Skeleton height={28} width="80%" className="mb-4" />
      <Skeleton height={20} className="mb-2" />
      <Skeleton height={20} className="mb-2" />
      <Skeleton height={20} width="60%" className="mb-4" />
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Skeleton width={100} height={20} />
        <Skeleton width={120} height={20} />
      </div>
    </div>
  </div>
);

export const VideoCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Skeleton variant="rectangular" height={200} className="w-full aspect-video" />
    <div className="p-4">
      <Skeleton height={24} className="mb-2" />
      <Skeleton height={24} width="70%" className="mb-3" />
      <Skeleton height={16} className="mb-2" />
      <Skeleton height={16} width="80%" className="mb-3" />
      <Skeleton width={100} height={24} className="rounded-full" />
    </div>
  </div>
);

export const QuoteCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <Skeleton height={40} width={40} className="mb-3" />
    <Skeleton height={20} className="mb-2" />
    <Skeleton height={20} className="mb-2" />
    <Skeleton height={20} width="90%" className="mb-4" />
    <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-200">
      <Skeleton width={120} height={20} />
      <Skeleton width={80} height={24} className="rounded-full" />
    </div>
  </div>
);

