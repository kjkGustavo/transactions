import { Type } from "@prisma/client";
import { z } from "zod";
import { prisma } from "~/server/db/prisma";
import productService from "./product";
import sellerService from "./seller";

type TransactionDTO = {
  type: number;
  date: Date;
  productName: string;
  amount: string;
  sellerName: string;
};

const transactionTypeEnum = {
  1: Type.CREATOR_SALE,
  2: Type.AFFILIATE_SALE,
  3: Type.COMMISSION_PAID,
  4: Type.COMMISSION_RECEIVED,
};

const TransactionSchema = z.object({
  type: z.number(),
  date: z.any(),
  productName: z.string(),
  amount: z.string().min(1),
  sellerName: z.string().min(1)
})

const parseToTransaction = (transactionLine: string) => {
  const transaction = {
    type: parseInt(transactionLine.charAt(0)),
    date: new Date(transactionLine.substring(1, 26)),
    productName: transactionLine.substring(26, 56).trimEnd(),
    amount: transactionLine.substring(56, 66),
    sellerName: transactionLine.substring(66).trimEnd(),
  };

  if(!TransactionSchema.safeParse(transaction).success) {
    throw new Error('The file formatting is invalid, try again')
  }

  return transaction;
}

const parseTransactions = (transactionFile: string): TransactionDTO[] => {
  const transactionsChunks = transactionFile
    .split("\n")
    .filter((line) => line.length > 0);

  const transactionsData = transactionsChunks.map((transaction) => parseToTransaction(transaction));

  return transactionsData;
};

const createTransactionsRelations = async (transactions: TransactionDTO[]) => {
  const transactionsRelations = await Promise.all(
    transactions
      .sort((a, b) => a.type - b.type)
      .map(async (transaction) => {
        const seller = await sellerService.findByNameOrCreate(
          transaction.sellerName
        );
        const product = await productService.findByNameOrCreate(
          transaction.productName,
          seller.id
        );
        return {
          date: transaction.date,
          amount: transaction.amount,
          productId: product.id,
          sellerId: seller.id,
          type: transactionTypeEnum[
            transaction.type as keyof typeof transactionTypeEnum
          ],
        };
      })
  );

  return transactionsRelations;
};

const createTransactions = async (transactionFile: string) => {
  const transactionsData = parseTransactions(transactionFile);
  const transactions = await createTransactionsRelations(transactionsData);

  return prisma.transaction.createMany({
    data: transactions,
  });
};

const getAllTransactions = async () => {
  return prisma.transaction.findMany();
}

const transactionService = {
  createTransactions,
  parseTransactions,
  parseToTransaction,
  createTransactionsRelations,
  getAllTransactions
};

export default transactionService;