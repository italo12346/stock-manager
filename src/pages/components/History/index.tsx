import React, { useEffect, useState } from 'react';
import { fetchSales } from '../../api/apiService';
import { Sale } from '@/pages/types/Sale';

const HistoryPage: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const salesData = await fetchSales();
        setSales(salesData);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    }

    fetchSalesData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Histórico de Vendas</h1>

      {/* Tabela de Vendas */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID do Produto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade do Produto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço do Produto
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap">{sale.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">R$ {sale.totalPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.Client?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.Product?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.Product?.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">R$ {sale.Product?.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
