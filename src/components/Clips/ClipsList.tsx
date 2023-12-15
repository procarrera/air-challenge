'use client'

import { useEffect, useState } from 'react'
import { Draggable } from 'react-drag-reorder'
import InfiniteScroll from 'react-infinite-scroll-component'
import ClipCard from './ClipCard'
import { ClipInterface } from '@/types/ClipItem'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
  const [data, setData] = useState<any>([...initialData.data.clips])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [nextCursor, setNextCursor] = useState<string>(
    initialData.pagination.cursor,
  )
  const [totalItems, setTotalItems] = useState<number>(initialData.data.total)

  const fetchData = async () => {
    console.log('FETCH ASSETS ROUTE')
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
            cursor: nextCursor === '' ? null : nextCursor,
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
    function moveArrayItem(arr: any[], oldIndex: number, newIndex: number) {
      // Remove the item from the old position
      const item = arr.splice(oldIndex, 1)[0]

      // Insert the item at the new position
      arr.splice(newIndex, 0, item)

      return arr
    }
    console.log('HANDLE NEW ORDER')
    console.log({ dragged, target })
    // get the index of the target and put the dragged item in its place
    const targetIndex = data.findIndex((item: any) => item.id === target)
    const draggedIndex = data.findIndex((item: any) => item.id === dragged)
    const newData = [...data]
    const reArrangedData = moveArrayItem(newData, draggedIndex, targetIndex)
    setData(reArrangedData)
  }

  return (
    <div className="mt-16 max-w-650 flex flex-col gap-8 items-start justify-start">
      <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
        All assets ({initialData.data.total})
      </h1>
      <div className="flex flex-wrap gap-4 relative w-full">
        <InfiniteScroll
          scrollThreshold={0.65}
          className="flex flex-wrap gap-4 relative w-full"
          dataLength={totalItems}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <div className="w-full flex justify-center bg-slate-50 rounded-xl p-4">
              Loading...
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <DndProvider backend={HTML5Backend}>
            {data.map((asset: any, index: number) => (
              <ClipCard
                key={asset.id}
                data={asset}
                handleNewOrder={handleNewOrder}
              />
            ))}
          </DndProvider>
        </InfiniteScroll>
      </div>
    </div>
  )
}
