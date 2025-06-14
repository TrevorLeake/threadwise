import { act, useCallback, useReducer, useState } from "react"
import { useAnimation } from "./hooks/useAnimation"


type Task = {
  id:number
  name:string
  tags?:string[]
  state?:TaskState
}

type Board = { 
  name:string
  lanes: TaskState[]
  tasks: Task[]
}

type TaskState = 'To Do' | 'Doing' | 'Done' 

const createLanes = ():TaskState[] => {
  return ['To Do', 'Doing', 'Done']
}

const createTasks = ():Task[] => {
  return [
    {id:0,name:'create log series stack..'}, 
    {id:1,name:'create kanban'},
    {id:2,name:'simplify blog layout'},
    {id:3,name:'repattern blog css -- globals, modules'},
    {id:4,name:'site skeleton'},
    
    {id:5,tags:['s.io', 'pragmatics'],name:'analytics solutions'},
    {id:6,tags:['s.io'] ,name:'full stack serverless pino log sink'},
    {id:7,tags:['s.io'] ,name:'zod - contract-first `/auth`'},
    {id:8,tags:['s.io', 'pragmatics'] ,name:'ads (like a real dev)'},
     
    {id:9,tags:['imaginal'], name:'comonad grid models'},
  ]
}

export default () => {
  const [tasks, setTasks] = useState<Task[]>(
    createTasks()
      .map(t => {
        return {...t, state:'To Do'}
      }
    )
  )

  const intialBoard: Board = {
    name:'Test',
    lanes: createLanes(),
    tasks
  }
  // reducer for task board manager

  interface MoveAction { type:'move', payload:{taskId:number, newState:TaskState}}  
  interface DeleteAction { type:'delete', payload:{taskId:number, newState:TaskState}}  

  type KanbanAction = MoveAction | DeleteAction

  const kanbanReducer = (prev:Board, action:KanbanAction): Board => {
    switch(action.type) {
      case 'move': {
        console.log(action)
        return {
          lanes: prev.lanes,
          name: prev.name,
          tasks: prev.tasks.map(t => {
            if(action.payload.taskId !== t.id) {
              return t
            }
            return { ...t, state: action.payload.newState}
          })
        }
      }
      case 'delete': {
        return prev
      }
    }
  }
  const [board, dispatch] = useReducer(kanbanReducer, intialBoard)


  const [selected, setSelected] = useState<number>()
  const [over, setOver] = useState<number>()
  const [animating, setAnimating] = useState<boolean>(false)
  const [pos, setPos] = useState<[number,number]>()
  const animationCallback = useCallback((dt:number) => {
    
  }, [])
  useAnimation(animating, animationCallback)

  // during drag, animate... 
  // 


  // prioritize
  // applications
  // pragmatic component work 
  // imaginal feature work

  return <div style={{ display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-evenly' }}>
    {board.lanes.map((taskState, i) =>
       <div
          key={taskState} 
          onDragOver={(ev) => { if(over === i) return; setOver(i)}}
          
          style={{ backgroundColor: over === i ? 'teal': 'inherit' }}
       >
        {taskState}
        <div 
        > {/* how to do this... grab element, effect to offset it under the mouse */}
          {board.tasks.filter(t => t.state === taskState).map((t, j) => 
          <div 
            key={t.name}
            draggable="true"
            onDragEnd={(ev) => { 
              console.log(i)
              dispatch({ type:'move', payload:{ taskId:t.id, newState: ['To Do', 'Doing', 'Done'][j] as TaskState }})
            }}
            onMouseDown={() => {setSelected(t.id)}}
            // onMouseUp={(ev) => {console.log(ev.clientX) ,ev.clientY}}
            // onDragEnd={(ev) => {console.log(ev.clientX, ev.clientY)}}
            // onDrag={(ev) => {console.log(ev.clientX, ev.clientY)}}
            style={{
              userSelect:'none',
              // ...(j === selected && pos ? { left:pos[0], top:pos[1] } : {  }),
              ...(selected === t.id ? { backgroundColor:'red'} : {} )
            }}>{t.name}</div>)}
        </div>
      </div>
    )}

  </div>
}