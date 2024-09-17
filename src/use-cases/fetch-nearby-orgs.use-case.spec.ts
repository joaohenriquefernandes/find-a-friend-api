import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { beforeEach, describe, expect, it } from 'vitest'
import FetchNearbyOrgsUseCase from './fetch-nearby-orgs.use-case'

describe('Fetch Nearby Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let fetchNearbyOrgsUseCase: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    fetchNearbyOrgsUseCase = new FetchNearbyOrgsUseCase(orgsRepository)
  })
  it('should be able fetch nearby orgs', async () => {
    const nearbyOrg = await orgsRepository.create(makeOrg())

    const nearbyOrgs = await fetchNearbyOrgsUseCase.execute({
      userLatitude: nearbyOrg.latitude.toNumber(),
      userLongitude: nearbyOrg.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toEqual([nearbyOrg])
  })
})
