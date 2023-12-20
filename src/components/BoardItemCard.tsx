import { SubBoardItem } from '@/types/SubBoardItem'
import { useState } from 'react';
import { Shell } from 'lucide-react';

interface BoardItemCardProps {
  subBoard: SubBoardItem
}

const LoadingImage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Shell
        className="w-8 h-8 text-gray-200 animate-spin"
        size={32}
        strokeWidth={2} />
    </div>
  );
};

export function BoardItemCard({ subBoard }: BoardItemCardProps) {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <li className="lg:max-w-xl w-full md:w-60 h-60 rounded overflow-hidden shadow-lg relative">
      <div className="h-full">
        {subBoard.thumbnails && (
          <>
            {!isImageLoaded && <LoadingImage />}
            <img
              className="w-full h-full object-cover"
              src={subBoard.thumbnails[0]}
              alt="Sunset in the mountains"
              onLoad={() => setImageLoaded(true)}
              style={isImageLoaded ? {} : { display: 'none' }}
            />
          </>
        )}
        {!subBoard.thumbnails && (
          <div className="w-full h-full bg-gray-300"></div>
        )}
      </div>
      <h3 className="text-white absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center">
        {subBoard.title}
      </h3>
    </li>
  );
}
