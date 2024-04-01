import { getDistanceBetweenCoordinates } from '@/utils/functions/GetDistanceBetweenCoordinates';
import { Org, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
import { IOrgsRepository } from '../interfaces/IOrgsRepository';

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = [];

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
    const org = {
      id: randomUUID(),
      author_name,
      cep,
      city,
      email,
      name,
      neighborhood,
      password,
      state,
      street,
      whatsapp,
      latitude: new Decimal(latitude.toString()),
      longitude: new Decimal(longitude.toString()),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null;
  }

  async findById(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) || null;
  }

  async findManyNearby(latitude: number, longitude: number): Promise<Org[]> {
    return this.items.filter((org) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: org.latitude.toNumber(),
          longitude: org.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }
}
