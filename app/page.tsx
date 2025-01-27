import { Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Command Search Demo</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            A modern search experience with keyboard navigation and AI assistance
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8">
          <h2 className="mb-4 text-lg font-semibold">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md bg-muted p-4">
              <span className="text-sm">Open search</span>
              <kbd className="pointer-events-none select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted p-4">
              <span className="text-sm">Navigate results</span>
              <kbd className="pointer-events-none select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                ↑↓
              </kbd>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted p-4">
              <span className="text-sm">Select result</span>
              <kbd className="pointer-events-none select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                ↵
              </kbd>
            </div>
            <div className="flex items-center justify-between rounded-md bg-muted p-4">
              <span className="text-sm">Close search</span>
              <kbd className="pointer-events-none select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                esc
              </kbd>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border bg-card p-8">
          <h2 className="mb-4 text-lg font-semibold">Features</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Global command menu with keyboard shortcuts</li>
            <li>Recent searches and suggestions</li>
            <li>Smart result ranking with affinity scores</li>
            <li>Navigation shortcuts and file search</li>
            <li>AI-powered assistance for longer queries</li>
            <li>Dark mode support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
