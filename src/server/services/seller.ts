import { prisma } from '~/server/db/prisma'

export const findByNameOrCreate = async (name: string) => {
  return await prisma.seller.upsert({
    where: { name },
    update: {},
    create: {
      name
    }
  })
}

const sellerService = {
  findByNameOrCreate
}

export default sellerService;