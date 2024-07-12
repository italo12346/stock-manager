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
    };
    Product: {
      id: number;
      name: string;
      quantity:number;
      price: number;
    };
  }
  