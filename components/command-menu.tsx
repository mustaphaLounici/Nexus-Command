"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/lib/hooks/useSearch'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { SearchResult } from '@/lib/types'
import { Search, Settings, Home, Bell, FileText, MessageSquare, Users } from 'lucide-react'

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { query, recentSearches, suggestedQuestions, setQuery, addRecentSearch } = useSearch()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const navigationItems: SearchResult[] = [
    { id: 'home', type: 'navigation', title: 'Home', url: '/', icon: 'home', score: 100 },
    { id: 'notifications', type: 'navigation', title: 'Notifications', url: '/notifications', icon: 'bell', score: 90 },
    { id: 'files', type: 'navigation', title: 'Files', url: '/files', icon: 'file', score: 80 },
    { id: 'settings', type: 'navigation', title: 'Settings', url: '/settings', icon: 'settings', score: 70 },
    { id: 'dms', type: 'navigation', title: 'Direct Messages', url: '/messages', icon: 'message', score: 60 },
  ]

  // Mock recent files - in a real app, this would come from an API or state management
  const recentFiles: SearchResult[] = [
    { id: 'file1', type: 'file', title: 'Project Proposal.pdf', url: '/files/1', icon: 'file', score: 85 },
    { id: 'file2', type: 'file', title: 'Meeting Notes.md', url: '/files/2', icon: 'file', score: 75 },
    { id: 'file3', type: 'file', title: 'Budget Report.xlsx', url: '/files/3', icon: 'file', score: 65 },
  ]

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="h-4 w-4" />
      case 'bell':
        return <Bell className="h-4 w-4" />
      case 'file':
        return <FileText className="h-4 w-4" />
      case 'settings':
        return <Settings className="h-4 w-4" />
      case 'message':
        return <MessageSquare className="h-4 w-4" />
      case 'users':
        return <Users className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const renderActions = () => {
    const actions = []
    
    if (query.length > 30) {
      // AI first for longer queries
      actions.push(
        <CommandItem
          key="ai"
          onSelect={() => {
            runCommand(() => {
              addRecentSearch(query)
            })
          }}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Ask AI about &quot;{query}&quot;
        </CommandItem>
      )
    }
    
    // Search option always appears
    actions.push(
      <CommandItem
        key="search"
        onSelect={() => {
          runCommand(() => {
            addRecentSearch(query)
          })
        }}
      >
        <Search className="mr-2 h-4 w-4" />
        Search for &quot;{query}&quot;
      </CommandItem>
    )
    
    if (query.length <= 30) {
      // AI second for shorter queries
      actions.push(
        <CommandItem
          key="ai"
          onSelect={() => {
            runCommand(() => {
              addRecentSearch(query)
            })
          }}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Ask AI about &quot;{query}&quot;
        </CommandItem>
      )
    }
    
    return actions
  }

  const filteredFiles = query
    ? recentFiles.filter(file => 
        file.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {query === '' ? (
            <>
              <CommandGroup heading="Suggested">
                {suggestedQuestions.map((question) => (
                  <CommandItem
                    key={question}
                    onSelect={() => {
                      runCommand(() => {
                        setQuery(question)
                        addRecentSearch(question)
                      })
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {question}
                  </CommandItem>
                ))}
              </CommandGroup>
              {recentSearches.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Recent Searches">
                    {recentSearches.map((search) => (
                      <CommandItem
                        key={search.id}
                        onSelect={() => {
                          runCommand(() => {
                            setQuery(search.query)
                            addRecentSearch(search.query)
                          })
                        }}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        {search.query}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          ) : (
            <>
              <CommandGroup heading="Navigation">
                {navigationItems
                  .filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        runCommand(() => {
                          router.push(item.url!)
                          addRecentSearch(query)
                        })
                      }}
                    >
                      {getIcon(item.icon)}
                      <span className="ml-2">{item.title}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
              {filteredFiles.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Recent Files">
                    {filteredFiles.map((file) => (
                      <CommandItem
                        key={file.id}
                        onSelect={() => {
                          runCommand(() => {
                            router.push(file.url!)
                            addRecentSearch(query)
                          })
                        }}
                      >
                        {getIcon(file.icon)}
                        <span className="ml-2">{file.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
              <CommandSeparator />
              <CommandGroup heading="Actions">
                {renderActions()}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
} 