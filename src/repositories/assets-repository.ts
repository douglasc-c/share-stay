import { Asset, Prisma } from '@prisma/client'

export interface AssetsRepository {
  create(data: Prisma.AssetCreateInput): Promise<Asset>
  findById(id: string): Promise<Asset | null>
  findMany(): Promise<Asset[]>
} 