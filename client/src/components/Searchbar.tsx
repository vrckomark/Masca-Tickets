import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  onDebouncedChange?: (search: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onDebouncedChange }) => {
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

  return (
    <div className="flex items-center p-6 rounded-xl text-2xl bg-white gap-6 bg-opacity-5 hover:bg-opacity-10 transition-all w-1/2">
      <FaSearch className="text-white text-opacity-50" />
      <input
        type="text"
        placeholder="Search events"
        className="bg-transparent text-white text-opacity-75 w-full h-full outline-none"
        value={input}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Searchbar;
