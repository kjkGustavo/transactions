import { ColumnDef } from '@tanstack/react-table'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Table from '~/components/Table'

import { Seller, Transaction } from '@prisma/client'
import { trpc } from '~/utils/trpc'

const columns: ColumnDef<
  Transaction & {
    seller: Seller
  }
>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ getValue }) => new Date(getValue<Date>()).toString()
  },
  {
    accessorKey: 'seller.name',
    header: 'Vendedor'
  },
  {
    accessorKey: 'type',
    header: 'Tipo'
  },
  {
    accessorKey: 'amount',
    header: 'Quantidade',
    cell: ({ getValue }) => +getValue<number>()
  }
]

const ListTransactions: NextPage = () => {
  const router = useRouter()
  const { productId } = router.query

  const { data, isLoading } = trpc.useQuery([
    'transaction.getAllOfProducts',
    {
      productId: parseInt(productId as string)
    }
  ]) // TODO: on error on transactions

  if (!productId) {
    router.push('/404')
    return null
  } // TODO: Pass to ssr

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-poppins h-screen w-screen">
        <main className="container mx-auto">
          <div className="flex justify-between items-center mb-14">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-2">
                Transações de {'DESENVOLVIMENTO WEB COMPLETO'}
              </h2>
              <p className="text-stone-500 font-light">
                Importe as transações da plataforma
              </p>
            </div>
          </div>

          <Table columns={columns} data={data || []} isLoading={isLoading} />
        </main>
      </div>
    </>
  )
}

export default ListTransactions
