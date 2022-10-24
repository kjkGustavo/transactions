import transactionService from '../../services/transaction';
import { faker } from '@faker-js/faker';
import { inferMutationInput } from '../../../utils/trpc';
import { appRouter } from '..';
import { createContextInner } from '../context';

const mockTransaction = (base64FakeFile = false) => {
  const type = faker.datatype.number({
    min: 1,
    max: 4,
  });
  const date = '2022-03-03T13:12:16-03:00';
  const product = faker.datatype.string(30)
  const amount = faker.random.numeric(10);
  const seller = faker.random.numeric(20);
  const transactionLine = String(type + date + product + amount + seller);

  return base64FakeFile ? 'data:text/plain;base64,' + Buffer.from(transactionLine).toString('base64') : transactionLine
}

describe("create transactions by file", () => {
  it("should parse input file and create transactions", async () => {
    transactionService.createTransactions(mockTransaction());

    await transactionService.createTransactions(mockTransaction())
  })
})

describe("parse input transaction file", () => {
  it("should return correct format", () => {
    const transaction = transactionService.parseToTransaction(mockTransaction());

    expect(transaction).toHaveProperty('type');
    expect(transaction).toHaveProperty('date');
    expect(transaction).toHaveProperty('amount');
    expect(transaction).toHaveProperty('productName');
    expect(transaction).toHaveProperty('sellerName');
  })
  it("should return an array", () => {
    const transactionsData = transactionService.parseTransactions(mockTransaction())

    expect(transactionsData).toBeInstanceOf(Array)
    expect(transactionsData.length).toBeGreaterThan(0)
    expect(transactionsData[0]).toHaveProperty('type');
    expect(transactionsData[0]).toHaveProperty('date');
    expect(transactionsData[0]).toHaveProperty('amount');
    expect(transactionsData[0]).toHaveProperty('productName');
    expect(transactionsData[0]).toHaveProperty('sellerName');
  })
  it("should throw error if transaction line is incorrect", () => {
    expect(() => transactionService.parseTransactions(mockTransaction().substring(0, 10))).toThrow()
  })
})

describe("transaction trpc", () => {
  it("should caller transaction.upload", async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);
  
    const input: inferMutationInput<'transaction.upload'> = {
      transactionFile: mockTransaction(true)
    };
    await caller.mutation('transaction.upload', input).catch(e => console.log(e));
    const transactions = await caller.query('transaction.getAll')
  
    expect(transactions).toBeInstanceOf(Array);
    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]).toHaveProperty('type');
    expect(transactions[0]).toHaveProperty('date');
    expect(transactions[0]).toHaveProperty('amount');
  })
  it("should caller transaction.getAll", async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);
  
    const transactions = await caller.query('transaction.getAll')
  
    expect(transactions).toBeInstanceOf(Array);
    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]).toHaveProperty('type');
    expect(transactions[0]).toHaveProperty('date');
    expect(transactions[0]).toHaveProperty('amount');
  })
})
