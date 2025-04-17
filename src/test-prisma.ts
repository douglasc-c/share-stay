import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Testar a conexão com o banco de dados
    const result = await prisma.$queryRaw`SELECT 1 as result`
    console.log('Conexão com o banco de dados estabelecida com sucesso!')
    console.log('Resultado da consulta:', result)
    
    // Listar as tabelas criadas
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('Tabelas criadas:', tables)
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 