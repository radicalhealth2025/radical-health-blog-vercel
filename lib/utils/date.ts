/**
 * Format a date string consistently for both server and client rendering
 * to avoid hydration mismatches
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Use explicit formatting to ensure consistency
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
}

/**
 * Get ISO date string for datetime attribute
 */
export function getISODate(dateString: string): string {
  return new Date(dateString).toISOString().split('T')[0];
}
