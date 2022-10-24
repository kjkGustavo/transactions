import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'
import { env } from '~/env/server.mjs'
import { prisma } from '../db/prisma';

const login = async (username: string, password: string) => {
  const account = await prisma.account.findUnique({
    where: {
      username: username
    }
  })
  if(!account) {
    return null
  }
  if (!(await bcrypt.compare(password, account.password))) {
    return null
  }
  delete (account as Partial<typeof account>)?.password;
  const token = jsonwebtoken.sign(account, env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token)
  return {
    id: account.id,
    username: account.username,
    token
  }
}

const authService = {
  login
}

export default authService;