import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import AuthenticateOrgUseCase from './authenticate-org.use-case'
import InvalidCredentialsError from './errors/invalid-credentials.error'

describe('Authenticate Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let authenticateOrgUseCase: AuthenticateOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const password = '123456'
    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )

    const { org: authneticateOrg } = await authenticateOrgUseCase.execute({
      email: org.email,
      password,
    })

    expect(authneticateOrg).toEqual(org)
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(
      authenticateOrgUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )

    await expect(
      authenticateOrgUseCase.execute({
        email: org.email,
        password: await hash('654321', 8),
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
