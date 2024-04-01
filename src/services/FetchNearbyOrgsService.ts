import { IOrgsRepository } from '@/repositories/interfaces/IOrgsRepository';
import { Org } from '@prisma/client';

interface IFetchNearbyOrgsServiceRequest {
  latitude: number;
  longitude: number;
}

interface IFetchNearbyOrgsServiceResponse {
  orgs: Org[];
}

export class FetchNearbyOrgsService {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
    latitude,
    longitude,
  }: IFetchNearbyOrgsServiceRequest): Promise<IFetchNearbyOrgsServiceResponse> {
    const orgs = await this.orgsRepository.findManyNearby(latitude, longitude);

    return { orgs };
  }
}
