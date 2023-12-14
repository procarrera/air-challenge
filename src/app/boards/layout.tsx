import TopBar from '@/components/TopBar'

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopBar />
      <div className="p-8 pt-0">{children}</div>
    </>
  )
}
