'use client'

import { Github, Linkedin } from 'lucide-react'


export function Footer() {
  return (
    <footer className="border-t border-border/10 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Coherent Design Method · by Sergei Kovtun
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/sergeikovtun/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/coherent-design/coherent" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}
