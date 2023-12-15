import { BoardsList } from '@/components/BoardsList'
import ClipsList from '@/components/Clips/ClipsList'

interface BoardPageProps {
  params: {
    board_id: string
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const name = 'Air Branded Boards'
  const description = 'With a bunch of stock photos!'

  const [res1, res2] = await Promise.all([
    fetch(`https://api.air.inc/shorturl/bDkBvnzpB/boards/${params.board_id}`, {
      cache: 'no-store', // SSG - do not cache
      method: 'POST',
      headers: {
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        authorization: '',
        'content-type': 'application/json',
        origin: 'https://app.air.inc',
        referer: 'https://app.air.inc',
      },
    }),
    fetch(`https://api.air.inc/shorturl/bDkBvnzpB/clips/search`, {
      method: 'POST',
      cache: 'no-store', // SSG - do not cache
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
        filters: {
          board: {
            is: params.board_id,
          },
        },
        boardId: params.board_id,
        sortField: {
          direction: 'desc',
          name: 'dateModified',
        },
        descendantBoardId: params.board_id,
      }),
    }),
  ])

  const boardsData = await res1.json()
  const clipsData = await res2.json()

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-2 pb-8 border-b-2 w-full">
        <h2 className="text-4xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500 font-semibold">{description}</p>
      </div>
      <BoardsList boards={boardsData.data} />
      <ClipsList initialData={clipsData} />
    </div>
  )
}
