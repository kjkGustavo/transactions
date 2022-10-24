import * as trpc from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { CreateContextOptions } from 'vm';

export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}


export const createContext = async (opts?: CreateNextContextOptions) => {
  return {
    req: opts?.req,
    res: opts?.res,
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
