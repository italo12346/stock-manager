import React, { useEffect, useState } from 'react';
import { fetchSales, Sale } from '../../api/apiService'; // Substitua pelo caminho correto do seu arquivo

const HistoryPage: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await fetchSales();
                setSales(salesData);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="history p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Vendas</h1>
            <ul>
                {sales.map((sale) => (
                    <li key={sale.id} className="border-b border-gray-200 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">{sale.productName}</p>
                                <p className="text-sm text-gray-600">Preço: R$ {sale.totalPrice}</p>
                                <p className="text-sm text-gray-600">Quantidade: {sale.quantity}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Cliente: {sale.Client.name}</p>
                                <p className="text-sm text-gray-600">Produto: {sale.Product.name}</p>
                                <p className="text-sm text-gray-600">Preço do Produto: R$ {sale.Product.price}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryPage;
