import { IOrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import InvalidCredentialsError from './errors/invalid-credentials.error'

interface IAuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateOrgUseCaseReply {
  org: Org
}

export default class AuthenticateOrgUseCase {
  constructor(readonly orgsRepository: IOrgsRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateOrgUseCaseRequest): Promise<IAuthenticateOrgUseCaseReply> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, org.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
