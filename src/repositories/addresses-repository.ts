import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>
  findById(id: string): Promise<Address | null>
  findByUserId(userId: string): Promise<Address | null>
  update(id: string, data: Partial<Prisma.AddressUpdateInput>): Promise<Address>
}
