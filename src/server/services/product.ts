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

const productService = {
  getAll,
  findByNameOrCreate
}

export default productService;