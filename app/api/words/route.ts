import { prisma } from "@/lib/prisma"

export async function GET() {
  const res = await fetch('http://localhost:3000/wordlist.txt')
  const data = await res.text()
  const words = data.split('\n')

  for (const word of words) {
    await prisma.word.upsert({
      where: {
        word,
      },
      update: {},
      create: {
        word,
      },
    })
  }

  return Response.json({ ok: true, words })
}
