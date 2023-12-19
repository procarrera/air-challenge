import { ClipInterface } from '@/types/ClipItem'

export default function ClipCard({ data }: { data: ClipInterface }) {
  return (
    <div
      className={
        'w-full mb-4 rounded overflow-hidden shadow-lg min-w-40 transition-all duration-200 hover:border-4 hover:border-blue-500'
      }
    >
      {data.type === 'photo' ? (
        <div className="relative w-full h-full">
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
