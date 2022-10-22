import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { trpc } from '../../utils/trpc'

function getBase64(file: File) {
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

  const { register, handleSubmit, setValue } = useForm()

  const onChangeFile = async (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files?.[0]) return
    setValue('thumbnail', await getBase64(e.currentTarget?.files?.[0]))
  }

  const onSubmit = async (e) => {
    await uploadTransaction({
      transactionFile: e.thumbnail
    })
    console.log(e.thumbnail)
  }

  // TODO: refactor form with submit type

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
                Importação
              </h2>
              <p className="text-stone-500 font-light">
                Importe as transações da plataforma
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Image: </label>
            <input id="fileInput" type="file" onChange={onChangeFile} />
            <input
              type="hidden"
              {...register('thumbnail', { required: true })}
            />
            <button type="submit">Teste</button>
          </form>
        </main>
      </div>
    </>
  )
}

export default Import
