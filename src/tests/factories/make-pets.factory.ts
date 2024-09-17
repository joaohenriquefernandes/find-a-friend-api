import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overwrite = {
  orgId?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    orgId: overwrite?.orgId ?? randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['indoor', 'outdoor']),
  }
}
