import { Pet, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { IFindAllParams, IPetsRepository } from '../interfaces/IPetsRepository';
import { InMemoryOrgsRepository } from './InMemoryOrgsRepository';

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create({
    about,
    age,
    energy_level,
    environment,
    name,
    org_id,
    size,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      about,
      age,
      energy_level,
      environment,
      name,
      size,
      org_id,
    };

    this.items.push(pet);

    return pet;
  }

  async findAll({
    city,
    age,
    energy_level,
    environment,
    size,
  }: IFindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === city,
    );

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (age ? item.age === age : true))
      .filter((item) =>
        energy_level ? item.energy_level === energy_level : true,
      )
      .filter((item) => (environment ? item.environment === environment : true))
      .filter((item) => (size ? item.size === size : true));

    return pets;
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((pet) => pet.id === id) || null;
  }
}
