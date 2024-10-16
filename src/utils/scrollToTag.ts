export const scrollToTag = (index: number) => {
  const tagElement = document.querySelector(`[data-index="${index}"]`);
  if (tagElement) {
    tagElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};