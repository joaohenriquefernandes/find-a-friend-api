import { prisma } from '@/libs/prisma';
import { Pet, Prisma } from '@prisma/client';
import { IFindAllParams, IPetsRepository } from './interfaces/IPetsRepository';

export class PetsRepository implements IPetsRepository {
  async create({
    about,
    age,
    energy_level,
    environment,
    name,
    org_id,
    size,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        about,
        age,
        energy_level,
        environment,
        name,
        size,
        org_id,
      },
    });

    return pet;
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
    });

    return pets;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
}
