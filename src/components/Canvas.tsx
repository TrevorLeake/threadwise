import { RefObject, useCallback, useRef, useState } from "react"
import { useAnimation } from "./hooks/useAnimation"

const safeGetCtx = (canvasRef:RefObject<HTMLCanvasElement|null>) => {
  if(!canvasRef.current)
    return
  const ctx = canvasRef.current.getContext('2d')
  if(!ctx)
    return
  return ctx
}

type coord = [number,number]
type World = {
  objs:Obj[]
  grid:Grid
  time:number
}


// --- Types ---
type Vec2 = [number, number]



const add = ([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 => [x1 + x2, y1 + y2]
const scale = ([x, y]: Vec2, s: number): Vec2 => [x * s, y * s]
const key = ([x, y]: Vec2) => `${x},${y}`

// Grid cell and object definitions
type Cell = { value: Vec2 }
type Grid = Map<string, Cell>
type Obj = { pos: Vec2; vel: Vec2 }

type Bounds = { 
  x:number,
  y:number,
  width:number,
  height:number
}


const CIRCLE_RADIUS = 10
const MARGIN = 100 //px
const SCALE = 30

const CIRCLE_COLOR_POS_A = 'yellow'
const CIRCLE_COLOR_POS_B = 'deeppink'


const gridToScreenSpace = (v:Vec2):Vec2 => {
  const margin:Vec2 = [MARGIN, MARGIN]
  return add(margin, scale(v, SCALE))
}

const vec2Len = (v:Vec2) => Math.sqrt(v[0]**2 + v[1]**2)

const drawWorld = (ctx:CanvasRenderingContext2D, world:World, dims:{ height:number, width:number }) => {
  ctx.clearRect(0, 0, dims.width, dims.height)

  ctx.strokeStyle='white'
  // ctx.strokeText('time: ' + world.time.toFixed(0),0,10)


  // Draw grid
  for (let [k, cell] of world.grid.entries()) {
    const p = k.split(',').map(Number) as Vec2
    const screenPos = gridToScreenSpace(p)
    const [scrX, scrY] = screenPos
    ctx.fillStyle = `rgb(${cell.value[1]*100}, 30, ${200*vec2Len(cell.value)})`
    // ctx.fillStyle = `rgba(
    // 40, 
    // 60,
    // calc(140*${vec2Len(cell.value)}), 
    // 1)`
    // const color = `color-mix(in hsl, green, coral ${cell.value}%)`
    // ctx.fillStyle=
    ctx.beginPath()
    ctx.arc(scrX, scrY, CIRCLE_RADIUS, 0, Math.PI * 2)
    ctx.fill()

    const neighbors = sampleNeighborhood(world.grid, p)
    const res = neighbors.reduce((prev, cur) => add(cur.value, prev as Vec2), [0,0])
    const velIndicator = add( screenPos, scale(res as Vec2, 1+Math.sin(world.time)) )
    
    ctx.beginPath()
    ctx.strokeStyle = `rgba(255,200,0,${vec2Len(cell.value)})`
    ctx.moveTo(...screenPos)
    ctx.lineTo(...velIndicator)
    ctx.lineWidth=1
    ctx.stroke()
    ctx.closePath()
  }

  const { width, height } = dims
  world.objs.map(ob => {

    ctx.fillStyle = `rgba(255,0,0,${vec2Len(ob.vel)/100})`
    ctx.beginPath()
    ctx.arc(...gridToScreenSpace(ob.pos), 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    const screenPos = gridToScreenSpace(ob.pos)
    const velIndicator = add( screenPos, scale(ob.vel,3) )

    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(...screenPos)
    ctx.lineTo(...velIndicator)
    ctx.lineWidth=2
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = `rgba(255,255,0,${vec2Len(ob.vel)/10})`

    ctx.moveTo(...screenPos)
    const steps = 3
    const tail:Vec2[] = []
    
    for(let i=1;i<steps;++i) {
      // tail.push() gridToScreenSpace( add(ob.pos, scale(ob.vel, -i)) ) 
      // ctx.lineTo(...cur)
      ctx.lineWidth=steps - i
      ctx.closePath()  
      // let prev = cur
    }
    ctx.stroke()

  })


  // update grid
  
  // field = (x:number, y:number, t:number):Vec2 => [(Math.cos(3+x*t/2)), Math.atan(y)*.5+Math.cos(x/3)]
}


// const field = (x:number, y:number):Vec2 => [Math.cos(x), Math.sin(y)] 
let field = (x:number, y:number, t:number):Vec2 => 
  add(
    scale([
      -Math.atan((x/(10*t||1))), 
      -Math.cos((-x/(t||1)))
    ], -1), [1,1]
  )
const norm = (v:Vec2) => Math.sqrt(v[0]**2 + v[1]**2)

const SPAN = 100
// --- Init ---
const initGrid = (): Grid => {
  const grid = new Map<string, Cell>()
  for (let x = 1; x <= SPAN; x++) {
    for (let y = 1; y <= SPAN; y++) {

      // const v = Math.random()-.5
      // const w = Math.random()-.5
      console.log(field(0, 0, 0))
      grid.set(key([x, y]), { value: x === 0 || y === 0 ? [0,0] :  field(x, y, 0)  })
    }
  }
  return grid
}


const extend = <A, B>(
  world: (coord: Vec2) => A, 
  f: (context: (coord: Vec2) => A,
  center: Vec2) => B): (coord: Vec2) => B => {
  return (coord: Vec2) => f(world, coord)
}

function sampleNeighborhood(grid: Map<string, Cell>, pos: [number, number]): Cell[] {
  const [px, py] = [Math.floor(pos[0]), Math.floor(pos[1])]
  const neighborhood: Cell[] = []

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = px + dx
      const y = py + dy
      const key = `${x},${y}`
      const val = grid.get(key) ?? {value:[0,0]} // fallback to 0 if missing
      neighborhood.push(val)
    }
  }

  return neighborhood
}


const computeForceFromNeighborhood = (cells: Cell[]): Vec2 => {
  // Simple force: go toward higher value
  const dx = (cells[1].value[0] + cells[2].value[0])
  const dy = (cells[3].value[1] + cells[4].value[1])
  return [dx, dy]
}

const f = (x:number) => 1/(1+x^x)
type CellState = {
  position: Vec2
  velocity: Vec2
}


const updateWorld = (world:World, dt:number):World => {
  const { time } = world
  

  const objs:Obj[] = world.objs.map((ob, i) => {
    const { grid } = world 
    const neighborhood = sampleNeighborhood(grid, ob.pos)
    const force = computeForceFromNeighborhood(neighborhood)

    // const { sin, cos, E, PI, abs } = Math
    const vel = add(ob.vel, scale(force, 0.005))
    const pos = add(ob.pos, scale(vel, 0.04))

    return { vel, pos }
  })

  
  const updatedGrid = new Map<string, Cell>()
  world.grid.entries().forEach(([k, v], i) => {
    updatedGrid.set(k, { value: v.value })
  }) 


  return {
    objs,
    time:time+dt,
    grid: updatedGrid
  }
}


// // object trail... 
// // linear probing state trail... track last 5 positions
// const trail: Obj[] = [
//   {pos:[0,0], vel:[0,0]},
//   {pos:[0,0], vel:[0,0]},
//   {pos:[0,0], vel:[0,0]},
//   {pos:[0,0], vel:[0,0]},
//   {pos:[0,0], vel:[0,0]},
// ] 
// // time-step dist
// const trailTimeStep = 15





export default () => {

  const dims = { width: 400, height: 400 }
  const [grid] = useState<Grid>(() => initGrid())

  const [animating, setAnimating] = useState<boolean>(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const worldRef = useRef<World>({
    objs: new Array(5).fill(undefined).map((_, i) => {return { pos:[i,2+10*Math.sin(i)+4], vel:[0,0] }} ), 
    grid, 
    time:0
  })

  const animationCallback = useCallback((t:number) => {
    const ctx = safeGetCtx(canvasRef)
    if(!ctx) return
    if(t<1)
      worldRef.current = updateWorld(worldRef.current, t)
    drawWorld(ctx, worldRef.current, dims)
  }, [])

  useAnimation(animating, animationCallback)

  return (
    <canvas {...dims} style={{...dims}} ref={canvasRef} />
  )
}