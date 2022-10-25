# API Documentation

## Database

[![Página inicial da aplicação][database-erd]](#)

Credits: https://prisma-erd.simonknott.de/

[database-erd]: ./images/prisma-erd.png

---

## Enums

```ts
enum Type {
  CREATOR_SALE
  AFFILIATE_SALE
  COMMISSION_PAID
  COMMISSION_RECEIVED
}
```

## Routes

### Transaction Route

#### `transaction.upload` (mutation)

- **Input**

  - `transactionFile: String` // Base64 (Motivo explicado aqui)

- **Output**

```ts
[{
  id: number
  type: Type
  amount: string
  date: Date
  productId: number
  sellerId: number
}]
```

#### `transaction.getAll` (query)

- **Output**

```ts
[{
  id: number
  type: Type
  amount: string
  date: Date
  productId: number
  sellerId: number
}]
```

### Status Route

#### `status.getAnalytics` (query)

- **Output**

```ts
{
  products: number
  sellers: number
  transactions: number
}
```

### Product Route

#### `product.getAll` (query)

- **Output**

```ts
[{
  id: number
  name: string
  sellerId: number
  creator: {
    id: number
    name: string
  }
}]
```

#### `product.getTransactionsOfProducts` (query)

- **Input**

  - `productId: Number`

- **Output**

```ts
{
  id: number
  name: string
  sellerId: number
  Transaction: [{
    id: number
    type: Type
    amount: string
    date: Date
    productId: number
    sellerId: number
    seller: {
      id: number
      name: string
    }
  }]
}
```
