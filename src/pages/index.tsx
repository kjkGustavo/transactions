import { ColumnDef } from '@tanstack/react-table'
import Head from 'next/head'

import Table from '~/components/Table'

import { Product, Seller } from '@prisma/client'
import { trpc } from '~/utils/trpc'
import Action from '../components/Action'
import StatisticCard from '../components/StatisticCard'
import type { NextPageWithLayout } from './_app'

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
    accessorKey: 'creator.name',
    header: 'Criador'
  },
  {
    accessorKey: 'id',
    header: 'Ações',
    cell: ({ getValue }) => (
      <Action href={`/transactions/${getValue()}`}>Visualizar</Action>
    )
  }
]

const Home: NextPageWithLayout = () => {
  const { data, isLoading } = trpc.useQuery(['product.getAll'])

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="font-serif text-xl md:text-3xl font-semibold mb-2">
            Transações da plataforma
          </h2>
          <p className="text-stone-500 font-light">
            Gerencie todas as transações por produto da plataforma
          </p>
        </div>
        <div>
          <Action href="/transactions/import">Importar</Action>
        </div>
      </div>
      <div className="grid md:grid-flow-col gap-4 my-6">
        <StatisticCard title="Produtos" value={'5'} />
        <StatisticCard title="Vendedores" value={'5'} />
        <StatisticCard
          title="Total movimentado"
          value={'R$ 500,50'}
          important
        />
      </div>
      <Table columns={columns} data={data || []} isLoading={isLoading} />
    </>
  )
}

export default Home
