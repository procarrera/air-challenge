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
        'authority': 'api.air.inc',
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': '',
        'content-type': 'application/json',
        'origin': 'https://app.air.inc',
        'referer': 'https://app.air.inc/',
        'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'x-air-board-context': '',
      },
      body: JSON.stringify({
        limit: 20,
        type: 'all',
        cursor: null,
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

  console.log('Initial data Cursor: ', clipsData.pagination.cursor)
  console.log("Initial data: ", clipsData.data.clips.length)
  console.log("Total items: ", clipsData.data.total)

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
