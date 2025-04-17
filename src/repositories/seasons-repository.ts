import { Season, SeasonType } from '@prisma/client'

export interface SeasonsRepository {
  create(data: {
    asset: {
      connect: {
        id: string
      }
    }
    type: SeasonType
    currentYear: number
  }): Promise<Season>
  findByAssetId(assetId: string): Promise<Season[]>
  findById(id: string): Promise<Season | null>
  update(id: string, data: Partial<Season>): Promise<Season>
} 