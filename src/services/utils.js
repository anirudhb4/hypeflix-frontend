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