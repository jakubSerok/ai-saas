import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

// This prevents the route from being evaluated during build time
export const dynamic = "force-dynamic"

let prisma: PrismaClient

// Initialize Prisma client lazily
function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export async function GET(request: NextRequest){
    try {
        const videos = await getPrismaClient().video.findMany({
            orderBy: {createdAt: "desc"}
        })
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error: "Error fetching videos"}, {status: 500})
    }
}
