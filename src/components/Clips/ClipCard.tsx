'use client'

import { useContext, useRef, useState } from 'react'
import { ClipInterface } from '../../types/ClipItem'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag, useDrop } from 'react-dnd'
import LoadingMedia from '../LoadingMedia'
import { SelectionContext } from './Context/SelectedIndexesContext'

interface ClipCardProps {
  data: ClipInterface
  style?: React.CSSProperties
  index?: number
  width?: number
}

export default function ClipCard({ index, width, data, style }: ClipCardProps) {
  const { selectedIndexesCtx, updateSelectedIndexesCtx } =
    useContext(SelectionContext)
  const [isImageLoaded, setImageLoaded] = useState(false)
  function handleMerge({
    dragged,
    target,
  }: {
    dragged: string
    target: string
  }) {
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
      data-clip-index={index}
      className={`w-full mb-4 rounded overflow-hidden shadow-lg min-w-40 hover:border-2 transition-all duration-300
      ${isOver ? 'border-4 border-blue-500' : ''}
      ${
        index && selectedIndexesCtx.includes(index)
          ? 'border-4 border-blue-500'
          : ''
      }`}
      style={{ aspectRatio: `${data.width}/${data.height}`, ...style }}
    >
      {data.type === 'photo' ? (
        <div className="relative w-full h-full">
          {!isImageLoaded && <LoadingMedia />}
          <img
            src={data.assets.image}
            alt={data.displayName}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
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
