import { Search } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-between gap-4 w-full mb-16 mt-8">
      <div
        className="flex flex-row gap-2 w-full border rounded-full p-2"
        style={{ maxWidth: '400px' }}
      >
        <Search size={24} />
        <input
          type="text"
          className="w-full bg-transparent outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row gap-2 min-w-fit">
        <button className="bg-slate-950 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md">
          Save changes
        </button>
        <button className="text-gray-500 hover:text-gray-600 border font-bold py-2 px-4 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  )
}
