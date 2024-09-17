import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { makePet } from '@/tests/factories/make-pets.factory'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import PetNotFoundError from './errors/pet-not-found.error'
import GetPetUseCase from './get-pet.use-case'

describe('Get Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let getPetUseCase: GetPetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    getPetUseCase = new GetPetUseCase(petsRepository)
  })
  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet())

    const result = await getPetUseCase.execute({ id: pet.id })

    expect(result?.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(
      getPetUseCase.execute({ id: randomUUID() }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
