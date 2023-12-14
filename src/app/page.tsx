import Link from 'next/link'

export default async function Home() {
  return (
    <div className="h-screen flex flex-col h-full w-full items-center justify-center">
      <h1 className="text-4xl font-bold">Wellcome to the Air Challenge</h1>
      <p>Navigate to our list of boards</p>
      <div className="flex flex-row space-x-4 mt-8">
        <Link
          className="p-10 border rounded-2xl hover:bg-slate-100 hover:font-bold transition-all"
          href="/boards/c74bbbc8-602b-4c88-be71-9e21b36b0514"
        >
          Air Branded Boards
        </Link>
      </div>
    </div>
  )
}
