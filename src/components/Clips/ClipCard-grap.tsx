'use client'

import { useContext, useRef } from 'react'
import { ClipInterface } from '../../types/ClipItem'
import type { DragSourceMonitor, DropTargetMonitor } from 'react-dnd'
import { useDrag, useDrop } from 'react-dnd'

interface ClipCardProps {
  data: ClipInterface
  style?: React.CSSProperties
}
interface DropResult {
  allowedDropEffect: string
  dropEffect: string
  name: string
  index: number
  id: string
}

export default function ClipCard({ data, style }: ClipCardProps) {

  function handleMerge({ dragged, target }: { dragged: string; target: string }) {
    alert(`Merging ${dragged} into ${target}`)
  }

  const ref = useRef(null)
  const [, drag] = useDrag(
    () => ({
      type: 'ASSET',
      item: { id: data.id },
      collect: (monitor: DragSourceMonitor) => {
        if (monitor.isDragging()) {
          console.log(`Dragging Index: ${data.id}}`)
        }
        return { opacity: monitor.isDragging() ? 0.4 : 1 }
      },
    }),
    [data.id],
  )
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ASSET',
    drop: (item: { id: string }, monitor) => {
      if (monitor.isOver() && handleMerge) {
        handleMerge({ dragged: item.id, target: data.id })
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  drag(ref)
  drop(ref)

  return (
    <div
      ref={ref}
      className={`w-full mb-4 rounded overflow-hidden shadow-lg min-w-40 hover:border-2 transition-all duration-300 ${isOver ? 'border-4 border-blue-500' : ''
        }`}
      style={{ aspectRatio: `${data.width}/${data.height}`, ...style }}
    >
      {data.type === 'photo' ? (
        <div className="relative w-full h-full">
          <img
            src={data.assets.image}
            alt={data.displayName}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <video
          autoPlay
          playsInline
          loop
          muted
          src={data.assets.previewVideo}
          controls={false}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}
