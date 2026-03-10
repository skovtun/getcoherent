import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const manifestPath = join(process.cwd(), 'coherent.components.json')
    const raw = await readFile(manifestPath, 'utf-8')
    const manifest = JSON.parse(raw)
    const entry = manifest.shared?.find((e: { id: string }) => e.id === id)
    if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const codePath = join(process.cwd(), entry.file)
    const code = await readFile(codePath, 'utf-8')
    return NextResponse.json({ entry, code })
  } catch (e) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
