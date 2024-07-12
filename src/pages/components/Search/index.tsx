import { useState, ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchProduct } from '../../api/apiService'; // Importe a função searchProduct e o tipo Product aqui
import {StockItem} from '../../types/StockItem'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<StockItem | null>(null); // Estado para armazenar o resultado da busca

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await searchProduct(searchTerm); // Chama a função de busca com o termo digitado
      setSearchResult(result); // Armazena o resultado da busca no estado
      console.log('Resultado da busca:', result);
    } catch (error) {
      console.error('Erro ao buscar produto:');
      // Trate o erro de busca aqui, se necessário
    }
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
      {searchResult && (
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Resultado da Busca:</h2>
          <p><strong>Nome:</strong> {searchResult.name}</p>
          {/* Adicione mais informações do produto conforme necessário */}
        </div>
      )}
    </form>
  );
};

export default Search;
