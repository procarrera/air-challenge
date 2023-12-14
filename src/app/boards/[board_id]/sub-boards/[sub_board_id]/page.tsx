interface BoardPageProps {
  params: {
    sub_board_id: string
  }
}

export default function BoardPage({ params }: BoardPageProps) {
  return <h1>Sub Board Page - {params.sub_board_id} </h1>
}
