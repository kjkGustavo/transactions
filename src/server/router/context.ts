import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { CreateContextOptions } from "vm";

export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  return await createContextInner({});
}

export const createRouter = () => trpc.router<Context>();