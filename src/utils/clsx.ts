export const clsx = (
  ...classNames: (string | boolean | null | undefined)[]
): string => {
  const classesList = [...classNames].filter(Boolean);
  return classesList.join(' ');
};
