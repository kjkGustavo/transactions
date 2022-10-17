import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    'transaction.hello',
    {
      text: `123`
    }
  ])

  console.log(data)

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-poppins h-screen w-screen"></div>
    </>
  )
}

export default Home
