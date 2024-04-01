import { IPetsRepository } from '@/repositories/interfaces/IPetsRepository';
import { Pet } from '@prisma/client';

interface ISearchPetsServiceRequest {
  age?: string;
  city: string;
  energy_level?: string;
  environment?: string;
  size?: string;
}

interface ISearchPetsServiceResponse {
  pets: Pet[];
}

export class SearchPetsService {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
  }: ISearchPetsServiceRequest): Promise<ISearchPetsServiceResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      energy_level,
      environment,
      size,
    });

    return { pets };
  }
}
