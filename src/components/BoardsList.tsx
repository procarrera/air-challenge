import { BoardsListProps } from '../types/BoardListProps'
import { BoardItemCard } from './BoardItemCard'

export function BoardsList({ boards }: BoardsListProps) {
  return (
    <div className='mt-8'>
    <h1 className="mb-4 text-gray-600 text-sm uppercase font-bold">Boards ({boards.length})</h1>
    <ul className="flex gap-4 flex-wrap">
        {boards.map((board) => (
            <BoardItemCard key={board.id} board={board}/>
        ))}
    </ul>
    </div>
  )
}
