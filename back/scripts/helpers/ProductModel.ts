class Product {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryStatus: string;
    category: string;
    image?: string;
    rating?: number;
  
    constructor(
      id: number,
      code: string,
      name: string,
      description: string,
      price: number,
      quantity: number,
      inventoryStatus: string,
      category: string,
      image?: string,
      rating?: number
    ) {
      this.id = id;
      this.code = code;
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
      this.inventoryStatus = inventoryStatus;
      this.category = category;
      this.image = image;
      this.rating = rating;
    }
  }

  module.exports = Product;