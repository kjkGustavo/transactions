import { ColumnDef } from '@tanstack/react-table'
import type { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import Table from '~/components/Table'

import { Seller, Transaction, Type as TransactionType } from '@prisma/client'
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
    header: 'Quantidade',
    cell: ({ getValue }) => {
      const formattedValue = +getValue<number>()

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
  ]) // TODO: on error on transactions

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  )
}

export default ListTransactions

export async function getServerSideProps({
  params
}: GetServerSidePropsContext) {
  if (!params?.productId) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productId: params.productId
    }
  }
}
