import { Prisma, Share } from '@prisma/client'

export interface SharesRepository {
  create(data: Prisma.ShareCreateInput): Promise<Share>
  findById(id: string): Promise<Share | null>
  findByAssetId(assetId: string): Promise<Share[]>
  findByUserId(userId: string): Promise<Share[]>
  findMany(): Promise<Share[]>
  countByAssetId(assetId: string): Promise<number>
  update(id: string, data: Prisma.ShareUpdateInput): Promise<Share>
  delete(id: string): Promise<void>
}
