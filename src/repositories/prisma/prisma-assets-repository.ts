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

  async findByIdWithRelations(id: string) {
    const asset = await prisma.asset.findUnique({
      where: {
        id,
      },
      include: {
        addresses: true,
        seasons: true,
        shares: {
          include: {
            users: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                  }
                }
              }
            }
          }
        },
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          }
        }
      }
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