import { NextResponse } from 'next/server'
import { config } from '@/design-system.config'

export async function GET() {
  try {
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json(
      { components: [], pages: [], tokens: { colors: { light: {}, dark: {} }, spacing: {}, typography: {}, radius: {} } },
      { status: 200 }
    )
  }
}
