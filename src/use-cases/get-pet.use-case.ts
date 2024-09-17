import { IPetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import PetNotFoundError from './errors/pet-not-found.error'

interface IGetPetUseCaseRequest {
  id: string
}

interface IGetPetUseCaseReply {
  pet: Pet
}

export default class GetPetUseCase {
  constructor(readonly petsRepository: IPetsRepository) {}

  async execute({
    id,
  }: IGetPetUseCaseRequest): Promise<IGetPetUseCaseReply | null> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
