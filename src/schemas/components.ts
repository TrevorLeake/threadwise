// src/schemas/components.ts

import { z } from "zod"
import { faker } from "@faker-js/faker"

export const Position = z.object({
  x: z.number(),
  y: z.number(),
})
export type Position = z.infer<typeof Position>

export const Velocity = z.object({
  dx: z.number(),
  dy: z.number(),
})
export type Velocity = z.infer<typeof Velocity>

export const Health = z.object({
  hp: z.number().min(0).max(100),
})
export type Health = z.infer<typeof Health>

export const EntitySchema = z.object({
  id: z.string(),
  position: Position,
  velocity: Velocity,
})

export type Entity = z.infer<typeof EntitySchema>

export const createFakeEntity = (): Entity => {
  return {
    id: faker.string.uuid(),
    position: {
      x: faker.number.float({ min: 0, max: 100 }),
      y: faker.number.float({ min: 0, max: 100 }),
    },
    velocity: {
      dx: faker.number.float({ min: -5, max: 5 }),
      dy: faker.number.float({ min: -5, max: 5 }),
    },
  }
}
