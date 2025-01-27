export type SearchResultType = 'navigation' | 'file' | 'dm' | 'search' | 'ai'

export type SearchResult = {
  id: string
  type: SearchResultType
  title: string
  subtitle?: string
  url?: string
  icon?: string
  score: number // Affinity score (0-100)
  lastAccessed?: number // Timestamp of last access
  accessCount?: number // Number of times accessed
}

export type RecentSearch = {
  id: string
  query: string
  timestamp: number
  count: number // Number of times searched
}

export type NavigationItem = SearchResult & {
  type: 'navigation'
  url: string
}

export type DMConversation = SearchResult & {
  type: 'dm'
  lastMessage?: string
  unreadCount?: number
}

export type FileResult = SearchResult & {
  type: 'file'
  extension: string
  size?: number
  modified: number
}

export type SearchState = {
  query: string
  recentSearches: RecentSearch[]
  suggestedQuestions: string[]
}

// Scoring weights for ranking
export const SCORING_WEIGHTS = {
  EXACT_MATCH: 100,
  STARTS_WITH: 80,
  CONTAINS: 60,
  LAST_ACCESSED: 20,
  ACCESS_COUNT: 10,
} as const 