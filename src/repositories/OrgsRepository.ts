import { prisma } from '@/libs/prisma';
import { Org, Prisma } from '@prisma/client';
import { IOrgsRepository } from './interfaces/IOrgsRepository';

export class OrgsRepository implements IOrgsRepository {
  async create({
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
  }: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data: {
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
      },
    });

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findManyNearby(latitude: number, longitude: number): Promise<Org[]> {
    const orgs = await prisma.$queryRaw<Org[]>`
      SELECT * from orgs
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return orgs;
  }
}
