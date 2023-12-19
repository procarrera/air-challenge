import { SubBoardItem } from '@/types/SubBoardItem'

interface BoardItemCardProps {
  subBoard: SubBoardItem
}

export function BoardItemCard({ subBoard }: BoardItemCardProps) {
  return (
    <li className="lg:max-w-xl w-full md:w-60 h-60 rounded overflow-hidden shadow-lg relative">
      <div className="h-full">
        {subBoard.thumbnails && (
          <img
            className="w-full h-full object-cover"
            src={subBoard.thumbnails[0]}
            alt="Sunset in the mountains"
          />
        )}
        {!subBoard.thumbnails && <div className="w-full h-full bg-gray-300"></div>}
      </div>
      <h3 className="text-white absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center">
        {subBoard.title}
      </h3>
    </li>
  )
}
