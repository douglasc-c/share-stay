import { Asset, Prisma } from '@prisma/client'

export interface AssetsRepository {
  create(data: Prisma.AssetCreateInput): Promise<Asset>
  findById(id: string): Promise<Asset | null>
  findByIdWithRelations(id: string): Promise<(Asset & {
    addresses: {
      id: string
      street: string
      number: string
      complement: string | null
      neighborhood: string
      city: string
      state: string
      zip_code: string
      country: string
    }[]
    seasons: {
      id: string
      type: string
      start_date: Date
      end_date: Date
      year: number
    }[]
    shares: {
      id: string
      current_season: string
      season_order: number
      current_year: number
      users: {
        user: {
          id: string
          firstName: string
          lastName: string
          email: string
        }
      }[]
    }[]
    users: {
      id: string
      firstName: string
      lastName: string
      email: string
    }[]
  }) | null>
  findMany(): Promise<Asset[]>
  update(id: string, data: Prisma.AssetUpdateInput): Promise<Asset>
  delete(id: string): Promise<void>
} 