import { ColumnDef } from '@tanstack/react-table'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Table from '~/components/Table'

import { Product, Seller } from '@prisma/client'
import { trpc } from '~/utils/trpc'

const columns: ColumnDef<
  Product & {
    creator: Seller
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Produto'
  },
  {
    accessorKey: 'seller.name',
    header: 'Criador'
  },
  {
    accessorKey: 'action',
    header: 'Ver transações',
    cell: () => (
      <Link
        href="/transactions/import"
        className="bg-blue-200 hover:bg-stone-200/80 p-3 leading-4 rounded-md text-sm"
      >
        Importar
      </Link>
    )
  }
]

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['product.getAll'])

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-poppins h-screen w-screen">
        {' '}
        <main className="container mx-auto">
          <div className="flex justify-between items-center mb-14">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-2">
                Transações da plataforma
              </h2>
              <p className="text-stone-500 font-light">
                Gerencie todas as transações por produto da plataforma
              </p>
            </div>
            <div>
              <Link
                href="/transactions/import"
                className="bg-blue-200 hover:bg-stone-200/80 p-3 leading-4 rounded-md text-sm"
              >
                Importar
              </Link>
            </div>
          </div>
          <Table columns={columns} data={data || []} isLoading={isLoading} />
        </main>
      </div>
    </>
  )
}

export default Home
