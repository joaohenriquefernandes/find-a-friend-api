import { Org, Prisma } from '@prisma/client';

export interface IOrgsRepository {
  create: ({
    author_name,
    cep,
    city,
    email,
    latitude,
    longitude,
    name,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
  }: Prisma.OrgUncheckedCreateInput) => Promise<Org>;
  findByEmail: (email: string) => Promise<Org | null>;
  findById: (id: string) => Promise<Org | null>;
  findManyNearby: (latitude: number, longitude: number) => Promise<Org[]>;
}
