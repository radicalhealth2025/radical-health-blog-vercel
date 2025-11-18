import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, padding = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'bg-white rounded-lg shadow-md transition-all duration-200';
    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
    
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    
    const classes = `${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`;
    
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
