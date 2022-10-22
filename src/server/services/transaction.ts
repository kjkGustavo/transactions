import { Type } from "@prisma/client";
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

const parseTransactions = (transactionFile: string): TransactionDTO[] => {
  const transactionsChunks = transactionFile
    .split("\n")
    .filter((line) => line.length > 0);

  const transactionsData = transactionsChunks.map((transaction) => ({
    type: parseInt(transaction.charAt(0)),
    date: new Date(transaction.substring(1, 26)),
    productName: transaction.substring(26, 56).trimEnd(),
    amount: transaction.substring(56, 66),
    sellerName: transaction.substring(66).trimEnd(),
  }));

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
        const date = new Date(transaction.date);
        return {
          date,
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

const getAllOfProducts = async (productId: number) => {
  return prisma.transaction.findMany({
    include: {
      seller: true,
    },
    where: {
      productId,
    },
    orderBy: {
      date: "desc",
    },
  });
};

const transactionService = {
  createTransactions,
  getAllOfProducts,
};

export default transactionService;