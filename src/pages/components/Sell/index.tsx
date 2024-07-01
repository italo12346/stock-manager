import React, { useState, ChangeEvent, FormEvent } from 'react';
import Search from '../Search';
import stockItems from '@/pages/api/Produtos';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const SalesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(stockItems);
  const [cart, setCart] = useState<Product[]>([]);

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

  const handleSaleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const totalSale = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log("Venda realizada:", cart);
    console.log("Valor total da venda:", totalSale.toFixed(2));
    setCart([]);
  };

  // Filtra os produtos com base no searchTerm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Página de Vendas</h1>

      {/* Formulário de Pesquisa */}
      <Search/>

      {/* Tabela de Produtos */}
      <table className="min-w-full divide-y divide-gray-200 mt-4">
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

      {/* Carrinho de Compras */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Carrinho de Compras ({cart.reduce((total, item) => total + item.quantity, 0)})</h2>
        <ul className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-4 py-2">
              <div>{item.name}</div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="mr-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="text-lg font-semibold">Total da Venda: R$ {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
            <form onSubmit={handleSaleSubmit} className="mt-4">
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                Finalizar Venda
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
