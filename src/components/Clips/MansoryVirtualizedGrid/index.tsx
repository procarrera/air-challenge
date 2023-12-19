import { ClipInterface } from "@/types/ClipItem";
import { useEffect, useRef, useState } from "react";

import { Masonry, useInfiniteLoader } from "masonic";

interface ClipCardProps {
    data: ClipInterface
}

const ClipCard = ({ data }: ClipCardProps) => {
    return (
        <div>
            {data.type === 'photo' ? (
                <div className='relative w-full h-full'>
                    <img
                        src={data.assets.image}
                        alt={data.displayName}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <video
                    autoPlay
                    playsInline
                    loop
                    muted
                    src={data.assets.previewVideo}
                    controls={false}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    )
}

interface MansoryVirtualizedGridProps {
    data: ClipInterface[]
}

export default function MansoryVirtualizedGrid({ data }: MansoryVirtualizedGridProps) {
    const [items, setItems] = useState<ClipInterface[]>(data)
    const loadMore = useInfiniteLoader(
        async (startIndex, stopIndex, currentItems) => {
          const nextItems = await getFakeItemsPromise(startIndex, stopIndex);
          setItems((current) => [...current, ...nextItems]);
        },
        {
          isItemLoaded: (index, items) => !!items[index],
          minimumBatchSize: 32,
          threshold: 3
        }
      );
    return (
        <div>
            <Masonry
                // Provides the data for our grid items
                items={data}
                // Adds 8px of space between the grid cells
                columnGutter={8}
                // Sets the minimum column width to 172px
                columnWidth={172}
                // Pre-renders 5 windows worth of content
                overscanBy={5}
                // This is the grid item component
                render={ClipCard}
            />
        </div>
    )

};