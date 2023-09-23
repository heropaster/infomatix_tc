export const generatePageNumbers = (totalPages: number) => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };