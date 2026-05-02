
import { useState } from 'react';
import type { JSX } from 'react';

type SearchFieldProps = {
  onSearch: (keyword: string) => void;
}

const SearchField = ({ onSearch }: SearchFieldProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search news..."
        value={searchValue}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchField
