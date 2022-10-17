import { z } from 'zod'
import { createRouter } from './context'

export const transactionRouter = createRouter()
.query("hello", {
  input: z
    .object({
      text: z.string(),
    }),
  resolve({ input }) {
    return {
      greeting: `Hello ${input?.text ?? "world"}`,
    };
  },
})
.query("getAll", {
  async resolve({ ctx }) {
    return [];
  },
});