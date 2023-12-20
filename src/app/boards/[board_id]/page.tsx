'use client'

import { SubBoardsList } from '@/components/BoardsList'
import ClipsList from '@/components/Clips/ClipsList'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from '@air/react-drag-to-select'
import { useEffect, useRef, useState } from 'react'

interface BoardPageProps {
  params: {
    board_id: string
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const name = 'Air Branded Boards'
  const description = 'With a bunch of stock photos!'
  const [selectionBox, setSelectionBox] = useState<Box>()
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const selectableItems = useRef<Box[]>([])
  const elementsContainerRef = useRef<HTMLDivElement | null>(null)
  const { DragSelection } = useSelectionContainer({
    eventsElement: elementsContainerRef.current,
    selectionProps: {
      style: {
        borderRadius: 4,
        opacity: 0.5,
        zIndex: 1000,
      },
    },
    onSelectionChange: (box) => {
      console.log('OnSelectionChange')
    },
    onSelectionStart: () => {
      console.log('OnSelectionStart')
    },
    onSelectionEnd: () => console.log('OnSelectionEnd'),
    isEnabled: true,
  })

  useEffect(() => {
    if (elementsContainerRef.current) {
      Array.from(elementsContainerRef.current.children).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect()
        selectableItems.current.push({
          left,
          top,
          width,
          height,
        })
      })
    }
  }, [])

  return (
    <div className="relative" ref={elementsContainerRef}>
      <DragSelection />
      <div className="flex flex-col items-start justify-between gap-2 pb-8 border-b-2 w-full">
        <h2 className="text-4xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500 font-semibold">{description}</p>
      </div>
      <DndProvider backend={HTML5Backend}>
        <SubBoardsList parentBoardId={params.board_id} />
        <ClipsList boardId={params.board_id} />
      </DndProvider>
    </div>
  )
}
