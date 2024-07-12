import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { fetchClients, createClient, deleteClient } from '../../api/apiService';
import { Client } from '../../types/Client';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import EditClientModal from './EditClientModal';
import InputMask from 'react-input-mask';

const ClientPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContactChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newClient = await createClient(name, contact, address);
      if (newClient) {
        setClients([...clients, newClient]);
        setName('');
        setContact('');
        setAddress('');
        alert('Cliente criado com sucesso!');
      } else {
        alert('Erro ao criar cliente. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      alert('Erro ao criar cliente. Por favor, tente novamente.');
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = async (clientId: number) => {
    try {
      await deleteClient(clientId);
      setClients(clients.filter(client => client.id !== clientId));
      alert('Cliente excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente. Por favor, tente novamente.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    if (!editingClient) return;

    const updatedClients = clients.map(client =>
      client.id === updatedClient.id ? updatedClient : client
    );
    setClients(updatedClients);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Página de Clientes</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-1 sm:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              className="px-4 py-2 uppercase tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              placeholder="Nome do Cliente"
            />
          </div>
          <div className="col-span-1 sm:col-span-1">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contato
            </label>
            <InputMask
              mask="(99) 99999-9999"
              type="text"
              id="contact"
              value={contact}
              onChange={handleContactChange}
              required
              className="px-4 py-2 uppercase tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 flex-grow"
              placeholder="Contato do Cliente"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              required
              className="px-4 py-2 uppercase tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full"
              placeholder="Endereço do Cliente"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-block mt-4 px-4 py-2 uppercase tracking-wider text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
        >
          Criar Cliente
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Lista de Clientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contato
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Endereço
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-left whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 text-left whitespace-nowrap">{client.contact}</td>
                  <td className="px-6 py-4 text-left whitespace-nowrap">{client.address}</td>
                  <td className="px-6 py-4 text-left whitespace-nowrap">
                    <div className="flex">
                      <div
                        onClick={() => handleEdit(client)}
                        className="mr-4 text-blue-500 cursor-pointer hover:text-blue-700"
                      >
                        <FiEdit />
                      </div>
                      <div
                        onClick={() => handleDelete(client.id)}
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
      </div>

      {/* Modal de Edição */}
      <EditClientModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        client={editingClient}
        onUpdate={handleUpdateClient}
      />
    </div>
  );
};

export default ClientPage;
