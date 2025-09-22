const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  const item = localStorage.getItem(key);
  try {
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(key);
};

export { getLocalStorage, setLocalStorage, removeLocalStorage };
