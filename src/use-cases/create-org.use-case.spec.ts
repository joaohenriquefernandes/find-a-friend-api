import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org.use-case'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let createOrgUseCase: CreateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with an already used email', async () => {
    const org = makeOrg()

    await orgsRepository.create(org)

    expect(createOrgUseCase.execute(org)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('should hash password upon creation', async () => {
    const password = '123456'

    const { org } = await createOrgUseCase.execute(makeOrg({ password }))

    expect(await compare(password, org.password)).toBe(true)
    expect(await compare(password, orgsRepository.items[0].password)).toBe(true)
  })
})
