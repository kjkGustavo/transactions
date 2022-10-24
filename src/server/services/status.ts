import { prisma } from '~/server/db/prisma'

export const getAnalytics = async () => {
  const sellers = await prisma.seller.count()
  const products = await prisma.product.count()
  const transactionsData = await prisma.transaction.findMany({
    select: {
      amount: true
    }
  })
  const transactions = transactionsData.reduce((acc, item) => acc + Number(+item.amount / 100), 0)

  return { products, sellers, transactions };
}

const statusService = {
  getAnalytics
}

export default statusService;