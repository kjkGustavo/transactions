import { appRouter } from '..';
import { createContextInner } from '../context';

describe("product trpc", () => {
  it("should caller product.getAll and getTransactionsOfProducts", async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);
  
    const products = await caller.query('product.getAll')

    const product = await caller.query('product.getTransactionsOfProducts', {
      productId: products[0].id
    });

    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('Transaction')
    expect(product?.Transaction).toBeInstanceOf(Array);
  
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('creator');
    expect(products[0]).toHaveProperty('name');
  })
})
