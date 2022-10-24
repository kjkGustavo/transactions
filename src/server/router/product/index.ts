import productService from '~/server/services/product';
import { createRouter } from '~/server/router/context'
import { z } from 'zod';

export const productRouter = createRouter()
  .query("getAll", {
    async resolve() {
      return productService.getAll();
    },
  }).query("getTransactionsOfProducts", {
    input: z.object({
      productId: z.number(),
    }),
    async resolve({ input }) {
      const response = await productService.getProductWithTransactions(
        input.productId
      );

      return response;
    },
  })