export const clsx = (
  ...classNames: (string | boolean | null | undefined | { [key: string]: boolean })[]
): string => {
  const classesList: string[] = [];

  for (const className of classNames) {
    if (typeof className === 'string') {
      classesList.push(className);
    } else if (typeof className === 'object' && className !== null) {
      for (const key in className) {
        if (className[key]) {
          classesList.push(key);
        }
      }
    } else if (className) {
      continue;
    }
  }

  return classesList.join(' ');
};