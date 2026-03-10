import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const path = join(process.cwd(), 'coherent.components.json')
    const raw = await readFile(path, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ shared: [], nextId: 1 })
  }
}
