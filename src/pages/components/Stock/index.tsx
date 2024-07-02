import React, { useState, useEffect } from 'react';
import Search from '../Search';
import Modal from './Modal';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteStockItem, fetchStockItems } from '../../api/apiService'; // Importe suas funções da API

interface StockItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const StockListPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialItem, setModalInitialItem] = useState<StockItem | undefined>(undefined);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const items = await fetchStockItems();
      setStockItems(items);
    }
    fetchItems();
  }, []); // Chama apenas uma vez ao carregar o componente

  const openModal = (item?: StockItem) => {
    setIsModalOpen(true);
    setModalInitialItem(item); // Define o item inicial para edição
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalInitialItem(undefined); // Limpa o item inicial ao fechar o modal
  };

  // Função para lidar com a exclusão de um item de estoque
  const handleDelete = async (itemId: number) => {
    try {
      await deleteStockItem(itemId);
      // Atualizar a lista de itens de estoque após a exclusão
      const updatedItems = stockItems.filter(item => item.id !== itemId);
      setStockItems(updatedItems);
      console.log(`Item ${itemId} deletado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao deletar item ${itemId}:`, error);
      // Aqui você pode lidar com o erro, se necessário
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8`}>
      <h1 className="text-2xl font-bold mb-4">Lista de Estoque</h1>
      
      {/* Botão de adicionar novo item */}
      <div
        onClick={() => openModal()}
        className="flex items-center justify-center w-6 h-6.5 mb-2 font-bold text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700"
      >
        +
      </div>

      {/* Componente de busca */}
      <Search/>

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
            {stockItems.map((item) => (
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
                  <div className="text-sm leading-5 text-gray-900">{item.price}</div>
                </td>
                <td className="text-left px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex">
                    <div
                      onClick={() => openModal(item)} // Abre o modal com o item para edição
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

      {/* Modal para cadastrar ou editar item */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <Modal isOpen={isModalOpen} onClose={closeModal} initialItem={modalInitialItem} />
        </div>
      )}
    </div>
  );
};

export default StockListPage;
