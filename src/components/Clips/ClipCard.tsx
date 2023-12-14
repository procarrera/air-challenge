'use client'

import { ClipInterface } from '../../types/ClipItem'

interface ClipCardProps {
  data: ClipInterface
}

export default function ClipCard({ data }: ClipCardProps) {
  return (
    <div
      className="w-fit h-40 rounded overflow-hidden shadow-lg min-w-40 hover:border hover:translate-x-2"
      style={{ aspectRatio: `${data.width}/${data.height}` }}
    >
      {data.type === 'photo' ? (
        <img
          src={data.assets.image}
          alt={data.displayName}
          className="w-full h-full object-cover"
        />
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
