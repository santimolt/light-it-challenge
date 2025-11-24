import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { Button } from './Button';

interface SearchBarProps {
  /** Current search query value */
  value: string;
  /** Callback when search query changes */
  onChange: (value: string) => void;
  /** Whether the search bar is loading */
  isLoading?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  isLoading = true,
}: SearchBarProps) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <MagnifyingGlassIcon
          size={20}
          weight="bold"
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${isLoading ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
        />
        <input
          type="text"
          value={value}
          disabled={isLoading}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search patients by name..."
          className="w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {value && (
          <Button
            variant="icon-ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 rounded-full p-1"
            aria-label="Clear search"
          >
            <XIcon size={18} weight="bold" />
          </Button>
        )}
      </div>
    </div>
  );
};
