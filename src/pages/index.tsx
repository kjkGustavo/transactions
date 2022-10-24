import { ColumnDef } from '@tanstack/react-table'
import Head from 'next/head'

import Table from '~/components/Table'

import { Product, Seller } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { ReactElement } from 'react'
import { trpc } from '~/utils/trpc'
import Action from '../components/Action'
import Layout from '../components/Layout'
import StatisticCard from '../components/StatisticCard'
import protectedRoutes from '../utils/protected-route'
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
  const analyitcs = trpc.useQuery(['status.getAnalytics'])

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
      </div>
      <div className="grid md:grid-flow-col gap-4 my-6">
        <StatisticCard title="Produtos" value={analyitcs?.data?.products} />
        <StatisticCard title="Vendedores" value={analyitcs?.data?.sellers} />
        <StatisticCard
          title="Total movimentado"
          value={analyitcs?.data?.transactions.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          })}
          important
        />
      </div>
      <Table columns={columns} data={data || []} isLoading={isLoading} />
    </>
  )
}

export default Home

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      session
    }
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
