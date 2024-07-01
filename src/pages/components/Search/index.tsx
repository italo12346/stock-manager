import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para enviar o termo de pesquisa para a API ou realizar a ação desejada
    console.log('Termo de pesquisa:', searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
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
