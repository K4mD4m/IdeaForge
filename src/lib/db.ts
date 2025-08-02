import { PrismaClient } from "@prisma/client"


// Create and export a singleton Prisma Client instance
export const db = new PrismaClient()
