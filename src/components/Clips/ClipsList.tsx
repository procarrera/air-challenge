'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Masonry, useInfiniteLoader } from 'masonic'

import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from '@air/react-drag-to-select'

/* SERVICES */
import { airAPI } from '@/services/api'

/* COMPONENTS */
import { ClipInterface } from '@/types/ClipItem'
import ClipCard from './ClipCard'
import {
  SelectionContext,
  SelectionProvider,
} from './Context/SelectedIndexesContext'

interface BoardsAPIResponseInterface {
  data: {
    clips: ClipInterface[]
    total: number
  }
  pagination: {
    hasMore: boolean
    cursor: null | string
  }
}

export default function ClipsList({ boardId }: { boardId: string }) {
  const { selectedIndexesCtx, updateSelectedIndexesCtx } =
    useContext(SelectionContext)
  const [clips, setClips] = useState<ClipInterface[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [totalClips, setTotalClips] = useState<number>(0)

  const [selectionBox, setSelectionBox] = useState<Box>()
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const selectableItems = useRef<Box[]>([])
  const elementsContainerRef = useRef<HTMLDivElement | null>(null)

  const { DragSelection } = useSelectionContainer({
    onSelectionChange: (box) => {
      setSelectionBox(box)
      const indexesToSelect: number[] = []
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(box, item)) {
          indexesToSelect.push(index)
        }
      })

      setSelectedIndexes(indexesToSelect)
      updateSelectedIndexesCtx(indexesToSelect)
    },
    onSelectionStart: () => {
      console.log('OnSelectionStart')
    },
    onSelectionEnd: () => console.log('OnSelectionEnd'),
    selectionProps: {
      style: {
        borderRadius: 4,
        opacity: 0.5,
        zIndex: 99,
      },
    },
    isEnabled: true,
  })

  useEffect(() => {
    const clipCards = document.querySelectorAll('[data-clip-index]')
    if (!clipCards) return
    clipCards.forEach((item) => {
      console.log(item)
      const { left, top, width, height } = item.getBoundingClientRect()
      selectableItems.current.push({
        left,
        top,
        width,
        height,
      })
    })
  }, [clips])

  async function loadData() {
    if (!hasMore) return
    const data = await fetchMoreData()
    if (!data) return
    const nextItems = data.data.clips
    const pagination = data.pagination
    setClips((current) => [
      ...current,
      ...nextItems.filter(
        (item: ClipInterface) =>
          !current.some((existingItem) => existingItem.id === item.id),
      ),
    ])
    setHasMore(pagination.hasMore)
    setNextCursor(pagination.cursor)
    setTotalClips(data.data.total)
  }

  useEffect(() => {
    loadData()
  }, [])

  const infiniteLoad = useInfiniteLoader(loadData, {
    isItemLoaded: (index, items) => !!items[index],
    minimumBatchSize: 20,
    threshold: 5,
    totalItems: totalClips,
  })

  async function fetchMoreData(): Promise<
    BoardsAPIResponseInterface | undefined
  > {
    try {
      const res = await airAPI.post(`/clips/search`, {
        limit: 20,
        type: 'all',
        withOpenDiscussionStatus: true,
        cursor: nextCursor,
        filters: {
          board: {
            is: boardId,
          },
        },
        boardId,
        sortField: {
          direction: 'desc',
          name: 'dateModified',
        },
        descendantBoardId: boardId,
      })
      const data = res.data
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="mt-16 max-w-650 flex flex-col gap-8 items-start justify-start relative"
      ref={elementsContainerRef}
    >
      <DragSelection />
      <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
        All assets ({totalClips})
      </h1>
      <div className="w-full relative clips-wrapper">
        {clips.length === 0 ? (
          <div className="w-full flex justify-center bg-slate-50 rounded-xl p-4">
            Loading...
          </div>
        ) : (
          <Masonry
            // Infinite loader
            onRender={infiniteLoad}
            // Provides the data for our grid items
            items={clips}
            // Adds 8px of space between the grid cells
            columnGutter={8}
            // Sets the minimum column width to 220px
            columnWidth={220}
            // Pre-renders 3 windows worth of content
            overscanBy={3}
            // This is the grid item component
            render={ClipCard}
          />
        )}
      </div>
    </div>
  )
}
