import { useState } from "react";

export const useInput = (initial: string) => {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    bind: { value, onChange },
    value,
    error,
    setError,
  };
};
