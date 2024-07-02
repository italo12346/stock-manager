import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { updateStockItem } from '../../api/apiService'; // Importe a função updateStockItem da sua API

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: StockItem; // Informações iniciais do item a ser editado
}

interface StockItem {
  id?: number; // O ID pode ser opcional para novos itens
  name: string;
  quantity: number;
  price: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, initialItem }) => {
  const [editedItem, setEditedItem] = useState<StockItem>({
    name: '',
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (initialItem) {
      setEditedItem({
        name: initialItem.name,
        quantity: initialItem.quantity,
        price: initialItem.price,
      });
    }
  }, [initialItem]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      // Atualiza o item de estoque utilizando a função da API
      const updatedItem = await updateStockItem(initialItem!.id!, editedItem); // Use o ID do item existente
      console.log('Item de estoque atualizado:', updatedItem);
      
      onClose(); // Fecha o modal após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar item de estoque:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-700 rounded-t-lg">
            <h3 className="text-lg font-bold text-white">{initialItem ? 'Editar Item' : 'Cadastrar Novo Item'}</h3>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-gray-500 focus:outline-none"
            >
              <AiOutlineClose className='font-bold'/>
            </button>
          </div>
          <div className="p-4">
            {/* Formulário de cadastro de item */}
            <form onSubmit={handleFormSubmit}>
              {/* Campos do formulário */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">Nome:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="pl-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                  placeholder="Nome" 
                  value={editedItem.name} 
                  onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-left text-sm font-medium text-gray-700">Quantidade:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  name="quantity" 
                  className="pl-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                  placeholder="Quantidade" 
                  value={editedItem.quantity} 
                  onChange={(e) => setEditedItem({ ...editedItem, quantity: parseInt(e.target.value, 10) })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-left text-sm font-medium text-gray-700">Preço Unitário:</label>
                <input 
                  type="number" 
                  id="price" 
                  name="price" 
                  className="pl-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                  placeholder="Preço" 
                  value={editedItem.price} 
                  onChange={(e) => setEditedItem({ ...editedItem, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              {/* Botão de submit */}
              <button 
                type="submit" 
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                {initialItem ? 'Atualizar' : 'Salvar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
