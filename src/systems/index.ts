import { Entity } from "../schemas/entity"
import { RootState } from "../store"

export type WorldState = RootState["world"]

export type System = (world: WorldState) => WorldState

// 🏃 System: apply velocity to position
export const movementSystem: System = (world) => {
  const newEntities: typeof world.entities = {}

  for (const [id, entity] of Object.entries(world.entities)) {
    const { position, velocity } = entity

    newEntities[id] = {
      ...entity,
      position: {
        x: position.x + velocity.dx,
        y: position.y + velocity.dy,
      },
    }
  }

  return {
    ...world,
    entities: newEntities,
  }
}

export const runSystems = (world: WorldState, systems: System[]): WorldState => {
  return systems.reduce((acc, system) => system(acc), world)
}
