import { IOrgsRepository } from '@/repositories/orgs.repository'
import { IPetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import OrgNotFoundError from './errors/org-not-found.error'

interface ICreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  org_id: string
}

interface ICreatePetUseCaseReply {
  pet: Pet
}

export default class CreatePetUseCase {
  constructor(
    readonly petsRepository: IPetsRepository,
    readonly orgsRepository: IOrgsRepository,
  ) {}

  async execute({
    about,
    age,
    energy_level,
    environment,
    name,
    org_id,
    size,
  }: ICreatePetUseCaseRequest): Promise<ICreatePetUseCaseReply> {
    const isOrgExists = await this.orgsRepository.findById(org_id)

    if (!isOrgExists) {
      throw new OrgNotFoundError()
    }
    const pet = await this.petsRepository.create({
      about,
      age,
      energy_level,
      environment,
      name,
      size,
      orgId: isOrgExists.id,
    })

    return { pet }
  }
}
