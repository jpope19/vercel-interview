'use server'

import { prisma } from "@/lib/prisma"
import { unstable_cache } from "next/cache"

export async function getWords(search: string) {
  console.log('searching for', search)
  const words = await prisma.word.findMany({
    where: {
      word: {
        contains: search,
        mode: 'insensitive'
      }
    }
  })

  return words.map(word => word.word)
}

const getWordsCached = unstable_cache(getWords,
  ['words'],
  {
    revalidate: 60,
  }
)

export async function getWordsButCached(search: string) {
  return getWordsCached(search)
}
