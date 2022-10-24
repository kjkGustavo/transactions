import superjson from 'superjson'

import { createRouter } from './context'
import { transactionRouter } from './transaction'
import { productRouter } from './product'
import { statusRouter } from './status'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transaction.', transactionRouter)
  .merge('product.', productRouter)
  .merge('status.', statusRouter)

export type AppRouter = typeof appRouter