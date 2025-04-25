import { Prisma, Share } from '@prisma/client'
import { SharesRepository } from '../shares-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSharesRepository implements SharesRepository {
  async create(data: Prisma.ShareCreateInput): Promise<Share> {
    const share = await prisma.share.create({
      data,
    })

    return share
  }

  async findById(id: string): Promise<Share | null> {
    const share = await prisma.share.findUnique({
      where: {
        id,
      },
    })

    return share
  }

  async findByAssetId(assetId: string): Promise<Share[]> {
    const shares = await prisma.share.findMany({
      where: {
        asset_id: assetId,
      },
    })

    return shares
  }

  async findByUserId(userId: string): Promise<Share[]> {
    const shares = await prisma.share.findMany({
      where: {
        users: {
          some: {
            user_id: userId,
          },
        },
      },
    })

    return shares
  }

  async findMany(): Promise<Share[]> {
    const shares = await prisma.share.findMany()
    return shares
  }

  async countByAssetId(assetId: string): Promise<number> {
    const count = await prisma.share.count({
      where: {
        asset_id: assetId,
      },
    })

    return count
  }

  async update(id: string, data: Prisma.ShareUpdateInput): Promise<Share> {
    const share = await prisma.share.update({
      where: {
        id,
      },
      data,
    })

    return share
  }

  async delete(id: string): Promise<void> {
    await prisma.share.delete({
      where: {
        id,
      },
    })
  }
}
