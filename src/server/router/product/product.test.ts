import { appRouter } from '..';
import { createContextInner } from '../context';

describe("product trpc", () => {
  it("should call caller product.getAll", async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);

    const products = await caller.query('product.getAll')


  
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('creator');
    expect(products[0]).toHaveProperty('name');
  })
})
