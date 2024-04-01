import { Pet, Prisma } from '@prisma/client';

interface IFindAllParams {
  age?: string;
  city: string;
  energy_level?: string;
  environment?: string;
  size?: string;
}

export interface IPetsRepository {
  create: ({
    about,
    age,
    energy_level,
    environment,
    name,
    org_id,
    size,
  }: Prisma.PetUncheckedCreateInput) => Promise<Pet>;
  findAll: ({
    city,
    age,
    energy_level,
    environment,
    size,
  }: IFindAllParams) => Promise<Pet[]>;
  findById: (id: string) => Promise<Pet | null>;
}
