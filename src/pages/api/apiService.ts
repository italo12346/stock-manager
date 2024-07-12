// api/apiService.ts

import { Sale } from "../types/Sale";
import { StockItem } from "../types/StockItem";
import { Client } from "../types/Client";

const API_URL = 'http://localhost:5000/api'; // URL da sua API

//Função de busca produtos
export async function searchProduct(productName: string) {
  try {
    const response = await fetch(`${API_URL}/stock-items/${productName}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar Produto');
    }
    
    const data = await response.json();
    return data; // Retorna os dados do produto encontrado
  } catch (error) {
    console.error('Ocorreu um erro na busca do produto:');
    throw error;
  }
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
export async function createSale(productName: string, quantity: number, totalPrice: number, clientId?: number): Promise<Sale | null> {
  try {
    const response = await fetch(`${API_URL}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, quantity, totalPrice, clientId }),
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
export async function updateStockItem(id: number, name: string, quantity: number, price: number): Promise<StockItem | null> {
  try {
    const response = await fetch(`${API_URL}/stock-items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, quantity, price }),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar o item de estoque');
    }
    const data: StockItem = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Função para buscar todos os clientes
export async function fetchClients(): Promise<Client[]> {
  try {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) {
      throw new Error('Erro ao buscar clientes');
    }
    const data: Client[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Função para criar um novo cliente
export async function createClient(name: string, contact: string, address: string): Promise<Client | null> {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, address }),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar cliente');
    }
    const data: Client = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Função para atualizar um cliente
export async function updateClient(id: number, name: string, contact: string, address: string): Promise<Client | null> {
  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, address }),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar cliente');
    }
    const data: Client = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Função para excluir um cliente
export async function deleteClient(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir cliente');
    }
  } catch (error) {
    console.error(error);
    throw error; // Rejoga o erro para ser tratado onde a função for chamada
  }
}
