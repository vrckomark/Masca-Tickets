import { useEffect, useState } from "react";

export const useSearchbar = (onDebouncedChange?: (search: string) => void) => {
  const [input, setInput] = useState<string>("");

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  useEffect(() => {
    if (!onDebouncedChange) return;
    const timeout = setTimeout(() => {
      onDebouncedChange(input);
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  return { input, onInputChange };
};
