const API_URL = 'http://localhost:5000/api'; // URL da sua API

// Interface para o objeto de venda
export interface Sale {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  Client: {
    id: number;
    name: string;
    contact: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
  Product: {
    id: number;
    name: string;
    price: number;
    // outros campos do produto, se necessário
  };
}

// Interface para o objeto de item de estoque
interface StockItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Função para buscar todas as vendas
export async function fetchSales(): Promise<Sale[]> {
  try {
    const response = await fetch(`${API_URL}/sales`);
    if (!response.ok) {
      throw new Error('Erro ao buscar vendas');
    }
    const data: Sale[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Função para criar uma nova venda
export async function createSale(productName: string, quantity: number, totalPrice: number): Promise<Sale | null> {
  try {
    const response = await fetch(`${API_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, quantity, totalPrice }),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar venda');
    }
    const data: Sale = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Função para buscar todos os itens de estoque
export async function fetchStockItems(): Promise<StockItem[]> {
  try {
    const response = await fetch(`${API_URL}/stock-items`);
    if (!response.ok) {
      throw new Error('Erro ao buscar itens de estoque');
    }
    const data: StockItem[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Função para criar um novo item de estoque
export async function createStockItem(name: string, quantity: number, price: number): Promise<StockItem | null> {
  try {
    const response = await fetch(`${API_URL}/stock-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, quantity, price }),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar item de estoque');
    }
    const data: StockItem = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Função para deletar um item de estoque
export async function deleteStockItem(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/stock-items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar item de estoque');
    }
  } catch (error) {
    console.error(error);
    throw error; // Rejoga o erro para ser tratado onde a função for chamada
  }
}

// Função para atualizar um item de estoque
export async function updateStockItem(id: number, name: string, quantity: number, price: number) {
  // Implementação da lógica para atualizar o item de estoque na API
  // Exemplo fictício:
  const response = await fetch(`${API_URL}/stock-items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, quantity, price }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar o item de estoque.');
  }

  return await response.json();
}
