export interface ClipInterface {
  ext: string
  displayName: string
  rotation: number
  description: string | null
  source: string
  type: string
  isDemo: boolean
  title: string | null
  importedName: string
  version: number
  duration: number
  createdAt: string
  accountId: string
  isDefault: boolean
  size: number
  recordedAt: string
  width: number
  id: string
  height: number
  updatedAt: string
  status: string
  assetId: string
  workspaceId: string
  hasOpenDiscussions: boolean
  openDiscussionCount: number
  assetVersionCount: number
  bookmarked: boolean
  resolution: number
  boardCount: number
  openCommentCount: number
  pos: number
  audio: boolean
  remote: boolean
  digitized: boolean
  hash: string | null
  synced: boolean
  storageLocation: string
  avatar: string
  assets: {
    video: string
    previewVideo: string
    seekVideo: string
    image: string
    original: string
  }
  altResolutions: string[]
  tags: string[]
  permissions: {
    canView: boolean
    canDownload: boolean
    canViewAssetVersions: boolean
    canEditCustomFields: boolean
    canDiscuss: boolean
  }
  ownerName: string
  ownerAvatar: string
  owner: {
    ownerName: string
    ownerAvatar: string
  }
  tagCount: number
}
