import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Pesquisar por nome do produto..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 flex-grow"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          <FaSearch className="inline-block mr-2" />
          Pesquisar
        </button>
      </div>
    </form>
  );
};

export default Search;
