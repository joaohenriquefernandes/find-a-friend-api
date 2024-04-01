import { IOrgsRepository } from '@/repositories/interfaces/IOrgsRepository';
import { Org } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/OrgAlreadyExistsError';

interface ICreateOrgServiceRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface ICreateOrgServiceResponse {
  org: Org;
}

export class CreateOrgService {
  constructor(private orgsRepository: IOrgsRepository) {}

  async execute({
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
  }: ICreateOrgServiceRequest): Promise<ICreateOrgServiceResponse> {
    const isOrgAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (isOrgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      author_name,
      cep,
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password: password_hash,
      state,
      street,
      whatsapp,
    });

    return { org };
  }
}
