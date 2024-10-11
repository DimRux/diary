export const saveToLocalStorage = <T>(name: string, value: T): void => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const loadFromLocalStorage = (name: string) => {
  const storedValue = localStorage.getItem(name);
  return storedValue ? JSON.parse(storedValue) : null;
};