'use client'
import { Suspense, useEffect, useState } from 'react'
import { BoardItemCard } from './BoardItemCard'

import { airAPI } from '@/services/api'

interface SubBoardInterface {
  id: string;
  creatorId: string;
  workspaceId: string;
  parentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDemo: null | boolean;
  hierarchyUpdatedAt: string;
  hasCurrentUser: boolean;
  pos: number;
  ancestors: {
    id: string;
    title: string;
  }[];
  thumbnails: string[];
  permissions: {
    canViewClips: boolean;
    canContribute: boolean;
    canDownloadClips: boolean;
    canContributeAnon: boolean;
    canDiscuss: boolean;
    canViewAssetVersions: boolean;
    canEditCustomFields: boolean;
    canEditFormAssets: boolean;
  };
  customFields: any[];
}


interface BoardsAPIResponseInterface {
  data: SubBoardInterface[];
  total: number;
  pagination: {
    hasMore: boolean;
    cursor: null | string;
  };
}

const Loading = () => (
  <div className="mt-8">
    <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
      <div className='animate-pulse bg-gray-300 w-60 h-4 rounded-full'></div>
    </h1>
    <ul className="flex gap-4 flex-wrap">
      <li className="animate-pulse bg-gray-300 lg:max-w-xl w-full md:w-60 h-60 rounded overflow-hidden shadow-lg relative">
        <div className="h-full">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </li>
      <li className="animate-pulse bg-gray-300 lg:max-w-xl w-full md:w-60 h-60 rounded overflow-hidden shadow-lg relative">
        <div className="h-full">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </li>
      <li className="animate-pulse bg-gray-300 lg:max-w-xl w-full md:w-60 h-60 rounded overflow-hidden shadow-lg relative">
        <div className="h-full">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </li>
      <li className="animate-pulse bg-gray-300 lg:max-w-xl w-full md:w-60 h-60 rounded overflow-hidden shadow-lg relative">
        <div className="h-full">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </li>
    </ul>
  </div>
);

export function SubBoardsList({ parentBoardId }: { parentBoardId: string }) {
  const [totalSubBoards, setTotalSubBoards] = useState<number>(0)
  const [subBoards, setSubBoards] = useState<SubBoardInterface[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [nextCursor, setNextCursor] = useState<string>('')

  async function loadData() {
    const res = await fectMoreData()
    setSubBoards((current) => [...current, ...res.data.filter((item) => !current.some((existingItem) => existingItem.id === item.id))])
    setTotalSubBoards(res.total)
    setHasMore(hasMore)
    setNextCursor(nextCursor)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function fectMoreData(): Promise<BoardsAPIResponseInterface> {
    const res = await airAPI.post(`/boards/${parentBoardId}`, {
      cursor: nextCursor
    })
    const data = res.data
    return data;
  }

  if (subBoards.length === 0) {
    return <Loading />
  }

  return (
    <div className="mt-8">
      <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">
        Boards ({totalSubBoards})
      </h1>
      <ul className="flex gap-4 flex-wrap">
        {subBoards.map((subBoard) => (
          <BoardItemCard key={subBoard.id} subBoard={subBoard} />
        ))}
      </ul>
    </div>
  )
}
