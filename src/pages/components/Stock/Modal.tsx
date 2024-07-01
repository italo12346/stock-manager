import React from 'react';

import { RxCross1 } from "react-icons/rx";
import { AiOutlineClose } from 'react-icons/ai'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-lg mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-700 rounded-t-lg">
            <h3 className="text-lg font-bold text-white">Cadastrar Novo Item</h3>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-gray-500 focus:outline-none"
            >
              <AiOutlineClose className='font-bold'/>
            </button>
          </div>
          <div className="p-4">
            {/* Formulário de cadastro de item */}
            {/* Aqui você pode adicionar os campos necessários para cadastrar um novo item */}
            <form>
              {/* Campos do formulário */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">Nome:</label>
                <input type="text" id="name" name="name" className="pl-2 mt-1 block w-full   border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder='Nome :'/>
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-left text-sm font-medium text-gray-700">Quantidade:</label>
                <input type="number" id="quantity" name="quantity" className="pl-2 mt-1 block w-full  border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder='Quantidade :' />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-left text-sm font-medium text-gray-700">Preço Unitário:</label>
                <input type="number" id="price" name="price" className="pl-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder='Preço :' />
              </div>
              {/* Botão de submit */}
              <button type="submit" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
