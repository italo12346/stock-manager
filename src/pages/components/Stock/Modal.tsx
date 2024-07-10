// Modal.tsx

import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { createStockItem, updateStockItem } from '../../api/apiService'; // Importe a função updateStockItem da sua API
export interface StockItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit?: StockItem; // Adiciona propriedade opcional para o item a ser editado
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, itemToEdit }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
      setPrice(itemToEdit.price);
    }
  }, [itemToEdit]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.reload()

    try {
      if (itemToEdit) {
        // Chamar a função para atualizar o item de estoque
        await updateStockItem(itemToEdit.id, name, quantity, price);
        console.log(`Item ${itemToEdit.id} atualizado com sucesso.`);
        window.location.reload();
      } else {
        // Chamar a função para criar o item de estoque
        const newItem = await createStockItem(name, quantity, price);
        console.log('Novo item de estoque criado:', newItem);
        
      }

      onClose(); // Fecha o modal após criar ou atualizar o item com sucesso
    } catch (error) {
      console.error('Erro ao salvar item de estoque:', error);
      // Aqui você pode lidar com o erro, se necessário
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-700 rounded-t-lg">
            <h3 className="text-lg font-bold text-white">{itemToEdit ? 'Editar Item' : 'Cadastrar Novo Item'}</h3>
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
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
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
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
                  placeholder="Preço R$" 
                  value={price} 
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  required
                />
              </div>
              {/* Botão de submit */}
              <button 
                type="submit" 
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                {itemToEdit ? 'Salvar Alterações' : 'Salvar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
