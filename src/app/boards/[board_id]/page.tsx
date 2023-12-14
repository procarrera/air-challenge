import { BoardsList } from '@/components/BoardsList'
import AssetsList from '@/components/Clips/ClipsList'

interface BoardPageProps {
  params: {
    board_id: string
  }
  name: string
  description: string
}

export default async function BoardPage({
  params,
  name = 'Air Branded Boards',
  description = 'With a bunch of stock photos!',
}: BoardPageProps) {
  const response = await fetch(
    `https://api.air.inc/shorturl/bDkBvnzpB/boards/${params.board_id}`,
    {
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
    },
  )
  const data = await response.json()

  return (
    <div>
      <h1 className='text-2xl font-bold'>{name}</h1>
      <p>{description}</p>
      <BoardsList boards={data.data} />
      <AssetsList />
    </div>
  )
}
