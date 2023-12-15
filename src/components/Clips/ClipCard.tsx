'use client'

import { useRef } from 'react'
import { ClipInterface } from '../../types/ClipItem'
import type { DragSourceMonitor, DropTargetMonitor } from 'react-dnd'
import { useDrag, useDrop } from 'react-dnd'

interface ClipCardProps {
  data: ClipInterface
  allowedDropEffect?: string
  index: number
  handleNewOrder?: (dragIndex: number, hoverIndex: number) => void
}
interface DropResult {
  allowedDropEffect: string
  dropEffect: string
  name: string
  index: number
}

export default function ClipCard({ data, index, allowedDropEffect = "any", handleNewOrder }: ClipCardProps) {
  const ref = useRef(null)
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: 'ASSET',
      item: { name: data.id, index: index },
      end(draggedItem, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (dropResult && handleNewOrder) {
          const draggedIndex = draggedItem.index;
          const dropIndex = dropResult.index;
          handleNewOrder(draggedIndex, dropIndex);
        }
      },
      collect: (monitor: DragSourceMonitor) => {
        if (monitor.isDragging()) {
          console.log(`Dragging Index: ${index}`);
        }
        return { opacity: monitor.isDragging() ? 0.4 : 1 };
      },
    }),
    [data.id],
  );
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ASSET',
    drop: (item: { id: string, index: number }, monitor) => {
      if (monitor.isOver() && handleNewOrder) {
        handleNewOrder(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drag(ref);
  drop(ref);

  return (
    <div
      ref={ref}
      className={`w-fit h-40 rounded overflow-hidden shadow-lg min-w-40 hover:border-2 transition-all duration-300 ${isOver ? 'border-4 border-blue-500' : ''}`}
      style={{ aspectRatio: `${data.width}/${data.height}` }}
    >
      {data.type === 'photo' ? (
        <img
          src={data.assets.image}
          alt={data.displayName}
          className="w-full h-full object-cover"
        />
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
