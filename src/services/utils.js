export const formatReleaseDate = (dateString) => {
  if (!dateString) {
    return "TBA"; // To Be Announced
  }

  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original if formatting fails
  }
};

// This is a powerful built-in browser API to format numbers
// e.g., 10500 -> "10.5K", 1000000 -> "1M"
export const formatCompact = (number) => {
  if (typeof number !== 'number') {
    return '...';
  }
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(number);
};