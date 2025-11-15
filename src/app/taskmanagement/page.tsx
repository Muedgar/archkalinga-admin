'use client'

import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import OneDraggable from "./components/1_1000/draggable"
import OneDroppable from "./components/1_1000/droppable"
import { useState } from "react"

export default function DnD() {

  const [draggables, setDraggables] = useState([1,2,3,4,5])
  const [droppables, setDroppables] = useState<{id: string, items: number[]}[]>([])

  
  /*
  {
      id: 'droppable_1',
      items: []
    }
  */

  const handleDragEnd = (e: DragEndEvent) => {


    
    // process it.
    if (!e.over) return;
    
    const activeId = Number(e.active.id)
    const droppableId = String(e.over.id)

    // find the target droppable
    const existing = droppables.find(d => d.id === droppableId)
    if (!existing) return

    // this is existing droppable.
    // if this droppable already has 
    

      // check if the draggable is already inside the target droppable
  const isAlreadyInTarget = existing.items.includes(activeId)
  console.log('already existing:  ', isAlreadyInTarget, 'items: ', existing)
  if (isAlreadyInTarget) {
    // before doing nothing remove the place holder
    const updatedDroppables = droppables.map(d => ({...d, items: [...existing.items.filter(i => i !== 0)]}))
    setDroppables(updatedDroppables);
    // then do nothing
    return
  } // already there, do nothing


    // remove the item from draggables (immutable)
    setDraggables(prev => prev.filter(d => d !== activeId))

    // create an updated droppable (immutable) and replace it in the array
    //  { ...droppable, items: droppable.items.filter(i => i !== 0) }
    // this removes placeholder from the updated droppable.
    const updatedDroppable = { ...existing, items: [...existing.items.filter(i => i !== 0), activeId] }
    const updatedDroppables = droppables.map(d => ({...d, items: [...existing.items.filter(i => i !== 0)]}))
    const newDroppables = updatedDroppables.map(d => d.id === droppableId ? updatedDroppable : d)

    setDroppables(newDroppables);
  }

  /*
  Multiple Drop Zones with Dynamic Creation
  Create functionality to dynamically add new droppable zones when a button is clicked. 
  Each new zone should have a unique ID and maintain its own items array.
  */

  // have an array of object

  const addDroppableZone = () => {
    const id = String(Math.floor(Math.random() * 10000) + 100000);

    // check for unique droppable
    const existingDroppable = droppables.find(d => d.id === id);
    if (existingDroppable) {
      alert(`Droppable with Id: ${id}. Already exists.`)
      return;
    }

    // create new droppable
    const newDroppable = {
      id,
      items: []
    }

    const newDroppables = [...droppables, newDroppable]
    setDroppables(newDroppables);
  }

  /*
  Drag Preview Customization
  Implement custom drag previews that show a smaller version of the dragged item with opacity, 
  rather than using the default browser preview.
  */
  const handleDragOver = (e: DragOverEvent) => {
    // helper function to remove placeholder
    
    console.log('Drag over: ', e)
    if (!e.over) {
      // remove any the place holder
      const newDroppables = droppables.map(droppable => {
        return { ...droppable, items: droppable.items.filter(i => i !== 0) }
      })
      setDroppables(newDroppables)
      // and then return
      return
    };
    const droppableId = String(e.over.id);

    // push place holder
   const droppable = droppables.find(d => d.id === droppableId);
   if (!droppable) return;

   const updatedDroppable = { ...droppable, items: [...droppable.items, 0] }

   const removePlaceholdersInDroppables = droppables.map(droppable => {
        return { ...droppable, items: droppable.items.filter(i => i !== 0) }
      })
   const newDroppables = removePlaceholdersInDroppables.map(d => d.id === droppableId ? updatedDroppable : d)
   setDroppables(newDroppables);
  }

  return (
    <div className="w-screen h-screen bg-black/30">
      <button onClick={() => addDroppableZone()}>New Droppable</button>
      <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div>
      {draggables && draggables.map((draggable, index) => (
        <OneDraggable key={index} id={draggable}>
        <div className="w-[200px] h-10 bg-black rounded-lg">
          <p className="text-white">droppable {draggable}</p>
        </div>
      </OneDraggable>
    ))}

      <div className="grid grid-cols-3 gap-2">
        {droppables && droppables.map((droppable, index) => (
      <OneDroppable key={index} id={droppable.id}>
        <div className="w-[300px] h-[500px] bg-slate-400 rounded-sm">
          {/* render all children */}
          {droppable.items && droppable.items.map((draggable, index) => (
        <OneDraggable key={index} id={draggable}>
        <div className="w-[200px] h-10 bg-black rounded-lg">
          <p className="text-white">droppable {draggable}</p>
        </div>
      </OneDraggable>
    ))}
        </div>
      </OneDroppable>
      ))}
      </div>
        </div>
      </DndContext>
    </div>
  )
}