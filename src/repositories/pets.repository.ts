import { Pet, Prisma } from '@prisma/client'

interface IFindAllParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export interface IPetsRepository {
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
  findAll: (params: IFindAllParams) => Promise<Pet[]>
  findById: (id: string) => Promise<Pet[]>
}
