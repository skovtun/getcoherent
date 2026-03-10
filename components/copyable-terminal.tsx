'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyableInlineProps {
  command: string
}

export function CopyableInline({ command }: CopyableInlineProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [command])

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-3 w-full sm:w-auto min-w-0 max-w-full rounded-full border border-border/30 bg-zinc-950 px-5 py-3.5 font-mono text-sm transition-all hover:border-border/50 overflow-hidden"
    >
      <span className="text-zinc-500 select-none shrink-0">$</span>
      <span className="text-emerald-400 flex-1 min-w-0 text-left truncate">{command}</span>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
      ) : (
        <Copy className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0" />
      )}
    </button>
  )
}

interface CopyableBlockProps {
  commands: string[]
  title?: string
}

export function CopyableBlock({ commands, title = 'Terminal' }: CopyableBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(commands.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [commands])

  return (
    <div className="rounded-2xl border border-border/30 bg-zinc-950 overflow-hidden min-w-0 max-w-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/10">
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{title}</span>
        <button
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 shrink-0"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="px-4 py-3.5 font-mono text-sm leading-7 space-y-2 min-w-0 overflow-x-auto">
        {commands.map((cmd, i) => (
          <div key={i} className="flex items-center gap-2 min-w-0">
            <span className="text-zinc-500 select-none shrink-0">$</span>
            <span className="text-emerald-400 min-w-0 break-all">{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
