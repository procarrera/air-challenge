import { SubBoardItem } from '@/types/SubBoardItem'

interface BoardItemCardProps {
  board: SubBoardItem
}

export function BoardItemCard({ board }: BoardItemCardProps) {
  return (
    <li className="max-w-xs w-60 h-60 rounded overflow-hidden shadow-lg relative">
      <div className="h-full">
        {board.thumbnails && (
          <img
            className="w-full h-full object-cover"
            src={board.thumbnails[0]}
            alt="Sunset in the mountains"
          />
        )}
        {!board.thumbnails && <div className="w-full h-full bg-gray-300"></div>}
      </div>
      <h3 className="text-white absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center">
        {board.title}
      </h3>
    </li>
  )
}
