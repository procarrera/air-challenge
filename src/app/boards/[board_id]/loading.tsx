export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-4"></div>
      <div className="w-40 h-4 rounded-full bg-gray-200 animate-pulse"></div>
    </div>
  )
}
