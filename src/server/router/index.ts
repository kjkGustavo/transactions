import superjson from 'superjson'

import { createRouter } from './context'
import { transactionRouter } from './transaction'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transaction.', transactionRouter)

export type AppRouter = typeof appRouter