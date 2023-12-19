'use client'

import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Masonry, useInfiniteLoader } from 'masonic'


/* COMPONENTS */
import { ClipInterface } from '@/types/ClipItem'
import ClipCard from './ClipCard'
import { airAPI } from '@/services/api'


interface ClipsListProps {
  initialData: {
    data: {
      total: number
      clips: ClipInterface[]
    }
    pagination: {
      hasMore: boolean
      cursor: string
    }
  }
}

export default function ClipsList({ boardId }: { boardId: string }) {
  const [clips, setClips] = useState<ClipInterface[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [nextCursor, setNextCursor] = useState<string>('')

  async function loadData() {
    const data = await fetchMoreData()
    const nextItems = data.data.clips
    const pagination = data.pagination
    setClips((current) => [...current, ...nextItems])
    setHasMore(pagination.hasMore)
    setNextCursor(pagination.cursor)
  }

  useEffect(() => {
    loadData()
  }, [])

  const infiniteLoad = useInfiniteLoader(
    async () => {
      const data = await fetchMoreData()
      const nextItems = data.data.clips
      const pagination = data.pagination
      setClips((current) => [...current, ...nextItems])
      setHasMore(pagination.hasMore)
      setNextCursor(pagination.cursor)
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      minimumBatchSize: 32,
      threshold: 3,
    },
  )

  const fetchMoreData = async () => {
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
        boardId: boardId,
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
    <div className="mt-16 max-w-650 flex flex-col gap-8 items-start justify-start">
      <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
        All assets ({0})
      </h1>
      <div className="w-full">
        {clips.length === 0 ? (
          <div className="w-full flex justify-center bg-slate-50 rounded-xl p-4">
            Loading...
          </div>
        ) : (<Masonry
          // Infinite loader
          onRender={infiniteLoad}
          // Provides the data for our grid items
          items={clips}
          // Adds 8px of space between the grid cells
          columnGutter={8}
          // Sets the minimum column width to 172px
          columnWidth={172}
          // Pre-renders 5 windows worth of content
          overscanBy={5}
          // This is the grid item component
          render={ClipCard}
        />)
        }

      </div>
    </div>
  )
  /* return (
    <div className="mt-16 max-w-650 flex flex-col gap-8 items-start justify-start">
      <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
        All assets ({initialData.data.total})
      </h1>
      <div className="w-full">
        <InfiniteScroll
          className="columns-3 md:columns-5 gap-8 relative w-full"
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="w-full flex justify-center bg-slate-50 rounded-xl p-4">
              Loading...
            </div>
          }
          endMessage={
            <div className="w-full flex justify-center bg-slate-50 rounded-xl p-4">
              <b>Yay! You have seen it all</b>
            </div>
          }
        >
          <DndProvider backend={HTML5Backend}>
            {data.map((item: ClipInterface) => {
              return (
                <ClipCard
                  key={item.id}
                  data={item}
                  handleNewOrder={handleNewOrder}
                />
              )
            })}
          </DndProvider>
        </InfiniteScroll>
      </div>
    </div>
  ) */
}
