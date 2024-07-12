import { useState } from 'react';
import { FaCartArrowDown, FaBoxOpen, FaUser, FaHistory } from 'react-icons/fa';
import SalesPage from '../Sell';
import StockListPage from '../Stock';
import HistoryPage from '../History';
import ClientPage from '../Client';

const NavigationButtons = () => {
  const [currentPage, setCurrentPage] = useState<string>('');

  const changePage = (page: string) => {
    setCurrentPage(page === currentPage ? '' : page);
  };

  const isActive = (page: string) => {
    return currentPage === page ? 'block' : 'hidden';
  };

  return (
    <div className="mx-auto max-w-4xl text-center mt-20 space-x-4">
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => changePage('sales')}
          className={`flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        >
          <FaCartArrowDown className="mr-2" />
          Vendas
        </button>
        <button
          onClick={() => changePage('stock')}
          className={`flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
        >
          <FaBoxOpen className="mr-2" />
          Estoque
        </button>
        <button
          onClick={() => changePage('client')}
          className={`flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded`}
        >
          <FaUser className="mr-2" />
          Clientes
        </button>
        <button
          onClick={() => changePage('history')}
          className={`flex items-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded`}
        >
          <FaHistory className="mr-2" />
          Histórico
        </button>
      </div>

      <div className={`container mx-auto px-4 py-8 max-w-4xl`}>
        <div className={`mt-4 ${isActive('sales')}`}>
          <SalesPage />
        </div>
        <div className={`mt-4 ${isActive('stock')}`}>
          <StockListPage />
        </div>
        <div className={`mt-4 ${isActive('client')}`}>
          <ClientPage />
        </div>
        <div className={`mt-4 ${isActive('history')}`}>
          <HistoryPage />
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;