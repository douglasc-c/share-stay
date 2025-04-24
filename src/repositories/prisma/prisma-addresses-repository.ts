import { prisma } from '@/lib/prisma'
import { Address, Prisma } from '@prisma/client'
import { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    const address = await prisma.address.create({
      data,
    })

    return address
  }

  async findById(id: string): Promise<Address | null> {
    const address = await prisma.address.findUnique({
      where: { id },
    })

    return address
  }

  async findByUserId(userId: string): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: { user_id: userId },
    })

    return address
  }

  async update(
    id: string,
    data: Partial<Prisma.AddressUpdateInput>,
  ): Promise<Address> {
    const address = await prisma.address.update({
      where: { id },
      data,
    })

    return address
  }
}
