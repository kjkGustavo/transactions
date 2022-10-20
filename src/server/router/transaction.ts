import { z } from 'zod'
import transactionService from '../services/transaction';
import { createRouter } from './context'

export const transactionRouter = createRouter()
  .query("getAllOfProducts", {
    input: z.object({
      productId: z.number(),
    }),
    async resolve({ input }) {
      return transactionService.getAllTransactions(input.productId);
    },
  }).mutation('upload', {
    input: z
      .object({
        transactionFile: z.string(),
      }),
    async resolve({ input }) {
      const transactionsBase64 = new Buffer(input.transactionFile.split('base64,')[1], 'base64').toString() // TODO: Change to form data

      return transactionService.createTransactions(transactionsBase64)
    }
  });