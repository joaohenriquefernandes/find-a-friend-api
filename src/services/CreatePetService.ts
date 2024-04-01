import { IOrgsRepository } from '@/repositories/interfaces/IOrgsRepository';
import { IPetsRepository } from '@/repositories/interfaces/IPetsRepository';
import { Pet } from '@prisma/client';
import { OrgNotFoundError } from './errors/OrgNotFoundError';

interface ICreatePetServiceRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energy_level: string;
  environment: string;
  org_id: string;
}

interface ICreatePetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(
    private petsRepository: IPetsRepository,
    private orgsRepository: IOrgsRepository,
  ) {}

  async execute({
    about,
    age,
    energy_level,
    environment,
    name,
    org_id,
    size,
  }: ICreatePetServiceRequest): Promise<ICreatePetServiceResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      about,
      age,
      energy_level,
      environment,
      name,
      org_id,
      size,
    });

    return { pet };
  }
}
