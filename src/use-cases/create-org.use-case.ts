import { IOrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'

interface ICreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string
  zip_code: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface ICreateOrgUseCaseReply {
  org: Org
}

export class CreateOrgUseCase {
  constructor(readonly orgsRepository: IOrgsRepository) {}

  async execute({
    author_name,
    zip_code,
    city,
    email,
    latitude,
    longitude,
    name,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
  }: ICreateOrgUseCaseRequest): Promise<ICreateOrgUseCaseReply> {
    const isOrgExists = await this.orgsRepository.findByEmail(email)

    if (isOrgExists) {
      throw new OrgAlreadyExistsError()
    }

    const hash_password = await hash(password, 8)

    const org = await this.orgsRepository.create({
      author_name,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password: hash_password,
      state,
      street,
      whatsapp,
      zip_code,
    })

    return { org }
  }
}
