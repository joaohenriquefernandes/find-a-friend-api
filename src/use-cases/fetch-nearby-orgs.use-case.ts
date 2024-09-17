import { IOrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'

interface IFetchNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyOrgsUseCaseReply {
  orgs: Org[]
}

export default class FetchNearbyOrgsUseCase {
  constructor(readonly ogrsRepository: IOrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyOrgsUseCaseRequest): Promise<IFetchNearbyOrgsUseCaseReply> {
    const orgs = await this.ogrsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { orgs }
  }
}
