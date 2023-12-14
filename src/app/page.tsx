import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Wellcome to the Air Challenge</h1>
      <p>Navigate to our list of boards</p>
      <Link href="/boards/c74bbbc8-602b-4c88-be71-9e21b36b0514">
        Air Branded Boards
      </Link>
    </div>
  )
}
