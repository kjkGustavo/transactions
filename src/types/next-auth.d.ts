import { NextApiRequest } from "next";
import "next-auth";

declare module "next-auth" {
  export * from "next-auth";

  export interface User {
    username: string;
    token: string;
    id: number;
  }

  export interface Session {
    user: User;
  }

  declare function authorize(
    credentials: Record<keyof C, string>,
    req: NextApiRequest
  ): Awaitable<User | null>;
}