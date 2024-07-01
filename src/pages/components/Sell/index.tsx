import React, { useState } from 'react';
import Search from '../Search';
import stockItems from '@/pages/api/Produtos'; // Exemplo de dados de produtos (substitua com dados reais vindo da API)

// Interface para os itens de estoque
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number; // Adicionamos a quantidade para refletir o estoque
}

const SalesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(stockItems); // Inicializamos com os produtos vindo da API
  const [cart, setCart] = useState<Product[]>([]); // Carrinho de compras

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Aqui você pode adicionar a lógica para buscar os produtos da API conforme o termo de pesquisa
  };

  const handleAddToCart = (product: Product) => {
    // Verifica se o produto já está no carrinho
    const isInCart = cart.find(item => item.id === product.id);

    if (isInCart) {
      // Se estiver no carrinho, incrementa a quantidade
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Se não estiver no carrinho, adiciona com quantidade 1
      const updatedProduct = { ...product, quantity: 1 };
      setCart([...cart, updatedProduct]);
    }
  };

  const handleRemoveFromCart = (product: Product) => {
    // Verifica se o produto está no carrinho
    const isInCart = cart.find(item => item.id === product.id);

    if (isInCart && isInCart.quantity > 1) {
      // Se a quantidade for maior que 1, decrementa a quantidade
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Se a quantidade for 1, remove o produto do carrinho
      const updatedCart = cart.filter(item => item.id !== product.id);
      setCart(updatedCart);
    }
  };

  const handleSaleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica para finalizar a venda
    console.log("Venda realizada:", cart);
    // Limpa o carrinho após finalizar a venda
    setCart([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Página de Vendas</h1>

      {/* Formulário de Pesquisa */}
      <Search />

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
          {products.map((product) => (
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
        <h2 className="text-xl font-bold mb-2">Carrinho de Compras</h2>
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
          <form onSubmit={handleSaleSubmit} className="mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
              Finalizar Venda
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
