'use server'

import { prisma } from "@/lib/prisma"

export async function getWords(search: string) {
  const words = await prisma.word.findMany({
    where: {
      word: {
        contains: search,
        mode: 'insensitive'
      }
    }
  })

  return words
}
