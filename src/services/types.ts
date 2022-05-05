export interface Product {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

export interface User {
  name: string,
  password: string
}

export interface CartProduct {
  productId: number,
  quantity: number
}
