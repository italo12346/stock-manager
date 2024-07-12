
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { fetchStockItems, createSale, fetchClients } from '../../api/apiService';
import { Client } from '../../types/Client';
import Cart from '../Cart';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const SalesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const stockItems = await fetchStockItems();
        setProducts(stockItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })));

        // Aqui você pode buscar os clientes
        const clientsData = await fetchClients();
        setClients(clientsData);
      } catch (error) {
        console.error('Erro ao buscar itens de estoque ou clientes:', error);
      }
    }

    fetchData();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product: Product) => {
    const isInCart = cart.find(item => item.id === product.id);

    if (isInCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedProduct = { ...product, quantity: 1 };
      setCart([...cart, updatedProduct]);
    }
  };

  const handleRemoveFromCart = (product: Product) => {
    const isInCart = cart.find(item => item.id === product.id);

    if (isInCart && isInCart.quantity > 1) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter(item => item.id !== product.id);
      setCart(updatedCart);
    }
  };

  const handleClientChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const clientId = parseInt(event.target.value);
    const client = clients.find(client => client.id === clientId);
    setSelectedClient(client || null);
  };

  const handleSaleSubmit = async () => {
    if (cart.length === 0) {
      alert('Adicione itens ao carrinho antes de finalizar a venda.');
      return;
    }

    if (!selectedClient) {
      alert('Selecione um cliente antes de finalizar a venda.');
      return;
    }

    const totalSale = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    try {
      // Aqui você passa o nome do primeiro produto no carrinho e o ID do cliente selecionado
      await createSale(cart[0].name, cart.length, totalSale, selectedClient.id);

      console.log("Venda realizada:", cart);
      console.log("Valor total da venda:", totalSale.toFixed(2));
      setCart([]);
      alert('Venda realizada com sucesso!');
      window.location.reload()

      // Atualiza a página após a venda ser finalizada (opcional)
      // window.location.reload();
    } catch (error) {
      console.error('Erro ao realizar venda:', error);
      alert('Erro ao realizar venda. Por favor, tente novamente.');
    }
  };

  // Filtra os produtos com base no searchTerm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Página de Vendas</h1>

      {/* Formulário de Pesquisa */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Pesquisar Produto
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Tabela de Produtos */}
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome do Produto
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preço
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="text-left px-6 py-4 whitespace-nowrap">{product.id}</td>
              <td className="text-left px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="text-left px-6 py-4 whitespace-nowrap">R$ {product.price.toFixed(2)}</td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Adicionar
                </button>
                {cart.find(item => item.id === product.id) && (
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Seleção de Cliente */}
      <div className="mb-4">
        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
         <h3> Selecionar Cliente</h3>
        </label>
        <select
          id="client"
          value={selectedClient ? selectedClient.id.toString() : ''}
          onChange={handleClientChange}
          className="bg-gray-200 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  rounded-md"
        >
          <option value="">Selecione um cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id.toString()}>{client.name}</option>
          ))}
        </select>
      </div>

      {/* Carrinho de Compras */}
      <Cart cart={cart} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} onSubmit={handleSaleSubmit} />
    </div>
  );
};

export default SalesPage;

