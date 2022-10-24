import { z } from "zod";
import transactionService from "~/server/services/transaction";
import { createRouter } from "~/server/router/context";

export const transactionRouter = createRouter()
  .mutation("upload", {
    input: z.object({
      transactionFile: z.string(),
    }),
    async resolve({ input }) {
      const transactionsBase64 = Buffer.from(
        input.transactionFile.split("base64,")[1],
        "base64"
      ).toString(); // TODO: Change to form data

      return transactionService.createTransactions(transactionsBase64);
    },
  }).query("getAll", {
    async resolve() {
      return transactionService.getAllTransactions();
    },
  });