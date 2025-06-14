import { z } from "zod"

export const Position = z.object({
  x: z.number(),
  y: z.number(),
})

export const Velocity = z.object({
  dx: z.number(),
  dy: z.number(),
})

export const Entity = z.object({
  id: z.string(),
  position: Position,
  velocity: Velocity,
})

export type Position = z.infer<typeof Position>
export type Velocity = z.infer<typeof Velocity>
export type Entity = z.infer<typeof Entity>
