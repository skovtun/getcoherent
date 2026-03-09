import { notFound } from 'next/navigation'
import { config } from '../../../../design-system.config'
import ComponentShowcase from './ComponentShowcase'

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const component = config.components?.find((c: { id: string }) => c.id === id)

  if (!component) {
    notFound()
  }

  return <ComponentShowcase component={component} />
}

export async function generateStaticParams() {
  const components = config.components ?? []
  return components.map((c: { id: string }) => ({
    id: c.id,
  }))
}
