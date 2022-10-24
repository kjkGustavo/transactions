import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import { NextPage } from 'next'
import type { AppProps, AppType } from 'next/app'
import { toast, ToastContainer } from 'react-toastify'
import superjson from 'superjson'

import Layout from '~/components/Layout'
import { AppRouter } from '~/server/router'

import 'react-toastify/dist/ReactToastify.css'
import '~/styles/globals.css'
import getBaseUrl from '~/utils/get-base-url'

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const App = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return getLayout(
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        draggable
        theme="light"
      />
    </>
  )
}) as AppType

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error)
        }),
        httpBatchLink({ url })
      ],
      url,
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            onError: () => {
              toast.error(
                'Ocorreu um erro inesperado, tente novamente mais tarde.'
              )
            }
          }
        }
      }
    }
  },
  ssr: false
})(App)
