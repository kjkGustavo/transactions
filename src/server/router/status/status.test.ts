import statusService from "../../services/status";

describe('analytics service', () => {
  it("should return analytics count", async () => {
    const analytics = await statusService.getAnalytics();

    expect(analytics).toHaveProperty('products');
    expect(analytics).toHaveProperty('sellers');
    expect(analytics).toHaveProperty('transactions');
    expect(typeof analytics?.products).toBe('number');
    expect(typeof analytics?.sellers).toBe('number');
    expect(typeof analytics?.transactions).toBe('number');
  })
})