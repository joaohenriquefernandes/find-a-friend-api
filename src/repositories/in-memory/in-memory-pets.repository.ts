import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IFindAllParams, IPetsRepository } from '../pets.repository'
import { InMemoryOrgsRepository } from './in-memory-orgs.repository'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  constructor(readonly orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }

  async findAll(params: IFindAllParams): Promise<Pet[]> {
    const orgByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((pet) => orgByCity.some((org) => org.id === pet.orgId))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.energy_level ? pet.energy_level === params.energy_level : true,
      )
      .filter((pet) =>
        params.environment ? pet.environment === params.environment : true,
      )

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) || null
  }
}
