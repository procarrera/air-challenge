'use client'

import { useEffect, useState } from 'react'
import { ClipInterface } from '@/types/ClipItem'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Masonry, useInfiniteLoader } from 'masonic'

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

const ClipCard = ({ data }: { data: ClipInterface }) => (
  <div
    className={
      'w-full mb-4 rounded overflow-hidden shadow-lg min-w-40 transition-all duration-300 border-4 border-transparent hover:border-4 hover:border-blue-500'
    }
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

export default function ClipsList() {
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
      const response = await fetch(
        `https://api.air.inc/shorturl/bDkBvnzpB/clips/search`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            authorization: '',
            'content-type': 'application/json',
            origin: 'https://app.air.inc',
            referer: 'https://app.air.inc/',
          },
          body: JSON.stringify({
            limit: 20,
            type: 'all',
            withOpenDiscussionStatus: true,
            cursor: nextCursor,
            filters: {
              board: {
                is: 'c74bbbc8-602b-4c88-be71-9e21b36b0514',
              },
            },
            boardId: 'c74bbbc8-602b-4c88-be71-9e21b36b0514',
            sortField: {
              direction: 'desc',
              name: 'dateModified',
            },
            descendantBoardId: 'c74bbbc8-602b-4c88-be71-9e21b36b0514',
          }),
        },
      )
      const data = await response.json()
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
