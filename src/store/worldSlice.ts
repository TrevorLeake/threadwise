import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Entity } from "../schemas/entity"
import { movementSystem, runSystems } from "../systems"
    import { EntitySchema } from "../schemas/components"

type WorldState = {
  time: number
  entities: Record<string, Entity>
}

const initialState: WorldState = {
  time: 0,
  entities: {},
}

const systems = [movementSystem]

const worldSlice = createSlice({
  name: "world",
  initialState,
  reducers: {
    addEntity(state, action: PayloadAction<unknown>) {
      const parse = EntitySchema.safeParse(action.payload)
      if (!parse.success) {
        console.warn("Invalid entity", parse.error)
        return
      }
      const entity = parse.data
      state.entities[entity.id] = entity
    },
    updateEntity(state, action: PayloadAction<{ id: string; updates: Partial<Entity> }>) {
      const entity = state.entities[action.payload.id]
      if (entity) {
        state.entities[action.payload.id] = { ...entity, ...action.payload.updates }
      }
    },
    tick(state) {
      const newWorld = runSystems(state, systems)
      state.entities = newWorld.entities
      state.time += 1
    },
  },
})

export const { addEntity, updateEntity, tick } = worldSlice.actions
export default worldSlice.reducer
