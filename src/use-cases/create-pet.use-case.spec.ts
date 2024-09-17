import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { makePet } from '@/tests/factories/make-pets.factory'
import { beforeEach, describe, expect, it } from 'vitest'
import CreatePetUseCase from './create-pet.use-case'
import OrgNotFoundError from './errors/org-not-found.error'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let createPetUseCase: CreatePetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create(makeOrg())

    const { pet } = await createPetUseCase.execute(makePet({ org_id: org.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    await expect(createPetUseCase.execute(makePet())).rejects.toBeInstanceOf(
      OrgNotFoundError,
    )
  })
})
