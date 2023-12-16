import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from "zod"
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  
  const { name, email, password } = registerBodySchema.parse(request.body) // Parse gera erro caso de false nao deixando o código continuar

  try {
    const prismaUserRepository = new PrismaUsersRepository
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}