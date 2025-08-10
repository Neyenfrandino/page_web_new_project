import { useSearchParams } from 'react-router-dom';

export const useQueryParam = (key) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key);

  const setValue = (newValue) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (newValue === null || newValue === undefined || newValue === '') {
      updatedParams.delete(key);
    } else {
      updatedParams.set(key, newValue);
    }
    setSearchParams(updatedParams);
  };

  const remove = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete(key);
    setSearchParams(updatedParams);
  };

  return [value, setValue, remove];
};
