import type { NextPage } from 'next'
import Head from 'next/head'
import { SubmitHandler, useForm } from 'react-hook-form'

import { trpc } from '~/utils/trpc'

type FormParams = { thumbnail: FileList }

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const Import: NextPage = () => {
  const { mutateAsync: uploadTransaction } =
    trpc.useMutation('transaction.upload') // TODO: On success return

  const { register, handleSubmit } = useForm<FormParams>()

  const onSubmit: SubmitHandler<FormParams> = async ({ thumbnail }) => {
    const file = await getBase64(thumbnail[0])

    await uploadTransaction({
      transactionFile: file as string
    })
  }

  return (
    <>
      <Head>
        <title>Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between items-center mb-14">
        <div>
          <h2 className="font-serif text-3xl font-semibold mb-2">Importação</h2>
          <p className="text-stone-500 font-light">
            Importe as transações da plataforma
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Image: </label>
        <input type="file" {...register('thumbnail')} />
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default Import
