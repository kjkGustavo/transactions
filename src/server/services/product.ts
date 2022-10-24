import { prisma } from '~/server/db/prisma'

const getAll = () => {
  return prisma.product.findMany({
    include: {
      creator: true
    }
  })
}

const findByNameOrCreate = (name: string, creator: number) => {
  return prisma.product.upsert({
    where: { name },
    update: {},
    create: {
      name,
      sellerId: creator
    }
  })
}

const getProductWithTransactions = async (productId: number) => {
  return prisma.product.findFirst({
    include: {
      Transaction: {
        include: {
          seller: true,
        },
        orderBy: {
          date: "desc",
        },
      },
    },
    where: {
      id: productId,
    },
  });
};

const productService = {
  getAll,
  findByNameOrCreate,
  getProductWithTransactions
}

export default productService;