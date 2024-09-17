import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import { IFindManyNearbyParams, IOrgsRepository } from '../orgs.repository'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }

  async findById(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) || null
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null
  }

  async findManyNearby(params: IFindManyNearbyParams): Promise<Org[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}
