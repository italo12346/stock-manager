import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import { Client } from '../../types/Client';
import { updateClient } from '../../api/apiService';
import InputMask from 'react-input-mask';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onUpdate: (updatedClient: Client) => void;
}

const EditClientModal: React.FC<Props> = ({ isOpen, onClose, client, onUpdate }) => {
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (client) {
      setName(client.name);
      setContact(client.contact);
      setAddress(client.address);
    }
  }, [client]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleUpdateClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!client) return;

    try {
      const updatedClient = await updateClient(client.id, name, contact, address);
      if (updatedClient) {
        onUpdate(updatedClient);
        onClose();
        setName('');
        setContact('');
        setAddress('');
        alert('Cliente atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar cliente. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente. Por favor, tente novamente.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
      contentLabel="Editar Cliente"
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
        <form onSubmit={handleUpdateClient}>
          <div className="mb-4">
            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="modal-name"
              value={name}
              onChange={handleNameChange}
              required
              className="px-4 py-2 uppercase tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              placeholder="Nome do Cliente"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="modal-contact" className="block text-sm font-medium text-gray-700">
              Contato
            </label>
            <InputMask
            mask={"(99)9 9999-9999"}
              type="text"
              id="modal-contact"
              value={contact}
              onChange={handleContactChange}
              required
              className="px-4 py-2 uppercase tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              placeholder="Contato do Cliente"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="modal-address" className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              id="modal-address"
              value={address}
              onChange={handleAddressChange}
              required
              className="px-4 py-2 uppercase tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              placeholder="Endereço do Cliente"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm leading-5 font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:border-gray-400 focus:shadow-outline-gray active:bg-gray-400 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm leading-5 font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditClientModal;
