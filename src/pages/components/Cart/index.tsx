import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: Product[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  onSubmit: () => void; // Adiciona a propriedade onSubmit
}

const Cart: React.FC<CartProps> = ({ cart, handleAddToCart, handleRemoveFromCart, onSubmit }) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div>
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
        </div>
      )}
      
      {/* Botão de Finalizar Venda */}
      {cart.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Finalizar Venda
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
