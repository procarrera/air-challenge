'use client'

import { useState, memo, CSSProperties } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ClipCard from './ClipCard'
import { ClipInterface } from '@/types/ClipItem'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized';
import MansoryVirtualizedGrid from './MansoryVirtualizedGrid'

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

export default function ClipsList({ initialData }: ClipsListProps) {
  const [data, setData] = useState<ClipInterface[]>([...initialData.data.clips])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [nextCursor, setNextCursor] = useState<string>(
    initialData.pagination.cursor,
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
      const responseData = await response.json()
      setData((prevItems: any) => [...prevItems, ...responseData.data.clips])
      setHasMore(responseData.pagination.hasMore)
      setNextCursor(responseData.pagination.cursor)
    } catch (error) {
      console.error(error)
    }
  }

  function handleNewOrder({
    dragged,
    target,
  }: {
    dragged: string
    target: string
  }) {
    function swapElements<T>(array: T[], draggedIndex: number, targetIndex: number,): T[] {
      const newArray = [...array]; // Create a copy of the original array to avoid modifying the original
      // Check if the indices are within the array bounds
      if (draggedIndex < 0 || draggedIndex >= newArray.length || targetIndex < 0 || targetIndex >= newArray.length) {
        throw new Error('Indices out of array bounds');
      }
      // Swap the elements at the specified positions
      const draggedElement = newArray[draggedIndex];
      newArray[draggedIndex] = newArray[targetIndex];
      newArray[targetIndex] = draggedElement;
      return newArray;
    }
    // get the index of the target and put the dragged item in its place
    const targetIndex = data.findIndex((item: any) => item.id === target)
    const draggedIndex = data.findIndex((item: any) => item.id === dragged)
    const reArrangedData = swapElements(data, draggedIndex, targetIndex)
    setData(reArrangedData)
  }

  return (
    <div className="mt-16 max-w-650 flex flex-col gap-8 items-start justify-start">
      <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
        All assets ({initialData.data.total})
      </h1>
      <div className="w-full">
        <MansoryVirtualizedGrid data={data} />
      </div>
    </div>
  )
  /*return (
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
  )*/
}
