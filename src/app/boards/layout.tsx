import TopBar from '@/components/TopBar'

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="p-8 pt-0 lg:pl-24 lg:pr-24">
        <TopBar />
        {children}
      </div>
    </>
  )
}
