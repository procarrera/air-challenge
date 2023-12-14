export interface SubBoardItem {
  id: string
  creatorId: string
  workspaceId: string
  parentId: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  isDemo: null | boolean
  hierarchyUpdatedAt: string
  hasCurrentUser: boolean
  pos: number
  ancestors: {
    id: string
    title: string
  }[]
  thumbnails: string[]
  permissions: {
    canViewClips: boolean
    canContribute: boolean
    canDownloadClips: boolean
    canContributeAnon: boolean
    canDiscuss: boolean
    canViewAssetVersions: boolean
    canEditCustomFields: boolean
    canEditFormAssets: boolean
  }
  customFields: any[]
}
