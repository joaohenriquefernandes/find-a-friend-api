import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { IFindAllParams, IPetsRepository } from '../pets.repository'

export class PrismPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findAll({
    city,
    age,
    energy_level,
    environment,
    size,
  }: IFindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        energy_level,
        environment,
        size,
        org: {
          city: {
            contains: city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
