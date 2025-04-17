import { prisma } from '@/lib/prisma'
import { Prisma, Asset } from '@prisma/client'
import { AssetsRepository } from '../assets-repository'

export class PrismaAssetsRepository implements AssetsRepository {
  async create(data: Prisma.AssetCreateInput): Promise<Asset> {
    const asset = await prisma.asset.create({
      data,
    })

    return asset
  }

  async findById(id: string): Promise<Asset | null> {
    const asset = await prisma.asset.findUnique({
      where: {
        id,
      },
    })

    return asset
  }

  async findMany(): Promise<Asset[]> {
    const assets = await prisma.asset.findMany()
    return assets
  }

  async update(id: string, data: Prisma.AssetUpdateInput): Promise<Asset> {
    const asset = await prisma.asset.update({
      where: {
        id,
      },
      data,
    })

    return asset
  }

  async delete(id: string): Promise<void> {
    await prisma.asset.delete({
      where: {
        id,
      },
    })
  }
} 