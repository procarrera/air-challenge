'use client'

import { SubBoardsList } from '@/components/BoardsList'
import ClipsList from '@/components/Clips/ClipsList'
import { SelectionProvider } from '@/components/Clips/Context/SelectedIndexesContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface BoardPageProps {
  params: {
    board_id: string
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const name = 'Air Branded Boards'
  const description = 'With a bunch of stock photos!'

  return (
    <div className="relative">
      <div className="flex flex-col items-start justify-between gap-2 pb-8 border-b-2 w-full">
        <h2 className="text-4xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500 font-semibold">{description}</p>
      </div>
      <DndProvider backend={HTML5Backend}>
        <SelectionProvider>
          <SubBoardsList parentBoardId={params.board_id} />
          <ClipsList boardId={params.board_id} />
        </SelectionProvider>
      </DndProvider>
    </div>
  )
}
