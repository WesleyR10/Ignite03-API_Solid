import { Prisma, User } from '@prisma/client'

// Quais métodos e parâmetros existe no meu repositório.
export interface UsersRepository { 
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}