import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addEntity, tick } from "../../store/worldSlice"
import { createFakeEntity } from "../../schemas/components"
import type { RootState } from "../../store"
import { InfiniteGrid } from "../sketchy/InfiniteGrid"
import RxInfiniteGridViewer from "@/GridViewer"


const WorldLedger = () => {
  const dispatch = useDispatch()
  const world = useSelector((state: RootState) => state.world)

  useEffect(() => {
    dispatch(
      addEntity({
        id: "player",
        position: { x: 0, y: 0 },
        velocity: { dx: 1, dy: 1 },
      })
    )
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => dispatch(tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch])


  return <>
    <button onClick={() => dispatch(addEntity(createFakeEntity()))}>
      Add Random Entity
    </button>
    <RxInfiniteGridViewer></RxInfiniteGridViewer>
    <div style={{ padding: 20 }}>
      <h1>World Time: {world.time}</h1>
      <button onClick={() => dispatch(addEntity(createFakeEntity()))}>ADD</button>
      {Object.values(world.entities).map((e) => (
        <div key={e.id}>
          <strong>{e.id}</strong>: ({e.position.x}, {e.position.y})
        </div>
      ))}
    </div>
  </>
}

export default WorldLedger;
