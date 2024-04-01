import { InMemoryOrgsRepository } from '@/repositories/inMemory/InMemoryOrgsRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgService } from './CreateOrgService';

describe('Create Org Service', () => {
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreateOrgService;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgService(orgsRepository);
  });

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      author_name: 'John Doe',
      cep: '37701467',
      city: 'Poços de Caldas',
      email: 'org1@mail.com',
      name: 'Org 1',
      neighborhood: 'João Pinheiro',
      password: '123456',
      state: 'Minas Gerais',
      street: 'Avenida João Pinheiro',
      whatsapp: '35999999999',
      latitude: -21.7843936,
      longitude: -46.594523,
    });

    expect(orgsRepository.items).toHaveLength(1);
    expect(org.id).toEqual(expect.any(String));
  });
});
