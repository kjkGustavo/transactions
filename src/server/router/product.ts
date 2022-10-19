import productService from '../services/product';
import { createRouter } from './context'

export const productRouter = createRouter()
  .query("getAll", {
    async resolve() {
      return productService.getAll();
    },
  })