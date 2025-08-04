// src/app/api/add-user/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, email, name, avatarUrl } = body

    if (!id || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await prisma.user.upsert({
      where: { email },
      create: {
        id,
        email,
        name,
        avatarUrl,
      },
      update: {
        name,
        avatarUrl,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

