// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.account.upsert({
      where: {
        username: 'admin'
      },
      create: {
        username: 'admin',
        password: '$2a$12$XSGBlZZL.eRRtufickT6aObZWIB92LqcPt6GQ/L.IAmxBkS1QAVIi'
      },
      update: {}
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()