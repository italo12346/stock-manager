import React, { useState, useEffect } from 'react';
import Search from '../Search'; // Componente de busca
import Modal from './Modal'; // Modal para edição de item
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Ícones de edição e exclusão
import { deleteStockItem, fetchStockItems } from '../../api/apiService'; // Funções da API para deletar e buscar itens
import { StockItem } from '../../types/StockItem'; // Interface StockItem para tipagem dos dados

const StockListPage: React.FC = () => {
  // Estados do componente
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar se o modal está aberto
  const [stockItems, setStockItems] = useState<StockItem[]>([]); // Estado para armazenar os itens de estoque
  const [itemToEdit, setItemToEdit] = useState<StockItem | undefined>(undefined); // Estado para o item a ser editado
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar a página atual da lista
  const itemsPerPage = 7; // Quantidade de itens por página

  // Efeito para buscar os itens de estoque ao montar o componente
  useEffect(() => {
    async function fetchItems() {
      const items = await fetchStockItems(); // Função para buscar os itens da API
      setStockItems(items); // Atualiza o estado com os itens obtidos da API
    }
    fetchItems(); // Chama a função de busca ao montar o componente
  }, []); // Executa apenas uma vez, pois o array de dependências está vazio

  // Função para abrir o modal de edição/novo item
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal e limpar o item a ser editado
  const closeModal = () => {
    setIsModalOpen(false);
    setItemToEdit(undefined);
  };

  // Função para lidar com a exclusão de um item de estoque
  const handleDelete = async (itemId: number) => {
    try {
      await deleteStockItem(itemId); // Função para deletar o item na API
      // Atualiza a lista de itens de estoque removendo o item deletado
      const updatedItems = stockItems.filter(item => item.id !== itemId);
      setStockItems(updatedItems); // Atualiza o estado com a lista atualizada de itens
      console.log(`Item ${itemId} deletado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar item ${itemId}:`, error);
      // Tratamento de erro, se necessário
    }
  };

  // Função para lidar com a edição de um item de estoque
  const handleEdit = (item: StockItem) => {
    setItemToEdit(item); // Define o item a ser editado
    setIsModalOpen(true); // Abre o modal de edição
  };

  // Cálculo para paginação: número total de páginas e itens visíveis na página atual
  const totalPages = Math.ceil(stockItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = stockItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <h1 className="text-2xl font-bold mb-4">Lista de Estoque</h1>

      {/* Botão de adicionar novo item */}
      <div
        onClick={openModal}
        className="flex items-center justify-center w-6 h-6.5 mb-2 font-bold text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700"
      >
        +
      </div>

      {/* Componente de busca */}
      <Search />

      {/* Tabela de estoque */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Preço Unitário
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-2 font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* Mapeia os itens visíveis para exibição na tabela */}
            {visibleItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-left text-sm leading-5 text-gray-900">{item.id}</div>
                </td>
                <td className="text-left px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{item.name}</div>
                </td>
                <td className="text-left px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{item.quantity}</div>
                </td>
                <td className="text-left px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">R$ {item.price}</div>
                </td>
                <td className="text-left px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex">
                    {/* Botões de edição e exclusão para cada item */}
                    <div
                      onClick={() => handleEdit(item)}
                      className="mr-4 text-blue-500 cursor-pointer hover:text-blue-700"
                    >
                      <FiEdit />
                    </div>
                    <div
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      <FiTrash2 />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controles de navegação para paginação */}
      <div className="flex justify-end my-4">
        {totalPages > 1 && (
          <div className="flex">
            {/* Botões de página anterior e próxima */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mr-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      {/* Modal para adicionar/editar item */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <Modal isOpen={isModalOpen} onClose={closeModal} itemToEdit={itemToEdit} />
        </div>
      )}
    </div>
  );
};

export default StockListPage;
