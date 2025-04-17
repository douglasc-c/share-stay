import { prisma } from '@/lib/prisma'
import { Season, SeasonType } from '@prisma/client'
import { SeasonsRepository } from '../seasons-repository'

export class PrismaSeasonsRepository implements SeasonsRepository {
  async create(data: {
    asset: {
      connect: {
        id: string
      }
    }
    type: SeasonType
    order: number
    currentYear: number
  }) {
    const season = await prisma.season.create({
      data: {
        asset: data.asset,
        type: data.type,
        start_date: new Date(),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        year: data.currentYear,
      },
    })

    return season
  }

  async findByAssetId(assetId: string) {
    const seasons = await prisma.season.findMany({
      where: {
        asset_id: assetId,
      },
    })

    return seasons
  }

  async findById(id: string) {
    const season = await prisma.season.findUnique({
      where: { id },
    })

    return season
  }

  async update(id: string, data: Partial<Season>) {
    const season = await prisma.season.update({
      where: { id },
      data,
    })

    return season
  }
} 