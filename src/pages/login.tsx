import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type LoginFormProps = {
  username: string
  password: string
}

const validator = z.object({
  username: z.string().nonempty({ message: 'Usuário é obrigatório' }),
  password: z.string().nonempty({ message: 'Usuário é obrigatório' })
})

const inputErrorStyle = 'border-red-600 focus:ring-0 focus:ring-red-600'
const inputStyle =
  'border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600'

const Login: NextPage = () => {
  const { query, push } = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormProps>({
    resolver: zodResolver(validator)
  })

  const onSubmit: SubmitHandler<LoginFormProps> = async (values) => {
    const response = await signIn<'credentials'>('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query.callbackUrl || ''}`
    })

    if (response?.error && response.status === 401) {
      toast.error('Usuário ou senha inválidos')
    }

    if (response?.url) {
      return push(response.url)
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 w-full shadow-xl rounded-xl max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 w-full text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col w-full my-5">
            <label className="text-gray-500 mb-2">Usuário</label>
            <input
              placeholder="Insira seu nome de usuário"
              className={clsx(
                'appearance-none border-2 rounded-lg px-4 py-3 placeholder-gray-300 outline-none',
                errors.username?.message ? inputErrorStyle : inputStyle
              )}
              disabled={isSubmitting}
              {...register('username')}
            />
            {errors.username?.message ? (
              <p className="text-red-600 mt-2 text-xs italic">
                {errors.username.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-full my-5">
            <label className="text-gray-500 mb-2">Senha</label>
            <input
              type="password"
              placeholder="Insira sua senha"
              className={clsx(
                'appearance-none border-2 rounded-lg px-4 py-3 placeholder-gray-300 outline-none',
                errors.username?.message ? inputErrorStyle : inputStyle
              )}
              disabled={isSubmitting}
              {...register('password')}
            />
            {errors.password?.message ? (
              <p className="text-red-600 mt-2 text-xs italic">
                {errors.password.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-full my-5">
            <button
              type="submit"
              className="w-full py-4 bg-green-600 rounded-lg text-white font-bold disabled:opacity-80"
              disabled={isSubmitting}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
