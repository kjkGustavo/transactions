import Head from 'next/head'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { trpc } from '~/utils/trpc'
import type { NextPageWithLayout } from '../_app'
type FormParams = { thumbnail: FileList }
function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const Import: NextPageWithLayout = () => {
  const router = useRouter()

  const { mutateAsync: uploadTransaction } = trpc.useMutation(
    'transaction.upload',
    {
      onSuccess: () => {
        toast.success('Transações importadas com sucesso')

        router.push('/')
      },
      onError: (error) => {
        toast.error('Erro ao importar transações') // TODO: Backend message
      }
    }
  )

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row justify-between items-center"
      >
        <div>
          <label>Image: </label>
          <input type="file" {...register('thumbnail')} />
        </div>
        <button
          className="bg-lime-400 border-lime-500 border-[1px] hover:bg-lime-300 transition-all duration-300 font-light px-4 py-2 leading-4 rounded-md text-sm box-border"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </>
  )
}
export default Import
