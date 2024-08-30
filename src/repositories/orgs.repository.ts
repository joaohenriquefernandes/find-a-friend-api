import { Org, Prisma } from '@prisma/client'

interface IFindManyNearby {
  latitude: number
  longitude: number
}

export interface IOrgsRepository {
  create: (data: Prisma.OrgCreateInput) => Promise<Org>
  findById: (id: string) => Promise<Org | null>
  findByEmail: (email: string) => Promise<Org | null>
  findManyNearby: (params: IFindManyNearby) => Promise<Org[]>
}
