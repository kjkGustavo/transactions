import superjson from 'superjson'

import { createRouter } from './context'
import { transactionRouter } from './transaction'
import { productRouter } from './product'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transaction.', transactionRouter)
  .merge('product.', productRouter)

export type AppRouter = typeof appRouter