import type {
  Seller,
  Transaction,
  Type as TransactionType
} from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import type { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { ReactElement } from 'react'

import Layout from '~/components/Layout'
import Table from '~/components/Table'

import protectedRoutes from '~/utils/protected-route'
import { trpc } from '~/utils/trpc'
import type { NextPageWithLayout } from '../_app'

const renderType: { [key in TransactionType]: string } = {
  CREATOR_SALE: 'Venda produtor',
  AFFILIATE_SALE: 'Venda afiliado',
  COMMISSION_PAID: 'Comissão paga',
  COMMISSION_RECEIVED: 'Comissão recebida'
}
const columns: ColumnDef<
  Transaction & {
    seller: Seller
  }
>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ getValue }) =>
      new Date(getValue<Date>()).toLocaleDateString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
  },
  {
    accessorKey: 'seller.name',
    header: 'Vendedor'
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ getValue }) =>
      renderType[getValue() as keyof typeof TransactionType]
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ getValue }) => {
      const formattedValue = +getValue<number>() / 100

      return formattedValue.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  }
]
const ListTransactions: NextPageWithLayout<{
  productId: string | string[]
}> = ({ productId }) => {
  const { data, isLoading } = trpc.useQuery([
    'product.getTransactionsOfProducts',
    {
      productId: parseInt(productId as string)
    }
  ])

  const totalAmount = data?.Transaction.reduce((acc, item) => {
    if (item.type === 'COMMISSION_PAID') {
      acc - Number(+item.amount / 100)
      return acc
    }

    return acc + Number(+item.amount / 100)
  }, 0)

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between items-center mb-14">
        <div>
          <h2 className="font-serif text-3xl font-semibold mb-2">
            Transações de {data?.name}
          </h2>
          <p className="text-stone-500 font-light">
            Últimas transações realizadas
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={data?.Transaction || []}
        isLoading={isLoading}
      />

      <p className="w-full flex justify-end text-stone-500 font-light mt-5">
        Soma:{' '}
        {totalAmount?.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
      </p>
    </>
  )
}
export default ListTransactions

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  if (!context.params?.productId) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      session,
      productId: context.params.productId
    }
  }
}

ListTransactions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
